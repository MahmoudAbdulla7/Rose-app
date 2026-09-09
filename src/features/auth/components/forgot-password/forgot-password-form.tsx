'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { createForgotPasswordSchema } from '../../lib/schemas/forgot-password.schema';
import { forgotPasswordAction } from '../../lib/actions/forgot-password.action';
import { STEP } from '../../lib/constants/forgot-password.constant';
import type { Step } from '../../lib/constants/forgot-password.constant';
import AuthHeader from '../auth-header';
import AuthFooter from '../auth-footer';

type ForgotPasswordFormProps = {
  goToStep: React.Dispatch<React.SetStateAction<Step>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export default function ForgotPasswordForm({ goToStep, setEmail }: ForgotPasswordFormProps) {
  // Translation
  const t = useTranslations('auth.forgotPassword');
  const tCommon = useTranslations('common');
  const tValidation = useTranslations('auth.register.validation');

  // Schema
  const forgotPasswordSchema = createForgotPasswordSchema(tValidation);
  type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

  // State
  const [serverError, setServerError] = useState<string | null>(null);

  // Mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPasswordAction,
    onSuccess: (_, variables) => {
      setEmail(variables.email);
      goToStep(STEP.SENT);
    },
    onError: (error) => {
      if (error instanceof Error && error.cause === 500) {
        setServerError(tCommon('error.networkError'));
        return;
      }

      setServerError(error instanceof Error ? error.message : tCommon('error.networkError'));
    },
  });

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // Functions
  const submitEmail = handleSubmit((values) => {
    setServerError(null);

    forgotPasswordMutation.mutate({
      email: values.email,
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}reset-password`,
    });
  });

  return (
    <>
      <AuthHeader
        variant="secondary"
        title={t('email.title')}
        description={t('email.description')}
      />

      <form onSubmit={submitEmail} className="flex flex-col gap-5">
        <Input
          label={t('email.emailLabel')}
          placeholder={t('email.emailPlaceholder')}
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message}
          {...register('email')}
        />

        {serverError && (
          <div className="text-ds-danger text-sm" role="alert">
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          loading={isSubmitting || forgotPasswordMutation.isPending}
        >
          {t('email.continue')}
        </Button>
      </form>

      <AuthFooter text={t('email.footerText')} linkText={t('email.footerLink')} href="/register" />
    </>
  );
}
