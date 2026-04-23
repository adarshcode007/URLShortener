import { useEffect, useState } from "react";
import LinkForm from "../components/LinkForm";
import LinkTable from "../components/LinkTable";
import StatsCard from "../components/StatsCard";
import api from "../hooks/useApi";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [totalClicks, setTotalClicks] = useState(0);
  const [activeToday, setActiveToday] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await api.get("/urls");
        const urls = res.data;

        setLinks(urls);

        const totalLinks = urls.length;

        let clicksSum = 0;
        let todayClicks = 0;

        const today = new Date().toISOString().split("T")[0];

        for (let url of urls) {
          const analyticsRes = await api.get(`/analytics/${url.shortCode}`);

          clicksSum += analyticsRes.data.totalClicks;

          analyticsRes.data.dailyClicks.forEach((d) => {
            if (d._id === today) {
              todayClicks += d.count;
            }
          });
        }

        setTotalClicks(clicksSum);
        setActiveToday(todayClicks);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      {loading && <p className="text-gray-400">Loading dashboard...</p>}

      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatsCard title="Total Links" value={links.length} />
            <StatsCard title="Total Clicks" value={totalClicks} />
            <StatsCard title="Active Today" value={activeToday} />
          </div>

          <LinkForm />

          <div className="mt-6">
            <LinkTable links={links} />
          </div>
        </>
      )}
    </div>
  );
}
