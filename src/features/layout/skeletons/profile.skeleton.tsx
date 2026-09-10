import Skeleton from '@/shared/ui/skeleton';

export default function ProfileSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6" aria-hidden="true">
      <Skeleton className="h-8 w-56 rounded-md" />
      <Skeleton className="h-150 w-full rounded-xl" />
    </div>
  );
}
