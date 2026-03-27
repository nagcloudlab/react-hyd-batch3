// Home — always in the initial bundle (not lazy loaded)
export default function Home() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Home Page</h2>
      <p className="text-gray-600">
        This page is in the <strong>initial bundle</strong> — loaded immediately.
      </p>
      <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg text-sm">
        Check the <strong>Network tab</strong> — no extra JS chunk loaded for this page.
      </div>
    </div>
  );
}
