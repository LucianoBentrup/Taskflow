'use client';

export function ProfileFormSkeleton() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-full animate-pulse rounded-md border border-gray-200 bg-gray-100" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-full animate-pulse rounded-md border border-gray-200 bg-gray-100" />
      </div>
      <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
    </form>
  );
}

export function ChangePasswordFormSkeleton() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-full animate-pulse rounded-md border border-gray-200 bg-gray-100" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-full animate-pulse rounded-md border border-gray-200 bg-gray-100" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-full animate-pulse rounded-md border border-gray-200 bg-gray-100" />
      </div>
      <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
    </form>
  );
}
