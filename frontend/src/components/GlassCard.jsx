export default function GlassCard({ children, className }) {
  return (
    <div
      className={`bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg shadow-emerald-500/5 ${className}`}
    >
      {children}
    </div>
  );
}
