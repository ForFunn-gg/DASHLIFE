import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getTodos } from "../services/API";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then(setTodos).catch(console.error);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Profile</h2>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xl font-bold text-white shrink-0">
          {user?.avatar || "JD"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-gray-900 dark:text-slate-100">{user?.name || "John Doe"}</p>
          <p className="text-sm text-gray-400 dark:text-slate-500">{user?.email}</p>
          <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full">
            Admin
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-xs font-semibold text-red-500 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
        >
          Log out
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Projects",  value: "12" },
          { label: "Tasks Done", value: todos.filter((t) => t.completed).length.toString() },
          { label: "Pending",   value: todos.filter((t) => !t.completed).length.toString() },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100 font-mono">{s.value}</p>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">My Tasks</p>
        <ul className="space-y-2">
          {todos.map((t) => (
            <li key={t.id} className="flex items-center gap-3 text-sm">
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                t.completed ? "bg-emerald-500 border-emerald-500" : "border-gray-300 dark:border-gray-600"
              }`}>
                {t.completed && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className={t.completed ? "line-through text-gray-400 dark:text-slate-600" : "text-gray-700 dark:text-slate-300"}>
                {t.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}