import { Suspense } from 'react';

import ProfilePageContent from '@/features/profile/components/profile-page-content';
import ProfileSkeleton from '@/features/layout/skeletons/profile.skeleton';

export default function AdminProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfilePageContent />
    </Suspense>
  );
}
