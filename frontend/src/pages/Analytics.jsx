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
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import GlassCard from "../components/GlassCard";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../hooks/useApi";

export default function Analytics() {
  const { code } = useParams();
  const navigate = useNavigate();

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

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 font-medium">
      {error}
    </div>
  );

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
  const deviceMap = {};

  data.deviceStats.forEach((d) => {
    const device = d._id?.includes("Mobile") ? "Mobile" : "Desktop";
    if (!deviceMap[device]) {
      deviceMap[device] = 0;
    }

    deviceMap[device] += d.count;
  });

  const deviceData = Object.entries(deviceMap).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#10b981", "#059669", "#047857", "#065f46"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto space-y-10"
    >
      {/* Header Section */}
      <header className="flex flex-col gap-4">
        <button 
          onClick={() => navigate("/dashboard")}
          className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1 group w-fit"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Dashboard
        </button>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">Analytics: <span className="text-emerald-400 font-mono">{code}</span></h1>
          <p className="text-gray-400 text-lg">Detailed performance breakdown for your short link.</p>
        </div>
      </header>

      {/* Overview Card */}
      <GlassCard className="!p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-widest">Total Clicks</h3>
            <p className="text-5xl font-bold mt-2 text-emerald-400 tracking-tighter">{data.totalClicks}</p>
          </div>
          <div className="h-px md:h-12 md:w-px bg-white/10"></div>
          <div className="flex-1">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-4">Clicks Over Time</h3>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    hide 
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0b0f14", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                    itemStyle={{ color: "#10b981" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4, stroke: "#0b0f14" }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Referrer */}
        <GlassCard className="space-y-6">
          <h3 className="text-xl font-semibold text-white/90">Traffic Sources</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={referrerData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {referrerData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: "#0b0f14", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Device */}
        <GlassCard className="space-y-6">
          <h3 className="text-xl font-semibold text-white/90">Device Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip 
                   contentStyle={{ backgroundColor: "#0b0f14", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                   cursor={{ fill: "rgba(255,255,255,0.05)" }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}
