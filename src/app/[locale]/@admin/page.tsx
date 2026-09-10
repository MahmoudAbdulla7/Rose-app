import { Suspense } from 'react';

import DashboardOverview from '@/features/dashboard/components/overview/dashboard-overview';
import DashboardOverviewSkeleton from '@/features/dashboard/skeletons/dashboard-overview.skeleton';

export default function DashboardOverviewPage() {
  return (
    <Suspense fallback={<DashboardOverviewSkeleton />}>
      <DashboardOverview />
    </Suspense>
  );
}
