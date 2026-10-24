const colors = {
  Pending: "bg-gray-200 text-gray-700",
  Processing: "bg-amber-100 text-amber-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${colors[status] || colors.Pending}`}>
      {status}
    </span>
  );
}