'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useRequestEmailChange } from '@/features/landing-page/lib/hooks/use-request-email-change.hook';
import { createChangeEmailSchema } from '@/features/landing-page/lib/schemas/change-email.schema';
import type { IChangeEmailFields } from '@/features/landing-page/lib/types/change-email';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';

type ChangeEmailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOtpRequired: (newEmail: string) => void;
};

export default function ChangeEmailModal({
  open,
  onOpenChange,
  onOtpRequired,
}: ChangeEmailModalProps) {
  // Translation
  const t = useTranslations('accountSettings.changeEmail');
  const tValidation = useTranslations('auth.register.validation');

  // Schema
  const changeEmailSchema = createChangeEmailSchema(tValidation);

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IChangeEmailFields>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: '',
    },
  });

  // Hooks
  const { mutate: requestEmailChange, isPending } = useRequestEmailChange((newEmail) => {
    onOpenChange(false);
    onOtpRequired(newEmail);
  });

  // Effects
  useEffect(() => {
    if (!open) {
      reset({ newEmail: '' });
    }
  }, [open, reset]);

  // Functions
  const submitEmail = handleSubmit((values) => {
    requestEmailChange(values);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-1rem)] min-w-118.5 gap-4 p-5 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-ds-text-plain text-xl font-bold">{t('title')}</DialogTitle>
          <DialogDescription className="text-ds-text-muted text-sm">
            {t('description')}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.stopPropagation();
            void submitEmail(event);
          }}
          className="flex flex-col gap-4"
        >
          <Input
            label={t('newEmail')}
            type="email"
            autoComplete="email"
            error={errors.newEmail?.message}
            {...register('newEmail')}
          />

          <Button type="submit" loading={isPending} className="w-full">
            {t('submit')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
