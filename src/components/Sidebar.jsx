import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, LineChart, ShoppingCart,
  Users, Settings, LogOut, X, User, FileText,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview",  to: "/",          section: "main" },
  { icon: LineChart,       label: "Analytics", to: "/analytics", section: "main" },
  { icon: ShoppingCart,   label: "Orders",    to: "/orders",    section: "main" },
  { icon: FileText,       label: "Reports",   to: "/reports",   section: "main" },
  { icon: Users,          label: "Users",     to: "/users",     section: "settings" },
  { icon: User,           label: "Profile",   to: "/profile",   section: "settings" },
  { icon: Settings,       label: "Settings",  to: "/settings",  section: "settings" },
];

export default function Sidebar({ open, onClose }) {
  const mainItems     = navItems.filter((n) => n.section === "main");
  const settingsItems = navItems.filter((n) => n.section === "settings");

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2.5 px-5 py-2 text-sm transition-all border-l-2 ${
      isActive
        ? "text-indigo-500 dark:text-indigo-400 border-indigo-500 bg-indigo-50 dark:bg-gray-900"
        : "text-gray-500 dark:text-slate-500 border-transparent hover:text-gray-800 dark:hover:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-900"
    }`;

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={onClose} />
      )}
      <aside className={`
        fixed top-0 left-0 h-full z-30 w-52 flex flex-col py-5
        bg-white dark:bg-gray-950
        border-r border-gray-200 dark:border-gray-800
        transition-transform duration-200 ease-in-out
        md:static md:translate-x-0 md:z-auto
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
              Dashify
            </span>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-700 dark:hover:text-slate-300">
            <X size={16} />
          </button>
        </div>

        {/* Main nav */}
        <nav className="flex flex-col gap-0.5">
          <p className="px-5 mb-1 text-[10px] font-semibold text-gray-400 dark:text-slate-600 uppercase tracking-widest">
            Main
          </p>
          {mainItems.map(({ icon: Icon, label, to }) => (
            <NavLink key={to} to={to} end={to === "/"} className={linkClass} onClick={onClose}>
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Settings nav */}
        <nav className="flex flex-col gap-0.5 mt-5">
          <p className="px-5 mb-1 text-[10px] font-semibold text-gray-400 dark:text-slate-600 uppercase tracking-widest">
            Account
          </p>
          {settingsItems.map(({ icon: Icon, label, to }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={onClose}>
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto px-4">
          <button className="flex items-center gap-2.5 px-3 py-2 w-full text-sm text-gray-400 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-all">
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}