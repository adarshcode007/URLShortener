import GlassCard from "./GlassCard";
import { useNavigate } from "react-router-dom";

export default function LinkTable({ links }) {
  const navigate = useNavigate();

  return (
    <GlassCard>
      {/* Empty State */}
      {links.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No links created yet</p>
      ) : (
        <table className="w-full">
          <thead className="text-gray-400">
            <tr>
              <th className="text-left p-2">Short</th>
              <th className="text-left p-2">Original</th>
              <th className="text-left p-2">Clicks</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {links.map((item, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="p-2">{item.shortCode}</td>
                <td className="p-2 truncate max-w-xs">{item.longUrl}</td>
                <td className="p-2">{item.clicks || 0}</td>

                <td>
                  <button
                    className="text-blue-400 hover:underline"
                    onClick={() => navigate(`/analytics/${item.shortCode}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </GlassCard>
  );
}
