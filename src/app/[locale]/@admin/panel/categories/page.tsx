import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardCategoriesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'dashboard.nav' });

  return <h1 className="text-ds-text-plain text-2xl font-semibold">{t('categories')}</h1>;
}
