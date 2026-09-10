import CategoriesStats from '@/features/dashboard/components/overview/categories-stats';
import LowStockStats from '@/features/dashboard/components/overview/low-stock-stats';
import SummaryStats from '@/features/dashboard/components/overview/summary-stats';
import TopSellingStats from '@/features/dashboard/components/overview/top-selling-stats';
import { getStats } from '@/features/dashboard/lib/apis/stats.api';

export default async function DashboardOverview() {
  // Variables
  const stats = await getStats();

  return (
    <section className="bg-ds-subtle grid grid-cols-1 gap-6 lg:grid-cols-2">
      <SummaryStats summary={stats?.payload.summary} />

      <CategoriesStats categories={stats?.payload.categories} />

      <TopSellingStats
        products={stats?.payload.topSellingProducts}
        currency={stats?.payload.summary.currency}
      />

      <LowStockStats products={stats?.payload.lowStockProducts} />
    </section>
  );
}
