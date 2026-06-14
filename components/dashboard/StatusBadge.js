const styles = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-indigo-100 text-indigo-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  new: "bg-emerald-100 text-emerald-800",
  responded: "bg-blue-100 text-blue-800",
  closed: "bg-gray-100 text-gray-700",
  paid: "bg-green-100 text-green-800",
  refunded: "bg-orange-100 text-orange-800",
  active: "bg-green-100 text-green-800",
  inactive: "bg-red-100 text-red-800",
};

export default function StatusBadge({ status }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  const style = styles[status] ?? "bg-gray-100 text-gray-700";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${style}`}>
      {label}
    </span>
  );
}
