import 'server-only';

import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getAuthHeaders } from '@/shared/lib/utils/auth-headers';
import { Stats } from '../types/stats';

export async function getStats(
  params: {
    revenuePeriod?: 'monthly' | 'week';
    lowStockThreshold?: number;
    topProductsLimit?: number;
    lowStockLimit?: number;
  } = {},
): Promise<Stats | undefined> {
  const searchParams = {
    revenuePeriod: params.revenuePeriod ?? 'monthly',
    lowStockThreshold: String(params.lowStockThreshold ?? 20),
    topProductsLimit: String(params.topProductsLimit ?? 5),
    lowStockLimit: String(params.lowStockLimit ?? 20),
  };

  const endpoint = buildApiEndpoint('/admin/statistics', searchParams);

  const response = await fetch(endpoint.toString(), {
    method: 'GET',
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch admin statistics');
  }

  return (await response.json()) as Stats;
}
