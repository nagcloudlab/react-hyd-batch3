// Admin — lazy loaded (separate chunk)
import { useState } from "react";

const users = [
  { id: 1, name: "Alice Johnson", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", role: "Editor", status: "Active" },
  { id: 3, name: "Carol Davis", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Dan Wilson", role: "Editor", status: "Active" },
];

export default function Admin() {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
      <p className="text-gray-500 text-sm">
        Lazy loaded — only fetched when you navigate here.
      </p>

      <input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Name</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Role</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{u.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{u.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      u.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {u.status}
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
