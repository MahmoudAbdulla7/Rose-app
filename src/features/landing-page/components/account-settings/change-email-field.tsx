'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { IUser } from '@/features/auth/lib/types/auth';
import ChangeEmailModal from '@/features/landing-page/components/account-settings/change-email-modal';
import ConfirmEmailModal from '@/features/landing-page/components/account-settings/confirm-email-modal';
import { Input } from '@/shared/ui/input';

type ChangeEmailFieldProps = {
  email: string;
  onSuccess: (user: IUser) => void;
};

export default function ChangeEmailField({ email, onSuccess }: ChangeEmailFieldProps) {
  // Translation
  const t = useTranslations('accountSettings.profile');
  const tChangeEmail = useTranslations('accountSettings.changeEmail');

  // Local state
  const [changeEmailOpen, setChangeEmailOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  // Functions
  const handleOtpRequired = (newEmail: string) => {
    setPendingEmail(newEmail);
    setOtpOpen(true);
  };

  const handleEmailChangeSuccess = (updatedUser: IUser) => {
    setPendingEmail('');
    onSuccess(updatedUser);
  };

  return (
    <>
      <Input
        label={t('email')}
        type="email"
        value={email}
        disabled
        className="border-0"
        rightIcon={
          <button
            type="button"
            onClick={() => setChangeEmailOpen(true)}
            className="text-ds-primary hover:text-ds-primary-saturated cursor-pointer text-sm font-medium"
          >
            {tChangeEmail('change')}
          </button>
        }
      />

      <ChangeEmailModal
        open={changeEmailOpen}
        onOpenChange={setChangeEmailOpen}
        onOtpRequired={handleOtpRequired}
      />

      <ConfirmEmailModal
        open={otpOpen}
        pendingEmail={pendingEmail}
        onOpenChange={setOtpOpen}
        onSuccess={handleEmailChangeSuccess}
      />
    </>
  );
}
