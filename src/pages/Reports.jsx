import StatCard from "../components/Statcard";
import RevenueChart from "../components/charts/Revenuechart";
import AreaChart from "../components/charts/Areachart";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Reports</h2>
        <button className="px-4 py-2 text-xs font-semibold bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors">
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Gross Revenue" value="$284,200" delta="+22.4%" positive />
        <StatCard label="Net Revenue"   value="$201,800" delta="+18.1%" positive />
        <StatCard label="Expenses"      value="$82,400"  delta="+4.3%"  positive={false} />
        <StatCard label="Profit Margin" value="71%"      delta="+3.1%"  positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueChart />
        <AreaChart />
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
          Monthly Breakdown
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-semibold text-gray-400 dark:text-slate-600 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">
                <th className="pb-3 text-left">Month</th>
                <th className="pb-3 text-right">Revenue</th>
                <th className="pb-3 text-right">Expenses</th>
                <th className="pb-3 text-right">Net</th>
                <th className="pb-3 text-right">Growth</th>
              </tr>
            </thead>
            <tbody>
              {[
                { month: "January",  rev: 18400, exp: 7200, growth: "+8.2%"  },
                { month: "February", rev: 21100, exp: 6800, growth: "+14.7%" },
                { month: "March",    rev: 19800, exp: 7400, growth: "-6.2%"  },
                { month: "April",    rev: 24200, exp: 8100, growth: "+22.2%" },
              ].map((r) => (
                <tr key={r.month} className="border-b border-gray-100 dark:border-gray-800 last:border-none hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3 font-medium text-gray-800 dark:text-slate-200">{r.month}</td>
                  <td className="py-3 text-right font-mono text-gray-700 dark:text-slate-300">${r.rev.toLocaleString()}</td>
                  <td className="py-3 text-right font-mono text-gray-500 dark:text-slate-500">${r.exp.toLocaleString()}</td>
                  <td className="py-3 text-right font-mono text-gray-700 dark:text-slate-300">${(r.rev - r.exp).toLocaleString()}</td>
                  <td className={`py-3 text-right text-xs font-semibold ${r.growth.startsWith("+") ? "text-emerald-500" : "text-red-400"}`}>
                    {r.growth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}