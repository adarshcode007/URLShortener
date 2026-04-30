import GlassCard from "./GlassCard";
import { useNavigate } from "react-router-dom";

export default function LinkTable({ links }) {
  const navigate = useNavigate();

  return (
    <GlassCard className="overflow-hidden !p-0">
      {/* Empty State */}
      {links.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No links created yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Short Code</th>
                <th className="px-6 py-4 font-medium">Original URL</th>
                <th className="px-6 py-4 font-medium">Clicks</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {links.map((item, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-mono text-emerald-400">{item.shortCode}</td>
                  <td className="px-6 py-4">
                    <div className="truncate max-w-xs text-gray-300" title={item.longUrl}>
                      {item.longUrl}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{item.clicks || 0}</td>

                  <td className="px-6 py-4 text-right">
                    <button
                      className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                      onClick={() => navigate(`/analytics/${item.shortCode}`)}
                    >
                      View Analytics
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </GlassCard>
  );
}
