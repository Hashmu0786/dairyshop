export default function StatCard({ label, value, sub, icon, trend }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
          {trend && (
            <p className={`mt-2 text-xs font-medium ${trend.positive ? "text-emerald-600" : "text-red-600"}`}>
              {trend.positive ? "↑" : "↓"} {trend.text}
            </p>
          )}
        </div>
        {icon && (
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}
