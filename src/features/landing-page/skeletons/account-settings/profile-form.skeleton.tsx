import Skeleton from '@/shared/ui/skeleton';

function FieldSkeleton() {
  return (
    <div className="flex flex-col gap-1.5">
      <Skeleton className="h-4 w-20 rounded-md" />
      <Skeleton className="h-12 w-full rounded-md" />
    </div>
  );
}

export default function ProfileFormSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <Skeleton className="size-20 shrink-0 rounded-full" />
        <div className="flex min-w-0 flex-col gap-2">
          <Skeleton className="h-5 w-28 rounded-md" />
          <Skeleton className="h-4 w-56 max-w-full rounded-md" />
        </div>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-2.5">
        <div className="grid grid-cols-2 gap-4">
          <FieldSkeleton />
          <FieldSkeleton />
        </div>
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse items-stretch justify-between gap-4 pt-15 sm:flex-row sm:items-center">
        <Skeleton className="h-5 w-36 rounded-md" />
        <Skeleton className="h-12 w-full rounded-md sm:w-57" />
      </div>
    </div>
  );
}
