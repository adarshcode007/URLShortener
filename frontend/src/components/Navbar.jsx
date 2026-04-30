import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../hooks/useApi";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);

  const isAuthPage =
    location.pathname === "/" || location.pathname === "/signup";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await api.get("/auth/me");
        if (user) setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setIsAuth(false);
      navigate("/");
    } catch (err) {
      console.error("Error logging out");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#0b0f14]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <span className="text-black font-black">S</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Shortify</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {!isAuth ? (
            <>
              {!isAuthPage && (
                <button
                  onClick={() => navigate("/")}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Sign In
                </button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/signup")}
                className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black text-sm font-bold transition-colors shadow-lg shadow-emerald-500/10"
              >
                Get Started
              </motion.button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  location.pathname === "/dashboard"
                    ? "text-emerald-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium text-gray-400 cursor-pointer hover:text-white hover:bg-red-500 transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
