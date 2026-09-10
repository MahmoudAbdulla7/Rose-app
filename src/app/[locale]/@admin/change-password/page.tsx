import { useTranslations } from 'next-intl';

import ChangePasswordForm from '@/features/landing-page/components/account-settings/change-password-form';

export default function AdminChangePasswordPage() {
  const t = useTranslations('dashboard.profile.actions');

  return (
    <>
      <h1 className="text-ds-text-plain mt-1 mb-6 text-2xl font-semibold">{t('changePassword')}</h1>
      <div className="bg-ds-plain rounded-3xl p-6">
        <ChangePasswordForm />
      </div>
    </>
  );
}
