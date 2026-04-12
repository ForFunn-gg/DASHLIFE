import { Bell, Search, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "../context/Themecontext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onMenuClick }) {
  const { dark, toggle } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-14 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6 shrink-0 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-500 dark:text-slate-500 transition-colors"
        >
          <Menu size={18} />
        </button>
        <h1 className="text-sm font-semibold text-gray-900 dark:text-slate-100">Dashboard</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-1.5">
          <Search size={13} className="text-gray-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-xs text-gray-700 dark:text-slate-300 placeholder-gray-400 dark:placeholder-slate-600 outline-none w-28"
          />
        </div>

        <button
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-500 dark:text-slate-400 transition-colors"
        >
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
          <Bell size={15} className="text-gray-500 dark:text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="w-7 h-7 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[10px] font-semibold text-white"
        >
          {user?.avatar || "JD"}
        </button>
      </div>
    </header>
  );
}