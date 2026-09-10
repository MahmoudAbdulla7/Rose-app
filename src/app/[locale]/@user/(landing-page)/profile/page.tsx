import { Suspense } from 'react';

import ProfileSkeleton from '@/features/layout/skeletons/profile.skeleton';
import ProfilePageContent from '@/features/profile/components/profile-page-content';

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfilePageContent />
    </Suspense>
  );
}
