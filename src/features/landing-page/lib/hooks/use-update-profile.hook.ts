'use client';

import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import type { IUser } from '@/features/auth/lib/types/auth';

import { updateProfileAction } from '../actions/update-profile.action';
import type { IUpdateProfileInput } from '../types/profile';

export function useUpdateProfile(onSuccess?: (user: IUser) => void) {
  // Translation
  const t = useTranslations('accountSettings.profile');
  const tCommon = useTranslations('common');

  // Session
  const { update } = useSession();

  // Mutation
  return useMutation({
    mutationFn: (input: IUpdateProfileInput) => updateProfileAction(input),
    onSuccess: async (user) => {
      await update({ user });
      toast.success(t('success'));
      onSuccess?.(user);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : tCommon('error.networkError'));
    },
  });
}
