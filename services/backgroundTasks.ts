/**
 * Background Tasks Service
 * Handles scheduled background tasks like daily reset
 */

import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { resetDailyChecks, getSettings } from './storage';

const DAILY_RESET_TASK = 'daily-reset-task';

/**
 * Define the background task for daily reset
 */
TaskManager.defineTask(DAILY_RESET_TASK, async () => {
  try {
    console.log('Running daily reset background task...');
    const success = await resetDailyChecks();

    return success
      ? BackgroundFetch.BackgroundFetchResult.NewData
      : BackgroundFetch.BackgroundFetchResult.Failed;
  } catch (error) {
    console.error('Error in daily reset task:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

/**
 * Register background fetch for daily reset
 */
export const registerDailyResetTask = async (): Promise<boolean> => {
  try {
    const settings = await getSettings();
    const [hours, minutes] = settings.dailyTime.split(':').map(Number);

    // Calculate seconds until next reset time
    const now = new Date();
    const nextReset = new Date();
    nextReset.setHours(hours, minutes, 0, 0);

    // If reset time has passed today, schedule for tomorrow
    if (nextReset <= now) {
      nextReset.setDate(nextReset.getDate() + 1);
    }

    const intervalSeconds = 24 * 60 * 60; // 24 hours

    await BackgroundFetch.registerTaskAsync(DAILY_RESET_TASK, {
      minimumInterval: intervalSeconds,
      stopOnTerminate: false,
      startOnBoot: true,
    });

    console.log(`Daily reset task registered for ${settings.dailyTime}`);
    return true;
  } catch (error) {
    console.error('Error registering daily reset task:', error);
    return false;
  }
};

/**
 * Unregister background fetch
 */
export const unregisterDailyResetTask = async (): Promise<boolean> => {
  try {
    await BackgroundFetch.unregisterTaskAsync(DAILY_RESET_TASK);
    console.log('Daily reset task unregistered');
    return true;
  } catch (error) {
    console.error('Error unregistering daily reset task:', error);
    return false;
  }
};
