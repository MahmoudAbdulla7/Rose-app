'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';

import { Button } from '@/shared/ui/button';
import { PasswordInput } from '@/shared/ui/password-input';
import { createResetPasswordSchema } from '../../lib/schemas/forgot-password.schema';
import { resetPasswordAction } from '../../lib/actions/forgot-password.action';
import AuthHeader from '../auth-header';
import AuthFooter from '../auth-footer';

export default function ResetPassword() {
  // Translation
  const t = useTranslations('auth.forgotPassword');
  const tCommon = useTranslations('common');
  const tValidation = useTranslations('auth.register.validation');

  // Schema
  const resetPasswordSchema = createResetPasswordSchema(tValidation);
  type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

  // Navigation
  const router = useRouter();

  // State
  const [serverError, setServerError] = useState<string | null>(null);

  // Mutation
  const resetPasswordMutation = useMutation({
    mutationFn: resetPasswordAction,
    onSuccess: () => {
      toast.success(t('reset.success'));
      router.push('/login');
    },
    onError: (error) => {
      setServerError(error instanceof Error ? error.message : tCommon('error.networkError'));
    },
  });

  // Hook
  const searchParams = useSearchParams();

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Variables
  const token = searchParams.get('token') || '';

  // Functions
  const submitPassword = handleSubmit((values) => {
    if (!token) {
      setServerError(t('reset.invalidToken'));
      return;
    }
    setServerError(null);

    resetPasswordMutation.mutate({
      token,
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    });
  });

  return (
    <>
      <AuthHeader
        variant="secondary"
        title={t('reset.title')}
        description={t('reset.description')}
      />

      <form onSubmit={submitPassword} className="flex flex-col gap-5">
        <PasswordInput
          label={t('reset.newPasswordLabel')}
          placeholder={t('reset.newPasswordPlaceholder')}
          error={errors.password?.message}
          {...register('password')}
        />

        <PasswordInput
          label={t('reset.confirmPasswordLabel')}
          placeholder={t('reset.confirmPasswordPlaceholder')}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        {serverError && (
          <div className="text-ds-danger text-sm" role="alert">
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          loading={isSubmitting || resetPasswordMutation.isPending}
        >
          {t('reset.reset')}
        </Button>
      </form>

      <AuthFooter text={t('helpFooter.text')} linkText={t('helpFooter.link')} href={null} />
    </>
  );
}
