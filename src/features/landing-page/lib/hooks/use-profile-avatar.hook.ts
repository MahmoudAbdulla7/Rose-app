'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';

import type { IProfileFields } from '@/features/landing-page/lib/types/profile';
import { useUploadImage } from '@/shared/hooks/use-upload-image.hook';
import { createImageSchema } from '@/shared/lib/schemas/image.schema';
import type { IImageUploadFields } from '@/shared/lib/types/upload-image';

export function useProfileAvatar(currentPhoto?: string | null) {
  // Translation
  const t = useTranslations('accountSettings.profile');

  // Parent form
  const parentForm = useFormContext<IProfileFields>();

  // Upload
  const { uploadImage, isUploading } = useUploadImage();

  // Avatar form
  const avatarForm = useForm<IImageUploadFields>({
    resolver: zodResolver(createImageSchema(t)),
    defaultValues: {
      image: undefined,
    },
    mode: 'onChange',
  });

  const {
    control,
    getValues,
    resetField,
    setError,
  } = avatarForm;

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputId = useId();

  // State
  const [preview, setPreview] = useState<string | null>(currentPhoto ?? null);
  const [isExternalPreview, setIsExternalPreview] = useState(!!currentPhoto);

  // Effects
  useEffect(() => {
    setPreview(currentPhoto ?? null);
    setIsExternalPreview(!!currentPhoto);
  }, [currentPhoto]);

  useEffect(() => {
    let blobUrl: string | null = null;

    const unsubscribe = avatarForm.subscribe({
      formState: {
        values: true,
        isValid: true,
      },
      name: 'image',
      callback: ({ values, isValid: isImageValid }) => {
        if (values.image && isImageValid) {
          uploadImage(values.image, {
            onSuccess: (uploadedUrl) => {
              if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
              }

              blobUrl = URL.createObjectURL(getValues('image')!);
              setPreview(blobUrl);
              setIsExternalPreview(false);
              parentForm.setValue('photo', uploadedUrl, { shouldDirty: true });
            },
            onError: (message) => {
              setError('image', { message });
            },
          });
        }
      },
    });

    return () => {
      unsubscribe();
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [avatarForm, getValues, parentForm, setError, t, uploadImage]);

  // Functions
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const clearAvatar = () => {
    resetField('image');
    parentForm.setValue('photo', undefined, { shouldDirty: true });
    setPreview(currentPhoto ?? null);
    setIsExternalPreview(!!currentPhoto);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    onChange(file);

    if (!file) {
      setPreview(currentPhoto ?? null);
      setIsExternalPreview(!!currentPhoto);
    }
  };

  return {
    avatarInputId,
    control,
    fileInputRef,
    handleFileChange,
    isExternalPreview,
    isUploading,
    openFilePicker,
    preview,
    clearAvatar,
  };
}
