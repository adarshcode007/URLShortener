import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <div className="w-64 h-screen sticky top-0 p-6 bg-black/20 border-r border-white/5 flex flex-col">
      <div className="mb-8 px-2">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Menu</h2>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 font-medium"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-transparent"}`}></span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
