import { getTranslations } from 'next-intl/server';

import ProfileForm from './profile-form';
import { getProfile } from '@/features/profile/lib/actions/profile.actions';

export default async function ProfilePageContent() {
  const [t, { user }] = await Promise.all([getTranslations('dashboard.profile'), getProfile()]);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <h1 className="text-ds-text-plain text-2xl font-bold">{t('title')}</h1>
      <ProfileForm user={user} />
    </section>
  );
}
