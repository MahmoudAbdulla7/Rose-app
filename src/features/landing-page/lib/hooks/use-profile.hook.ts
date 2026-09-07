'use client';

import { useQuery } from '@tanstack/react-query';

import type { IUser } from '@/features/auth/lib/types/auth';

export const PROFILE_QUERY_KEY = ['profile'] as const;

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async (): Promise<IUser> => {
      const response = await fetch('/api/users/profile', {
        credentials: 'include',
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        const error = new Error(data?.message || 'Failed to load profile');
        Object.assign(error, { status: response.status });
        throw error;
      }

      return (await response.json()) as IUser;
    },
  });
}
