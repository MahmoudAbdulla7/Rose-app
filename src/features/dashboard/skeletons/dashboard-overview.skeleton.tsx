import Skeleton from "@/shared/ui/skeleton";

export default function DashboardOverviewSkeleton() {
  return (
    <div className="bg-ds-subtle grid grid-cols-1 gap-6 p-4 lg:grid-cols-2">
      {/* Summary */}
      <div className="bg-ds-plain rounded-3xl p-5">
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-ds-muted flex flex-col items-start rounded-3xl p-4">
              <Skeleton className="size-9 rounded-md" />
              <Skeleton className="mt-3 h-8 w-24" />
              <Skeleton className="mt-2 h-5 w-28" />
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-ds-plain flex h-81.5 flex-col rounded-3xl p-6">
        <Skeleton className="mb-4 h-7 w-40" />

        <div className="flex flex-1 flex-col gap-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>

              {index < 6 && <Skeleton className="h-px w-full" />}
            </div>
          ))}
        </div>
      </div>

      {/* Top Selling */}
      <div className="bg-ds-plain flex h-110.75 flex-col rounded-3xl p-6">
        <Skeleton className="mb-6 h-7 w-48" />

        <div className="flex flex-1 flex-col gap-2.25">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="bg-ds-muted flex items-center justify-between rounded-sm px-2.5 py-2"
            >
              <Skeleton className="h-5 w-52" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock */}
      <div className="bg-ds-plain flex h-110.75 flex-col rounded-3xl p-6">
        <Skeleton className="mb-6 h-7 w-44" />

        <div className="flex flex-1 flex-col gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-20" />
              </div>

              {index < 7 && <Skeleton className="h-px w-full" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
