'use client';

import { useCallback, useEffect, useState } from 'react';

import { urlBase64ToUint8Array } from '../lib/utils/push-notifications.utils';

type PushStatus = {
  pushConfigured: boolean;
  subscriptionCount: number;
  unreadCount: number;
};

export function usePushNotifications() {
  const [pushConfigured, setPushConfigured] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isEnabling, setIsEnabling] = useState(false);

  useEffect(() => {
    const checkPushStatus = async () => {
      try {
        if (
          !('serviceWorker' in navigator) ||
          !('PushManager' in window) ||
          !('Notification' in window)
        ) {
          return;
        }

        const response = await fetch('/api/notifications/push-status');

        if (!response.ok) {
          return;
        }

        const data: {
          status: boolean;
          payload: PushStatus;
        } = await response.json();

        if (!data.status) {
          return;
        }

        setPushConfigured(data.payload.pushConfigured);

        if (!data.payload.pushConfigured) {
          return;
        }

        const registration = await navigator.serviceWorker.getRegistration('/sw.js');

        const subscription = await registration?.pushManager.getSubscription();

        setIsSubscribed(Boolean(subscription));
      } catch {
        setPushConfigured(false);
      }
    };

    checkPushStatus();
  }, []);

  const enablePush = useCallback(async () => {
    if (isEnabling || !pushConfigured) {
      return;
    }

    try {
      setIsEnabling(true);

      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        return;
      }

      const registration = await navigator.serviceWorker.register('/sw.js');

      const vapidResponse = await fetch('/api/notifications/vapid-public-key');

      if (!vapidResponse.ok) {
        throw new Error('Failed to get VAPID public key');
      }

      const vapidData: {
        status: boolean;
        payload: {
          publicKey: string;
        };
      } = await vapidResponse.json();

      if (!vapidData.status) {
        throw new Error('Failed to get VAPID public key');
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidData.payload.publicKey),
      });

      const subscriptionResponse = await fetch('/api/notifications/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription.toJSON()),
      });

      if (!subscriptionResponse.ok) {
        throw new Error('Failed to register push subscription');
      }

      setIsSubscribed(true);
    } catch (error) {
      console.error('Failed to enable push notifications:', error);
    } finally {
      setIsEnabling(false);
    }
  }, [isEnabling, pushConfigured]);

  return {
    pushConfigured,
    isSubscribed,
    isEnabling,
    enablePush,
  };
}
