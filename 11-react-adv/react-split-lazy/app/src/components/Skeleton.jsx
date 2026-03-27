// LEVEL 3 — Skeleton loading UI (better than "Loading..." text)

export function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-48" />
      <div className="h-4 bg-gray-200 rounded w-72" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-xl border border-gray-200 p-6">
      <div className="h-5 bg-gray-200 rounded w-32 mb-4" />
      <div className="h-40 bg-gray-200 rounded" />
    </div>
  );
}
