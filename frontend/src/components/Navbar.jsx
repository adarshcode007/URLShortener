import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isAuthPage =
    location.pathname === "/" || location.pathname === "/signup";

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
          {!token ? (
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
