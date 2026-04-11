import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Organic",  value: 42, color: "#6366f1" },
  { name: "Direct",   value: 28, color: "#8b5cf6" },
  { name: "Social",   value: 18, color: "#a78bfa" },
  { name: "Referral", value: 12, color: "#ddd6fe" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-xs shadow-sm">
        <p className="font-semibold text-gray-700 dark:text-slate-200">{payload[0].name}</p>
        <p className="text-indigo-500 font-mono">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function PieChart() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
      <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
        Traffic Split
      </p>
      <ResponsiveContainer width="100%" height={150}>
        <RePieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
            {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </RePieChart>
      </ResponsiveContainer>
      <div className="space-y-2 mt-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
              <span className="text-gray-500 dark:text-slate-500">{d.name}</span>
            </div>
            <span className="font-mono text-gray-600 dark:text-slate-400">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}