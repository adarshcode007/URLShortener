import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/urls");
      const urls = res.data;
      setLinks(urls);

      let clicksSum = 0;
      let todayClicks = 0;
      const today = new Date().toISOString().split("T")[0];

      for (let url of urls) {
        const analyticsRes = await api.get(`/analytics/${url.shortCode}`);
        clicksSum += analyticsRes.data.totalClicks;
        analyticsRes.data.dailyClicks.forEach((d) => {
          if (d._id === today) todayClicks += d.count;
        });
      }

      setTotalClicks(clicksSum);
      setActiveToday(todayClicks);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header Section */}
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-gray-400 text-lg">Manage your shortened links and track their performance.</p>
      </header>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          <span className="ml-3 text-gray-400 font-medium">Loading your dashboard...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 font-medium">
          {error}
        </div>
      )}

      {!loading && !error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Stats Grid */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard title="Total Links" value={links.length} />
              <StatsCard title="Total Clicks" value={totalClicks} />
              <StatsCard title="Active Today" value={activeToday} />
            </div>
          </section>

          {/* Action Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white/90">Create New Link</h2>
            <LinkForm onRefresh={fetchData} />
          </section>

          {/* Table Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white/90">Your Links</h2>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                {links.length} total
              </span>
            </div>
            <LinkTable links={links} />
          </section>
        </motion.div>
      )}
    </div>
  );
}
