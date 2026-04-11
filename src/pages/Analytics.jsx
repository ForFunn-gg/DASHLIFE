import StatCard from "../components/Statcard";
import RevenueChart from "../components/charts/RevenueChart";
import AreaChart from "../components/charts/AreaChart";
import PieChart from "../components/charts/PieChart";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Analytics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Page Views"  value="128,400" delta="+18.2%" positive />
        <StatCard label="Bounce Rate" value="34.1%"   delta="-2.4%"  positive />
        <StatCard label="Avg. Session" value="3m 42s" delta="+0.5%"  positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueChart />
        <AreaChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PieChart />
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
            Top Pages
          </p>
          {[
            { page: "/dashboard", views: 8420, pct: 92 },
            { page: "/analytics", views: 6100, pct: 67 },
            { page: "/orders",    views: 4800, pct: 52 },
            { page: "/users",     views: 3200, pct: 35 },
            { page: "/settings",  views: 1100, pct: 12 },
          ].map((row) => (
            <div key={row.page} className="flex items-center gap-3 mb-3">
              <span className="w-32 text-xs text-gray-500 dark:text-slate-500 font-mono truncate">{row.page}</span>
              <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-indigo-500" style={{ width: `${row.pct}%` }} />
              </div>
              <span className="text-xs text-gray-500 dark:text-slate-400 font-mono w-14 text-right">
                {row.views.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}