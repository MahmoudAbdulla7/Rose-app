'use client';

import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { STEP } from '../../lib/constants/forgot-password.constant';
import type { Step } from '../../lib/constants/forgot-password.constant';
import AuthFooter from '../auth-footer';

type PasswordResetSentProps = {
  goToStep: React.Dispatch<React.SetStateAction<Step>>;
  email: string;
};

export default function PasswordResetSent({ goToStep, email }: PasswordResetSentProps) {
  const t = useTranslations('auth.forgotPassword');

  return (
    <>
      {/* Header */}
      <div className="flex items-center">
        <Button
          type="button"
          variant="primary"
          size="icon"
          onClick={() => goToStep(STEP.EMAIL)}
          className="me-2.5"
        >
          <ChevronLeft className="rtl:rotate-180" />
        </Button>

        <h1 className="text-ds-text-plain text-2xl font-bold">{t('sent.title')}</h1>
      </div>

      <p className="text-ds-text-plain mt-1">{t('sent.description')}</p>

      <p className="text-ds-info">{email || '-'}</p>

      <Separator className="mt-4 mb-6" />

      {/* Body */}
      <p className="text-ds-text-plain mb-4">{t('sent.instruction')}</p>
      <p className="text-ds-text-default">{t('sent.spamHint')}</p>

      <AuthFooter text={t('helpFooter.text')} linkText={t('helpFooter.link')} href={null} />
    </>
  );
}
