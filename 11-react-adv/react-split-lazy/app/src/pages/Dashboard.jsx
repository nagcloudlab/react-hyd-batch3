// Dashboard — lazy loaded (separate chunk)
// Intentionally has some "weight" to make the chunk visible in build output

const stats = [
  { label: "Total Users", value: "12,345", change: "+12%" },
  { label: "Revenue", value: "$45,678", change: "+8%" },
  { label: "Orders", value: "1,234", change: "+23%" },
  { label: "Conversion", value: "3.2%", change: "-2%" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      <p className="text-gray-500 text-sm">
        This page was <strong>lazy loaded</strong> — check Network tab for the
        separate JS chunk.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stat.value}
            </p>
            <p
              className={`text-sm mt-1 font-medium ${
                stat.change.startsWith("+")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
