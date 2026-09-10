import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';

import AccountSidebar from '@/features/landing-page/components/account-settings/account-sidebar';

type Props = {
  children: ReactNode;
};

export default async function AccountSettingsLayout({ children }: Props) {
  // Translation
  const t = await getTranslations('accountSettings');

  return (
    <section className="container flex flex-col gap-9 py-14">
      {/* Title */}
      <h1 className="text-ds-text-plain text-3xl font-bold sm:text-4xl xl:text-5xl">
        {t('title')}
      </h1>

      {/* Layout */}
      <div className="flex flex-col gap-9 lg:flex-row">
        <AccountSidebar />

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </section>
  );
}
