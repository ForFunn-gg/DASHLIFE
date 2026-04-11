import { useEffect, useState } from "react";
import StatCard from "../components/Statcard";
import { getPosts } from "../services/API";

const statusMap   = ["Shipped", "Pending", "Processing", "Cancelled"];
const statusStyle = {
  Shipped:    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  Pending:    "bg-amber-100   text-amber-700   dark:bg-amber-950   dark:text-amber-400",
  Processing: "bg-indigo-100  text-indigo-700  dark:bg-indigo-950  dark:text-indigo-400",
  Cancelled:  "bg-red-100     text-red-700     dark:bg-red-950     dark:text-red-400",
};

export default function Orders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("All");

  useEffect(() => {
    getPosts()
      .then((posts) =>
        setOrders(
          posts.slice(0, 20).map((p, i) => ({
            id:     `#ORD-${String(p.id).padStart(3, "0")}`,
            title:  p.title.slice(0, 30) + "…",
            amount: `$${((p.id * 17.3) % 400 + 20).toFixed(2)}`,
            status: statusMap[i % 4],
          }))
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const statuses = ["All", ...statusMap];
  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Orders</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total"     value={orders.length.toString()}                                  delta="+8.1%" positive />
        <StatCard label="Shipped"   value={orders.filter((o) => o.status === "Shipped").length.toString()}   delta="+5%"   positive />
        <StatCard label="Pending"   value={orders.filter((o) => o.status === "Pending").length.toString()}   delta="+2%"   positive={false} />
        <StatCard label="Cancelled" value={orders.filter((o) => o.status === "Cancelled").length.toString()} delta="-1%"   positive />
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                filter === s
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-gray-400 dark:text-slate-500 py-8 text-center">Loading orders…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] font-semibold text-gray-400 dark:text-slate-600 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-3 text-left">Order ID</th>
                  <th className="pb-3 text-left">Description</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-b border-gray-100 dark:border-gray-800 last:border-none hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 text-xs font-mono text-gray-400 dark:text-slate-500">{o.id}</td>
                    <td className="py-3 text-gray-700 dark:text-slate-300 max-w-xs truncate">{o.title}</td>
                    <td className="py-3 text-right font-mono text-gray-700 dark:text-slate-300">{o.amount}</td>
                    <td className="py-3 text-right">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[o.status]}`}>
                        {o.status}
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