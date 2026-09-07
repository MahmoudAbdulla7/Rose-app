'use client';

import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import type { IUser } from '@/features/auth/lib/types/auth';

import { confirmEmailChangeAction } from '../actions/confirm-email-change.action';
import type { IConfirmEmailChangePayload } from '../types/change-email';

export function useConfirmEmailChange(onSuccess?: (user: IUser) => void) {
  // Translation
  const t = useTranslations('accountSettings.changeEmail');
  const tCommon = useTranslations('common');

  // Session
  const { update } = useSession();

  // Mutation
  return useMutation({
    mutationFn: async (payload: IConfirmEmailChangePayload) => {
      const data = await confirmEmailChangeAction(payload);

      if (!data.status || !data.payload?.user) {
        throw new Error(data.message || t('otp.invalid'));
      }

      return data.payload.user;
    },
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
