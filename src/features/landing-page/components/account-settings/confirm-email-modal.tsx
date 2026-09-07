'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { ResendTimer } from '@/features/auth/components/resend-timer';
import { OTP_LENGTH } from '@/features/auth/lib/constants/otp.constant';
import type { IUser } from '@/features/auth/lib/types/auth';
import { requestEmailChangeAction } from '@/features/landing-page/lib/actions/request-email-change.action';
import { useConfirmEmailChange } from '@/features/landing-page/lib/hooks/use-confirm-email-change.hook';
import { createConfirmEmailChangeSchema } from '@/features/landing-page/lib/schemas/change-email.schema';
import type { IConfirmEmailChangeFields } from '@/features/landing-page/lib/types/change-email';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { FieldError } from '@/shared/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';

type ConfirmEmailModalProps = {
  open: boolean;
  pendingEmail: string;
  onOpenChange: (open: boolean) => void;
  onSuccess: (user: IUser) => void;
};

export default function ConfirmEmailModal({
  open,
  pendingEmail,
  onOpenChange,
  onSuccess,
}: ConfirmEmailModalProps) {
  // Translation
  const t = useTranslations('accountSettings.changeEmail');
  const tCommon = useTranslations('common');

  // Schema
  const confirmEmailSchema = createConfirmEmailChangeSchema(t);

  // Form
  const { control, handleSubmit, reset, setError } = useForm<IConfirmEmailChangeFields>({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: {
      code: '',
    },
  });

  const code = useWatch({ control, name: 'code' }) ?? '';

  // Hooks
  const { mutate: confirmEmailChange, isPending } = useConfirmEmailChange((user) => {
    onOpenChange(false);
    onSuccess(user);
  });

  // Effects
  useEffect(() => {
    if (!open) {
      reset({ code: '' });
    }
  }, [open, reset]);

  // Functions
  const submitCode = handleSubmit((values) => {
    confirmEmailChange(values, {
      onError: (err) => {
        setError('code', {
          message: err instanceof Error ? err.message : t('otp.invalid'),
        });
      },
    });
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-1rem)] min-w-118.5 gap-4 p-5 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-ds-text-plain text-xl font-bold">{t('otp.title')}</DialogTitle>
          <DialogDescription className="text-ds-text-muted text-sm">
            {t('otp.description', { email: pendingEmail })}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.stopPropagation();
            void submitCode(event);
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col items-end gap-4">
            <Controller
              control={control}
              name="code"
              render={({ field, fieldState }) => (
                <>
                  <InputOTP
                    maxLength={OTP_LENGTH}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    containerClassName="w-full justify-center"
                  >
                    <InputOTPGroup>
                      {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          aria-invalid={!!fieldState.error}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>

                  {fieldState.error?.message && (
                    <FieldError className="w-full text-center">{fieldState.error.message}</FieldError>
                  )}
                </>
              )}
            />

            <ResendTimer
              email={pendingEmail}
              namespace="accountSettings.changeEmail"
              successMessage={t('codeSent')}
              errorMessage={tCommon('error.networkError')}
              resendAction={() => requestEmailChangeAction({ newEmail: pendingEmail })}
            />
          </div>

          <Button
            type="submit"
            loading={isPending}
            disabled={code.length !== OTP_LENGTH}
            className="w-full"
          >
            {t('otp.verify')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
