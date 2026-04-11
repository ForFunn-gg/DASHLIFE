import {
  AreaChart as ReAreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", users: 820 },
  { month: "Feb", users: 1400 },
  { month: "Mar", users: 1100 },
  { month: "Apr", users: 1900 },
  { month: "May", users: 2400 },
  { month: "Jun", users: 2100 },
  { month: "Jul", users: 3200 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-xs shadow-sm">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="text-violet-500 font-mono font-semibold">{payload[0].value.toLocaleString()} users</p>
      </div>
    );
  }
  return null;
};

export default function AreaChart() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
      <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
        User Growth
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <ReAreaChart data={data}>
          <defs>
            <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} fill="url(#userGrad)" />
        </ReAreaChart>
      </ResponsiveContainer>
    </div>
  );
}