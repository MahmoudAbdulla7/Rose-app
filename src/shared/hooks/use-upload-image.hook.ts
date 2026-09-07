'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { uploadImage as uploadImageAction } from '@/shared/lib/actions/upload-image.action';

type UploadImageOptions = {
  onSuccess?: (url: string) => void;
  onError?: (message: string) => void;
};

export function useUploadImage() {
  // Translation
  const tCommon = useTranslations('common');

  // Mutation
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      const payload = await uploadImageAction(formData);
      return payload.url;
    },
  });

  // Functions
  const uploadImage = useCallback(
    (file: File, options?: UploadImageOptions) => {
      mutation.mutate(file, {
        onSuccess: (url) => {
          options?.onSuccess?.(url);
        },
        onError: (error) => {
          const message =
            error instanceof Error ? error.message : tCommon('error.networkError');
          toast.error(message);
          options?.onError?.(message);
        },
      });
    },
    [mutation, tCommon],
  );

  return {
    uploadImage,
    isUploading: mutation.isPending,
  };
}
