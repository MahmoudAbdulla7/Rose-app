'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import type { IUser } from '@/features/auth/lib/types/auth';
import ChangeEmailField from '@/features/landing-page/components/account-settings/change-email-field';
import DeleteAccountButton from '@/features/landing-page/components/account-settings/delete-account-button';
import ProfileAvatar from '@/features/landing-page/components/account-settings/profile-avatar';
import {
  PROFILE_QUERY_KEY,
  useProfile,
} from '@/features/landing-page/lib/hooks/use-profile.hook';
import { useUpdateProfile } from '@/features/landing-page/lib/hooks/use-update-profile.hook';
import { createProfileSchema } from '@/features/landing-page/lib/schemas/profile.schema';
import type { IProfileFields } from '@/features/landing-page/lib/types/profile';
import ProfileFormSkeleton from '@/features/landing-page/skeletons/account-settings/profile-form.skeleton';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { PhoneInput } from '@/shared/ui/phone-input';

export default function ProfileForm() {
  // Translation
  const t = useTranslations('accountSettings.profile');
  const tValidation = useTranslations('auth.register.validation');

  // Navigation
  const router = useRouter();

  // Schema
  const profileSchema = createProfileSchema(tValidation);

  // Query
  const queryClient = useQueryClient();
  const { data: user, isPending, isError, error } = useProfile();

  // Refs
  const hasInitializedForm = useRef(false);

  // Form
  const form = useForm<IProfileFields>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      photo: undefined,
    },
    mode: 'onSubmit',
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = form;

  // Hooks
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile((updatedUser) => {
    queryClient.setQueryData(PROFILE_QUERY_KEY, updatedUser);
    reset({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phone: updatedUser.phone ?? '',
      photo: undefined,
    });
  });

  // Effects
  useEffect(() => {
    if (error && 'status' in error && error.status === 401) {
      router.replace('/login');
    }
  }, [error, router]);

  useEffect(() => {
    if (!user || hasInitializedForm.current) return;

    hasInitializedForm.current = true;
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone ?? '',
      photo: undefined,
    });
  }, [user, reset]);

  // Functions
  const submitProfile = handleSubmit((values) => {
    updateProfile(values);
  });

  const handleEmailChangeSuccess = (updatedUser: IUser) => {
    queryClient.setQueryData(PROFILE_QUERY_KEY, updatedUser);
  };

  if (isPending) {
    return <ProfileFormSkeleton />;
  }

  if (isError || !user) {
    return null;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={submitProfile} className="flex flex-col gap-4">
        {/* Avatar */}
        <ProfileAvatar currentPhoto={user.photo} />

        {/* Fields */}
        <div className="flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('firstName')}
              autoComplete="given-name"
              error={errors.firstName?.message}
              {...register('firstName')}
            />

            <Input
              label={t('lastName')}
              autoComplete="family-name"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>

          <ChangeEmailField email={user.email} onSuccess={handleEmailChangeSuccess} />

          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
              <PhoneInput
                label={t('phone')}
                defaultCountry="EG"
                value={field.value || undefined}
                onChange={(value: string | undefined) => field.onChange(value ?? '')}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Gender (UI-only) */}
          <Input
            label={t('gender')}
            value={user.gender ? t(`genderOptions.${user.gender.toLowerCase()}`) : ''}
            disabled
            className="border-0"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse items-stretch justify-between gap-4 pt-15 sm:flex-row sm:items-center">
          <DeleteAccountButton />

          <Button
            type="submit"
            loading={isUpdating}
            disabled={!isDirty || isUpdating}
            className="w-full sm:w-57"
          >
            {t('submit')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
