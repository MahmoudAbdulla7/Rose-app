'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import { useResendTimer } from '../lib/hooks/use-resend-timer.hook';
import type { IRegisterFields } from '../lib/types/register';

interface IResendTimerProps {
  email: IRegisterFields['email'];
  resendAction?: () => Promise<IAPIResponse<null>>;
  namespace?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function ResendTimer({
  email,
  resendAction,
  namespace = 'auth.register',
  successMessage,
  errorMessage,
}: IResendTimerProps) {
  // Translation
  const t = useTranslations(namespace);

  // state
  const { secondsLeft, isResending, resend } = useResendTimer({
    email,
    resendAction,
    successMessage,
    errorMessage,
  });

  if (secondsLeft === null) return null;

  if (secondsLeft > 0) {
    return (
      <p className="text-muted-foreground flex min-h-7 items-center text-sm">
        {t('otp.resendIn', { seconds: secondsLeft })}
      </p>
    );
  }

  return (
    <Button type="button" variant="ghost" size="sm" loading={isResending} onClick={resend}>
      {t('otp.resend')}
    </Button>
  );
}
