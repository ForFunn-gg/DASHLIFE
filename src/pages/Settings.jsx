import { useTheme } from "../context/Themecontext";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { dark, toggle } = useTheme();
  const { user }         = useAuth();

  return (
    <div className="space-y-6 max-w-xl">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Settings</h2>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 space-y-5">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Appearance</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-slate-200">Dark Mode</p>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Switch between light and dark theme</p>
          </div>
          <button
            onClick={toggle}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${dark ? "bg-indigo-500" : "bg-gray-200"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${dark ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>
      </div>

      {/* Profile */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 space-y-4">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Profile</p>
        <div className="space-y-3">
          {[
            { label: "Full Name", placeholder: user?.name  || "John Doe",           type: "text"     },
            { label: "Email",     placeholder: user?.email || "john@example.com",   type: "email"    },
            { label: "New Password", placeholder: "••••••••",                        type: "password" },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/40 transition"
              />
            </div>
          ))}
        </div>
        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}