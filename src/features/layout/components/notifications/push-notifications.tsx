'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import { usePushNotifications } from '@/features/layout/hooks/use-push-notifications';

export default function PushNotifications() {
  const t = useTranslations('header.notifications');

  const { pushConfigured, isSubscribed, isEnabling, enablePush } = usePushNotifications();

  if (!pushConfigured || isSubscribed) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={enablePush}
      disabled={isEnabling}
      className="text-ds-plain hover:text-ds-muted h-auto p-0 text-xs hover:bg-transparent dark:hover:bg-transparent"
    >
      {isEnabling ? t('enablingNotifications') : t('enableNotifications')}
    </Button>
  );
}
