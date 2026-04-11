const orders = [
  { id: "#ORD-001", customer: "Sarah M.",  email: "sarah@email.com",  amount: "$240.00", status: "Shipped",    date: "Apr 10, 2026" },
  { id: "#ORD-002", customer: "James T.",  email: "james@email.com",  amount: "$89.50",  status: "Pending",    date: "Apr 10, 2026" },
  { id: "#ORD-003", customer: "Ana R.",    email: "ana@email.com",    amount: "$412.00", status: "Shipped",    date: "Apr 9, 2026"  },
  { id: "#ORD-004", customer: "Kevin L.",  email: "kevin@email.com",  amount: "$55.00",  status: "Cancelled",  date: "Apr 9, 2026"  },
  { id: "#ORD-005", customer: "Maria C.",  email: "maria@email.com",  amount: "$310.00", status: "Processing", date: "Apr 8, 2026"  },
];

const statusStyles = {
  Shipped:    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  Pending:    "bg-amber-100   text-amber-700   dark:bg-amber-950   dark:text-amber-400",
  Cancelled:  "bg-red-100     text-red-700     dark:bg-red-950     dark:text-red-400",
  Processing: "bg-indigo-100  text-indigo-700  dark:bg-indigo-950  dark:text-indigo-400",
};

export default function OrdersTable() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
      <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
        Recent Orders
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] font-semibold text-gray-400 dark:text-slate-600 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">
              <th className="pb-3 text-left">Order ID</th>
              <th className="pb-3 text-left">Customer</th>
              <th className="pb-3 text-left">Email</th>
              <th className="pb-3 text-left">Date</th>
              <th className="pb-3 text-right">Amount</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-gray-100 dark:border-gray-800 last:border-none hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                <td className="py-3 text-xs font-mono text-gray-400 dark:text-slate-500">{o.id}</td>
                <td className="py-3 font-medium text-gray-800 dark:text-slate-200">{o.customer}</td>
                <td className="py-3 text-xs text-gray-400 dark:text-slate-500">{o.email}</td>
                <td className="py-3 text-xs text-gray-400 dark:text-slate-500">{o.date}</td>
                <td className="py-3 text-right font-mono text-gray-700 dark:text-slate-300">{o.amount}</td>
                <td className="py-3 text-right">
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusStyles[o.status]}`}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}