'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { requestEmailChangeAction } from '../actions/request-email-change.action';
import type { IChangeEmailFields } from '../types/change-email';

export function useRequestEmailChange(onSuccess?: (newEmail: string) => void) {
  // Translation
  const t = useTranslations('accountSettings.changeEmail');
  const tCommon = useTranslations('common');

  // Mutation
  return useMutation({
    mutationFn: async (values: IChangeEmailFields) => {
      const data = await requestEmailChangeAction(values);

      if (!data.status) {
        throw new Error(data.message || tCommon('error.networkError'));
      }

      return data;
    },
    onSuccess: (data, variables) => {
      toast.success(data.message || t('codeSent'));
      onSuccess?.(variables.newEmail);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : tCommon('error.networkError'));
    },
  });
}
