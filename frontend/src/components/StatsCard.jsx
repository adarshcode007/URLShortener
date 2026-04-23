import GlassCard from "./GlassCard";

export default function StatsCard({ title, value }) {
  return (
    <GlassCard>
      <h4 className="text-gray-400">{title}</h4>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </GlassCard>
  );
}
