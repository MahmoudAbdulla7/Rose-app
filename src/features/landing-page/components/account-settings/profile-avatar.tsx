'use client';

import { CloudUpload, Loader2, UserRound } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import { AVATAR_ACCEPT } from '@/features/landing-page/lib/constants/profile.constant';
import { useProfileAvatar } from '@/features/landing-page/lib/hooks/use-profile-avatar.hook';

type ProfileAvatarProps = {
  currentPhoto?: string | null;
};

export default function ProfileAvatar({ currentPhoto }: ProfileAvatarProps) {
  // Translation
  const t = useTranslations('accountSettings.profile');

  // Avatar
  const {
    avatarInputId,
    control,
    fileInputRef,
    handleFileChange,
    isExternalPreview,
    isUploading,
    openFilePicker,
    preview,
  } = useProfileAvatar(currentPhoto);

  return (
    <Controller
      name="image"
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex items-center gap-4">
          <div className="relative size-20 shrink-0">
            <div className="bg-ds-muted size-20 overflow-hidden rounded-full">
              {preview ? (
                isExternalPreview ? (
                  <Image
                    src={preview}
                    alt={t('uploadPhotoAria')}
                    className="size-full object-cover"
                    width={80}
                    height={80}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt={t('uploadPhotoAria')} className="size-full object-cover" />
                )
              ) : (
                <div className="text-ds-text-muted flex size-full items-center justify-center">
                  <UserRound className="size-10" strokeWidth={1.5} />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={openFilePicker}
              disabled={isUploading}
              aria-label={t('uploadPhotoAria')}
              className="shadow-ds-soft absolute inset-e-0 bottom-0 flex size-7 cursor-pointer items-center justify-center rounded-full bg-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isUploading ? (
                <Loader2 className="size-3.5 animate-spin text-zinc-900" strokeWidth={1.75} />
              ) : (
                <CloudUpload className="size-3.5 text-zinc-900" strokeWidth={1.75} />
              )}
            </button>

            <input
              ref={fileInputRef}
              id={avatarInputId}
              type="file"
              accept={AVATAR_ACCEPT}
              className="hidden"
              disabled={isUploading}
              aria-invalid={!!fieldState.error}
              onChange={(event) =>
                handleFileChange(event.target.files?.[0] ?? undefined, field.onChange)
              }
            />
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-ds-text-plain text-base font-medium">{t('uploadPhoto')}</p>
            <p className="text-ds-text-muted text-sm">{t('uploadPhotoHint')}</p>
            {fieldState.error?.message && (
              <p className="text-ds-danger text-xs">{fieldState.error.message}</p>
            )}
          </div>
        </div>
      )}
    />
  );
}
