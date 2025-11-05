/**
 * Notification Service
 * Handles scheduling and managing daily notifications
 */

import * as Notifications from 'expo-notifications';
import { getSettings } from './storage';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Schedule daily notification at specified time
 */
export const scheduleDailyNotification = async (
  time: string // HH:MM format
): Promise<boolean> => {
  try {
    // Cancel all existing notifications first
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Parse time
    const [hours, minutes] = time.split(':').map(Number);

    // Schedule daily notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '아맞다! 📋',
        body: '오늘의 체크리스트를 확인해주세요',
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: hours,
        minute: minutes,
      },
    });

    console.log(`Daily notification scheduled at ${time}`);
    return true;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return false;
  }
};

/**
 * Cancel all scheduled notifications
 */
export const cancelAllNotifications = async (): Promise<boolean> => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('All notifications cancelled');
    return true;
  } catch (error) {
    console.error('Error cancelling notifications:', error);
    return false;
  }
};

/**
 * Setup notifications based on current settings
 */
export const setupNotifications = async (): Promise<boolean> => {
  try {
    const settings = await getSettings();

    if (settings.notifications.enabled) {
      // Check permission
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        console.log('Notification permission not granted, skipping setup');
        return false;
      }

      // Schedule notification
      return await scheduleDailyNotification(settings.dailyTime);
    } else {
      // Cancel notifications if disabled
      return await cancelAllNotifications();
    }
  } catch (error) {
    console.error('Error setting up notifications:', error);
    return false;
  }
};
