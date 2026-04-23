import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");

      await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-[#0f172a] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-125 h-125 bg-purple-600/30 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-125 h-125 bg-blue-600/30 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-96 shadow-2xl"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 bg-white/10 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-white/10 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-2 bg-white/10 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="text-xs text-gray-400 mb-5">
          Password must be at least 6 characters
        </p>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 font-semibold shadow-lg"
          onClick={handleSignup}
        >
          Sign Up
        </motion.button>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
