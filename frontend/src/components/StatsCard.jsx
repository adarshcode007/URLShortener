import GlassCard from "./GlassCard";

export default function StatsCard({ title, value }) {
  return (
    <GlassCard>
      <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h4>
      <p className="text-3xl font-bold mt-2 text-emerald-400">{value}</p>
    </GlassCard>
  );
}
