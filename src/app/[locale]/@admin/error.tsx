'use client';

import { Button } from '@/shared/ui/button';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: Props) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="text-ds-text-muted mt-2">
          We couldn&apos;t load the dashboard. Please try again.
        </p>
      </div>

      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
