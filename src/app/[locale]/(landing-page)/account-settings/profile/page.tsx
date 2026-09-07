import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import ProfileForm from '@/features/landing-page/components/account-settings/profile-form';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const commonT = await getTranslations({ locale: locale as Locale, namespace: 'common' });
  const t = await getTranslations({ locale: locale as Locale, namespace: 'accountSettings' });

  return {
    title: `${commonT('app.title')} | ${t('nav.profile')}`,
    description: t('profile.metadataDescription'),
  };
}

export default function ProfilePage() {
  return <ProfileForm />;
}
