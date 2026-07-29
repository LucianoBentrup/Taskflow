'use client';

export function ProjectsListSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="h-10 flex-1 animate-pulse rounded-md border border-gray-200 bg-gray-100" />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3 rounded-md border border-gray-200 p-4">
          <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-9 w-16 animate-pulse rounded bg-gray-200" />
            <div className="h-9 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
