export default function StatCard({ label, value, delta, positive }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
      <p className="text-[10px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className="text-2xl font-semibold text-gray-900 dark:text-slate-100 font-mono tracking-tight">
        {value}
      </p>
      <p className={`text-xs mt-1 ${positive ? "text-emerald-500" : "text-red-400"}`}>
        {delta} this month
      </p>
    </div>
  );
}