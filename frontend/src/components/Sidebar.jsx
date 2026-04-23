import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen p-5 bg-white/5 backdrop-blur-xl border-r border-white/10">
      <ul className="space-y-4">
        {["Dashboard", "Analytics"].map((item) => (
          <motion.li whileHover={{ scale: 1.05 }} key={item}>
            <Link
              to={item === "Dashboard" ? "/dashboard" : "/analytics/demo"}
              className="block p-2 rounded-lg hover:bg-white/10"
            >
              {item}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
