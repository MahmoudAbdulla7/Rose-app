'use client';

import LoginHoverPopup from '@/features/auth/components/login-hover-popup';
import UserDropdown from './user-dropdown';

type HeaderAuthProps = {
  className?: string;
  /** Show username / login label even on the smallest screens */
  alwaysShowLabel?: boolean;
  isAuthenticated: boolean;
};

export default function HeaderAuth({
  className,
  alwaysShowLabel = false,
  isAuthenticated,
}: HeaderAuthProps) {
  if (isAuthenticated) {
    return <UserDropdown />;
  }

  return <LoginHoverPopup className={className} alwaysShowLabel={alwaysShowLabel} />;
}