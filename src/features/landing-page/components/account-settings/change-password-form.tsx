'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { useChangePassword } from '@/features/landing-page/lib/hooks/use-change-password.hook';
import { createChangePasswordSchema } from '@/features/landing-page/lib/schemas/change-password.schema';
import type { IChangePasswordFields } from '@/features/landing-page/lib/types/change-password';
import { Button } from '@/shared/ui/button';
import { PasswordInput } from '@/shared/ui/password-input';
import { Separator } from '@/shared/ui/separator';

export default function ChangePasswordForm() {
  // Translation
  const t = useTranslations('accountSettings.changePassword');
  const tValidation = useTranslations('auth.register.validation');

  // Schema
  const changePasswordSchema = createChangePasswordSchema(tValidation);

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IChangePasswordFields>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Hooks
  const { mutate: changePassword, isPending } = useChangePassword(reset);

  // Functions
  const submitPassword = handleSubmit((values) => changePassword(values));

  return (
    <form onSubmit={submitPassword} className="flex flex-col gap-4">
      {/* Form */}
      <div className="flex flex-col gap-2.5">
        <PasswordInput
          label={t('oldPassword')}
          placeholder={t('placeholder')}
          error={errors.currentPassword?.message}
          {...register('currentPassword')}
        />

        <Separator className="bg-ds-border-muted my-4" />

        <PasswordInput
          label={t('newPassword')}
          placeholder={t('placeholder')}
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />

        <PasswordInput
          label={t('confirmPassword')}
          placeholder={t('placeholder')}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>

      {/* Save */}
      <div className="flex justify-end pt-15">
        <Button type="submit" loading={isPending} className="w-full sm:w-57">
          {t('submit')}
        </Button>
      </div>
    </form>
  );
}
