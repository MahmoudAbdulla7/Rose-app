'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, UserRound } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { Value as PhoneValue } from 'react-phone-number-input';
import { toast } from 'sonner';

import DeleteAccountDialog from './delete-account-dialog';
import {
  updateProfileAction,
  uploadProfilePhotoAction,
} from '@/features/profile/lib/actions/profile.actions';
import {
  createProfileSchema,
  type ProfileFormValues,
} from '@/features/profile/lib/schemas/profile.schema';
import type { IUser } from '@/features/auth/lib/types/auth';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { PhoneInput } from '@/shared/ui/phone-input';
import { Link } from '@/i18n/navigation';

type Props = { user: IUser };

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export default function ProfileForm({ user }: Props) {
  const t = useTranslations('dashboard.profile');
  const { update: updateSession } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoFile, setPhotoFile] = useState<File>();
  const [photoPreview, setPhotoPreview] = useState(user.photo ?? user.image ?? '');
  const schema = createProfileSchema((key) => t(`validation.${key}`));

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone ?? '',
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE_SIZE) {
      toast.error(t('validation.photoInvalid'));
      event.target.value = '';
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      let photo: string | undefined;
      if (photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile);
        photo = (await uploadProfilePhotoAction(formData)).url;
      }

      const { user: updatedUser } = await updateProfileAction({ ...values, photo });
      await updateSession({ user: updatedUser });
      toast.success(t('messages.updated'));
    } catch (error) {
      const message = error instanceof Error ? error.message : t('messages.error');
      setError('root', { message });
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-ds-plain flex flex-col gap-6 rounded-xl p-5 sm:p-6 lg:p-8"
    >
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="bg-ds-muted relative flex size-22 items-center justify-center overflow-hidden rounded-full sm:size-28">
            {photoPreview ? (
              <Image
                src={photoPreview}
                alt=""
                fill
                sizes="112px"
                unoptimized
                className="object-cover"
              />
            ) : (
              <UserRound className="text-ds-text-muted size-11" />
            )}
          </div>
          <button
            type="button"
            aria-label={t('actions.uploadPhoto')}
            onClick={() => fileInputRef.current?.click()}
            className="border-ds-border-soft bg-ds-plain hover:bg-ds-muted absolute end-0 bottom-0 flex size-8 cursor-pointer items-center justify-center rounded-full border shadow-sm"
          >
            <Camera className="size-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
            onChange={handlePhotoChange}
            className="sr-only"
          />
        </div>
        <div className="min-w-0">
          <h2 className="text-ds-text-plain text-lg font-bold">{t('upload.title')}</h2>
          <p className="text-ds-text-soft mt-1 text-sm">{t('upload.description')}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label={t('fields.firstName')}
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label={t('fields.lastName')}
          error={errors.lastName?.message}
          {...register('lastName')}
        />
        <Input
          label={t('fields.email')}
          value={user.email}
          disabled
          wrapperClassName="md:col-span-2"
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              label={t('fields.phone')}
              value={field.value}
              onChange={(value: PhoneValue) => field.onChange(value ?? '')}
              error={errors.phone?.message}
              wrapperClassName="md:col-span-2"
            />
          )}
        />
        <Input
          label={t('fields.gender')}
          value={t(`gender.${user.gender?.toLowerCase() ?? 'unspecified'}`)}
          disabled
          wrapperClassName="md:col-span-2"
        />
      </div>

      {errors.root?.message && (
        <p role="alert" className="text-ds-danger text-sm">
          {errors.root.message}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-5 sm:justify-start">
          <DeleteAccountDialog />
          <Link href="/change-password" className="text-sm">
            {t('actions.changePassword')}
          </Link>
        </div>
        <Button type="submit" loading={isSubmitting} className="h-11! w-full sm:w-64">
          {t('actions.save')}
        </Button>
      </div>
    </form>
  );
}
