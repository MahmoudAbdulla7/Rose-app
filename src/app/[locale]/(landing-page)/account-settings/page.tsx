import type { Locale } from 'next-intl';

import { redirect } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AccountSettingsPage({ params }: Props) {
  const { locale } = await params;

  redirect({ href: '/account-settings/profile', locale: locale as Locale });
}
