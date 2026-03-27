// Settings — lazy loaded (separate chunk)
import { useState } from "react";

export default function Settings() {
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      <p className="text-gray-500 text-sm">
        Lazy loaded — rarely visited pages are great candidates.
      </p>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4 max-w-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Name
          </label>
          <input
            defaultValue="Nag"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Save
        </button>

        {saved && (
          <p className="text-green-600 text-sm font-medium">Settings saved!</p>
        )}
      </form>
    </div>
  );
}
