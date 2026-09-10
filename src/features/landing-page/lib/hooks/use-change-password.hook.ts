'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { changePasswordAction } from '../actions/change-password.action';

export function useChangePassword(onSuccess?: () => void) {
  // Translation
  const t = useTranslations('accountSettings.changePassword');
  const tCommon = useTranslations('common');

  // Mutation
  return useMutation({
    mutationFn: changePasswordAction,
    onSuccess: () => {
      toast.success(t('success'));
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : tCommon('error.networkError'));
    },
  });
}
