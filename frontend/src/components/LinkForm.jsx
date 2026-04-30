import { useState } from "react";
import GlassCard from "./GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import api from "../hooks/useApi";

export default function LinkForm({ onRefresh }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!url.trim()) {
      setAlertMessage("Please enter a link before shortening!");
      return;
    }

    if (!isValidUrl(url)) {
      setAlertMessage("Please enter a valid URL (e.g., https://google.com)");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/urls", {
        longUrl: url,
      });

      setSuccess(res.data.shortCode);
      setUrl("");

      // Auto refresh dashboard
      if (onRefresh) onRefresh();

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      console.error("Error Shortening URL:", err);
      setAlertMessage("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <GlassCard>
        <div className="flex gap-3">
          <input
            className="flex-1 p-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-emerald-500/50 transition-colors text-white"
            placeholder="Paste your long URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            onClick={handleSubmit}
          >
            {loading ? "Creating..." : "Shorten"}
          </motion.button>
        </div>
      </GlassCard>

      {/* Success Notification */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                ✓
              </div>
              <div>
                <p className="text-white font-medium">
                  Link shortened successfully!
                </p>
                <p className="text-emerald-400 text-sm font-mono">{success}</p>
              </div>
            </div>
            <button
              onClick={() => setSuccess(null)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Alert Modal */}
      <AnimatePresence>
        {alertMessage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAlertMessage(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm"
            >
              <GlassCard className="!p-8 text-center space-y-6 shadow-2xl shadow-emerald-500/10 border-white/20">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-2xl border border-emerald-500/20">
                  !
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Attention</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {alertMessage}
                  </p>
                </div>
                <button
                  onClick={() => setAlertMessage(null)}
                  className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold transition-colors shadow-lg shadow-emerald-500/20"
                >
                  Got it
                </button>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
