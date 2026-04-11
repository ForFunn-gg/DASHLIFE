import { useEffect, useState } from "react";
import { getUsers } from "../services/API";

const roleMap     = ["Admin", "Editor", "Viewer", "Viewer", "Editor"];
const statusStyle = {
  Active:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  Inactive: "bg-gray-100    text-gray-500    dark:bg-gray-800    dark:text-slate-400",
};

export default function Users() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");

  useEffect(() => {
    getUsers()
      .then((data) =>
        setUsers(
          data.map((u, i) => ({
            ...u,
            role:   roleMap[i % roleMap.length],
            status: i % 5 === 3 ? "Inactive" : "Active",
          }))
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Users</h2>
        <input
          type="text"
          placeholder="Search users…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-slate-300 placeholder-gray-400 dark:placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/40 w-56"
        />
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
        {loading ? (
          <p className="text-sm text-gray-400 dark:text-slate-500 py-8 text-center">Loading users…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] font-semibold text-gray-400 dark:text-slate-600 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-3 text-left">Name</th>
                  <th className="pb-3 text-left">Email</th>
                  <th className="pb-3 text-left">Company</th>
                  <th className="pb-3 text-left">Role</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-gray-100 dark:border-gray-800 last:border-none hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
                          {u.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800 dark:text-slate-200">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-xs text-gray-500 dark:text-slate-500">{u.email}</td>
                    <td className="py-3 text-xs text-gray-500 dark:text-slate-500">{u.company?.name}</td>
                    <td className="py-3 text-xs text-gray-500 dark:text-slate-400">{u.role}</td>
                    <td className="py-3 text-right">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[u.status]}`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}