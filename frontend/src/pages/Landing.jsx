import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import heroImage from "../assets/hero.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-center p-6 bg-[#0b0f14] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Optimize Your Links
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
            Create <span className="text-emerald-500">Short URLs</span> <br />
            that Work for You.
          </h1>

          <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
            Shortify helps you create clean, professional, and trackable short
            links in seconds. Perfect for social media, marketing campaigns, and
            personal use.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
              className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-lg transition-all shadow-xl shadow-emerald-500/20"
            >
              Try it for Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-lg transition-all"
            >
              Sign In
            </motion.button>
          </div>

          <div className="mt-12 flex items-center gap-8 opacity-50">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10k+</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">
                Links Created
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50k+</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">
                Total Clicks
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Hero Image/Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-3xl" />
          <GlassCard className="relative border-white/10 !p-2 overflow-hidden">
            <img
              src={heroImage}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl"
            />
          </GlassCard>

          {/* Floating stats card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -bottom-6 -left-6"
          >
            <GlassCard className="p-4! bg-black/60 backdrop-blur-xl border-emerald-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">+124%</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-tighter">
                    Click Rate
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
