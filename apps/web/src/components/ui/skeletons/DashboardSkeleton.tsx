'use client';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filtro skeleton */}
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-40 animate-pulse rounded-md border border-gray-200 bg-gray-100" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-3 rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-6">
        <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
        <div className="flex items-end justify-center gap-4 pt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-32 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
