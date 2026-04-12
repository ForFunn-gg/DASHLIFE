import { useEffect, useState } from "react";
import StatCard from "../components/Statcard";
import RevenueChart from "../components/charts/Revenuechart";
import PieChart from "../components/charts/Piechart";
import OrdersTable from "../components/Orderstable";
import { getUsers, getPosts } from "../services/API";

export default function Overview() {
  const [users, setUsers]     = useState([]);
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getUsers(), getPosts()])
      .then(([u, p]) => { setUsers(u); setPosts(p); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Revenue" value="$84,200" delta="+12.4%" positive />
        <StatCard label="Users"   value={loading ? "—" : users.length.toString()} delta="+3.2%" positive />
        <StatCard label="Posts"   value={loading ? "—" : posts.length.toString()} delta="+8.1%" positive />
        <StatCard label="Churn"   value="2.4%"   delta="+0.3%" positive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2"><RevenueChart /></div>
        <PieChart />
      </div>

      {!loading && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
            Live Users (via API)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {users.slice(0, 6).map((u) => (
              <div key={u.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
                  {u.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-800 dark:text-slate-200 truncate">{u.name}</p>
                  <p className="text-[11px] text-gray-400 dark:text-slate-500 truncate">{u.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <OrdersTable />
    </div>
  );
}