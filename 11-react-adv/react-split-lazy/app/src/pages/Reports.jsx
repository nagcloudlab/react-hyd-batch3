// Reports — lazy loaded (separate chunk)
// Simulates a "heavy" page with chart-like data

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const data = [65, 78, 52, 91, 83, 70];

function BarChart() {
  const max = Math.max(...data);

  return (
    <div className="flex items-end gap-3 h-48">
      {data.map((val, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <span className="text-xs text-gray-500 mb-1">{val}</span>
          <div
            className="w-full bg-indigo-500 rounded-t-md transition-all duration-500"
            style={{ height: `${(val / max) * 100}%` }}
          />
          <span className="text-xs text-gray-400 mt-2">{months[i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function Reports() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
      <p className="text-gray-500 text-sm">
        Lazy loaded — simulates a heavy chart page.
      </p>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Monthly Revenue
        </h3>
        <BarChart />
      </div>
    </div>
  );
}
