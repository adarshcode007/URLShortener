import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../hooks/useApi";
import GlassCard from "../components/GlassCard";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname !== "/signup");

  useEffect(() => {
    setIsLogin(location.pathname !== "/signup");
  }, [location.pathname]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isLogin ? "/auth/login" : "/auth/signup";
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      await api.post(endpoint, payload);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || (isLogin ? "Invalid credentials" : "Signup failed"));
    } finally {
      setLoading(false);
    }
  };

  const toggleAuth = () => {
    navigate(isLogin ? "/signup" : "/login");
    setError("");
  };

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center p-6 bg-[#0b0f14]">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <GlassCard className="!p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-gray-400">
                  {isLogin 
                    ? "Enter your credentials to access your dashboard" 
                    : "Join Shortify to start managing your links"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-1"
                  >
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-emerald-500/50 transition-colors text-white"
                      onChange={handleInputChange}
                    />
                  </motion.div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-emerald-500/50 transition-colors text-white"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-emerald-500/50 transition-colors text-white"
                    onChange={handleInputChange}
                  />
                  {!isLogin && (
                    <p className="text-[10px] text-gray-500 px-1 mt-1">Minimum 6 characters</p>
                  )}
                </div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-red-400 text-sm font-medium px-1"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={loading}
                  className="w-full py-4 mt-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    isLogin ? "Sign In" : "Get Started"
                  )}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">
                  {isLogin ? "New to Shortify?" : "Already have an account?"}{" "}
                  <button
                    onClick={toggleAuth}
                    className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
                  >
                    {isLogin ? "Create an account" : "Sign in here"}
                  </button>
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;
