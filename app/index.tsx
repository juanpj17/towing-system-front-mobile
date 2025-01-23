import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import * as NotificationConfig from '../utils/notification-configs';

export default function Index() {
  useEffect(() => {
    let isSubscribed = true;

    const setupNotifications = async () => {
      if (isSubscribed) {
        const enabled = await NotificationConfig.requestNotificationPermission();
        if (enabled) {
          await NotificationConfig.configureForegroundNotificationHandler();
        }
      }
    };

    setupNotifications();

    return () => {
      isSubscribed = false;
    };
  }, []);
  
  return <Redirect href="/login" />;
}
