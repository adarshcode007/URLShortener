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
    <div className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-lg border-b border-white/10">
      <div className="w-full px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-3xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Shortify
        </h1>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {!isAuth ? (
            <>
              {!isAuthPage && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate("/")}
                  className="text-gray-300 hover:text-white"
                >
                  Login
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/signup")}
                className="px-4 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500"
              >
                Sign Up
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/dashboard")}
                className="text-gray-300 hover:text-white"
              >
                Dashboard
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="px-4 py-1 rounded-lg bg-red-500/80"
              >
                Logout
              </motion.button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
