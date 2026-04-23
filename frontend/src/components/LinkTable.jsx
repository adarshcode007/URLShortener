import { useEffect, useState } from "react";
import GlassCard from "./GlassCard";
import { useNavigate } from "react-router-dom";
import api from "../hooks/useApi";

export default function LinkTable() {
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/urls");
      setLinks(res.data);
    } catch (err) {
      setError("Failed to load links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <GlassCard>
      {/* Loading */}
      {loading && <p className="text-gray-400">Loading links...</p>}

      {/* Error */}
      {error && <p className="text-red-400">{error}</p>}

      {/* Data */}
      {!loading && !error && (
        <table className="w-full">
          <thead className="text-gray-400">
            <tr>
              <th>Short</th>
              <th>Original</th>
              <th>Clicks</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {links.map((item, i) => (
              <tr key={i} className="border-t border-white/10">
                <td>{item.shortCode}</td>
                <td>{item.longUrl}</td>
                <td>{item.clicks}</td>
                <td>
                  <button
                    className="text-blue-400"
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
