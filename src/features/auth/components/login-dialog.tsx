'use client';

import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import LoginForm from '@/features/auth/components/login-form';
import { usePathname } from '@/i18n/navigation';
import AuthHeadline from '@/shared/components/auth-headline';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

type LoginDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const t = useTranslations('auth');
  const pathname = usePathname();

  const onSuccess = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        finalFocus={false}
        className="max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-md gap-0 overflow-y-auto p-5 sm:max-h-[min(92dvh,40rem)] sm:w-full sm:max-w-md sm:p-6 md:max-w-lg"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{t('login.pageTitle')}</DialogTitle>
          <DialogDescription>{t('welcome')}</DialogDescription>
        </DialogHeader>

        <div className="flex w-full flex-col pt-2">
          <AuthHeadline text={t('welcome')} className="mb-5 ltr:text-4xl rtl:text-3xl" />
          <LoginForm callbackUrl={pathname} onSuccess={onSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}