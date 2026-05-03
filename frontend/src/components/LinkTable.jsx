import GlassCard from "./GlassCard";
import { useNavigate } from "react-router-dom";
import api from "../hooks/useApi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LinkTable({ links, onRefresh }) {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async () => {
    if (!confirmDeleteId) return;

    try {
      setDeletingId(confirmDeleteId);
      await api.delete(`/urls/${confirmDeleteId}`);
      setConfirmDeleteId(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete link");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="relative">
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
                  <tr key={item._id || i} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-mono text-emerald-400">{item.shortCode}</td>
                    <td className="px-6 py-4">
                      <div className="truncate max-w-xs text-gray-300" title={item.longUrl}>
                        {item.longUrl}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{item.clicks || 0}</td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <button
                          className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium text-sm"
                          onClick={() => navigate(`/analytics/${item.shortCode}`)}
                        >
                          Analytics
                        </button>
                        
                        <button
                          disabled={deletingId === item._id}
                          className="text-red-400/70 hover:text-red-400 transition-colors font-medium text-sm disabled:opacity-50"
                          onClick={() => setConfirmDeleteId(item._id)}
                        >
                          {deletingId === item._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>

      {/* Custom Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDeleteId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDeleteId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm"
            >
              <GlassCard className="!p-8 text-center space-y-6 shadow-2xl shadow-red-500/10 border-red-500/20">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-400 text-2xl border border-red-500/20">
                  🗑
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Delete Link?</h3>
                  <p className="text-gray-400 leading-relaxed">
                    This action is permanent and will delete all associated analytics.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    className="flex-1 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors border border-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={!!deletingId}
                    className="flex-1 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold transition-colors shadow-lg shadow-red-500/20 disabled:opacity-50"
                  >
                    {deletingId ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
