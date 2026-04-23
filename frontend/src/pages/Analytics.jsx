import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import GlassCard from "../components/GlassCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../hooks/useApi";

export default function Analytics() {
  const { code } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/analytics/${code}`);
        setData(res.data);
      } catch (error) {
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [code]);

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!data) return null;

  // Daily clicks (line chart)
  const dailyData = data.dailyClicks.map((d) => ({
    date: d._id,
    clicks: d.count,
  }));

  // Referrer chart
  const referrerData = data.referrerStats.map((r) => ({
    name: r._id || "direct",
    value: r.count,
  }));

  // Device chart
  const deviceData = data.deviceStats.map((d) => ({
    name: d._id?.includes("Mobile") ? "Mobile" : "Desktop",
    value: d.count,
  }));

  const COLORS = ["#8b5cf6", "#3b82f6", "#22c55e", "#f59e0b"];

  return (
    <div>
      <h1 className="text-3xl mb-6">Analytics: {code}</h1>

      {/* Total Clicks*/}
      <GlassCard className="mb-6">
        <h3 className="text-gray-400">Total Clicks</h3>
        <p className="text-3xl font-bold mt-2">{data.totalClicks}</p>
      </GlassCard>

      {/* Daily Clicks */}
      <GlassCard className="mb-6">
        <h3 className="mb-4">Clicks Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="clicks" stroke="#8b5cf6" />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Charts Grid*/}
      <div className="grid grid-cols-2 gap-6">
        {/* Referrer */}
        <GlassCard>
          <h3 className="mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={referrerData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {referrerData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* 📊 Device */}
        <GlassCard>
          <h3 className="mb-4">Device Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deviceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
