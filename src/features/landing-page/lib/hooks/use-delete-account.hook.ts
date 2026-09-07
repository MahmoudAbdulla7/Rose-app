'use client';

import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { deleteAccountAction } from '../actions/delete-account.action';

export function useDeleteAccount(onSuccess?: () => void) {
  // Translation
  const t = useTranslations('accountSettings.profile.deleteAccountModal');
  const tCommon = useTranslations('common');

  // Mutation
  return useMutation({
    mutationFn: deleteAccountAction,
    onSuccess: async () => {
      toast.success(t('success'));
      onSuccess?.();
      await signOut({ callbackUrl: '/' });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : tCommon('error.networkError'));
    },
  });
}
