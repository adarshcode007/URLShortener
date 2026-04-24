import { useState } from "react";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";
import api from "../hooks/useApi";

export default function LinkForm() {
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await api.post("/urls", {
        longUrl: url,
      });

      console.log(res?.data);
    } catch (err) {
      console.error("Error Shortening URL:", err);
    }
  };

  return (
    <GlassCard>
      <div className="flex gap-3">
        <input
          className="flex-1 p-3 bg-white/10 rounded-lg outline-none"
          placeholder="Paste your long URL..."
          onChange={(e) => setUrl(e.target.value)}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500"
          onClick={handleSubmit}
        >
          Shorten
        </motion.button>
      </div>
    </GlassCard>
  );
}
