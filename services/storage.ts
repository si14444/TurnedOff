/**
 * Storage Service
 * Handles all data persistence using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, File, Paths } from 'expo-file-system';
import { ChecklistItem, DailyResetData, AppSettings } from '../types';

const STORAGE_KEYS = {
  CHECKLIST_ITEMS: '@turnedoff:checklist_items',
  DAILY_RESET: '@turnedoff:daily_reset',
  SETTINGS: '@turnedoff:settings',
};

const DEFAULT_SETTINGS: AppSettings = {
  dailyTime: '04:00',
  notifications: {
    enabled: true,
  },
};

// ============================================================================
// Checklist Item Management
// ============================================================================

export const getChecklistItems = async (): Promise<ChecklistItem[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CHECKLIST_ITEMS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading checklist items:', error);
    return [];
  }
};

export const saveChecklistItems = async (items: ChecklistItem[]): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CHECKLIST_ITEMS, JSON.stringify(items));
    return true;
  } catch (error) {
    console.error('Error saving checklist items:', error);
    return false;
  }
};

export const createChecklistItem = async (name: string): Promise<ChecklistItem | null> => {
  try {
    const items = await getChecklistItems();

    const newItem: ChecklistItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      order: items.length,
      isChecked: false,
      checkedAt: null,
      photoUri: null,
      createdAt: new Date().toISOString(),
    };

    items.push(newItem);
    const success = await saveChecklistItems(items);

    return success ? newItem : null;
  } catch (error) {
    console.error('Error creating checklist item:', error);
    return null;
  }
};

export const deleteChecklistItem = async (itemId: string): Promise<boolean> => {
  try {
    const items = await getChecklistItems();
    const filteredItems = items.filter(item => item.id !== itemId);

    // Reorder remaining items
    const reorderedItems = filteredItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    return await saveChecklistItems(reorderedItems);
  } catch (error) {
    console.error('Error deleting checklist item:', error);
    return false;
  }
};

export const updateChecklistItemOrder = async (items: ChecklistItem[]): Promise<boolean> => {
  try {
    const reorderedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    return await saveChecklistItems(reorderedItems);
  } catch (error) {
    console.error('Error updating checklist item order:', error);
    return false;
  }
};

export const checkItem = async (itemId: string, photoUri: string): Promise<boolean> => {
  try {
    const items = await getChecklistItems();
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          isChecked: true,
          checkedAt: new Date().toISOString(),
          photoUri,
        };
      }
      return item;
    });

    return await saveChecklistItems(updatedItems);
  } catch (error) {
    console.error('Error checking item:', error);
    return false;
  }
};

// ============================================================================
// Daily Reset Management
// ============================================================================

export const getLastResetDate = async (): Promise<string | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_RESET);
    if (!data) return null;

    const resetData: DailyResetData = JSON.parse(data);
    return resetData.lastResetDate;
  } catch (error) {
    console.error('Error loading last reset date:', error);
    return null;
  }
};

export const setLastResetDate = async (date: string): Promise<boolean> => {
  try {
    const resetData: DailyResetData = {
      lastResetDate: date,
    };
    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_RESET, JSON.stringify(resetData));
    return true;
  } catch (error) {
    console.error('Error saving last reset date:', error);
    return false;
  }
};

/**
 * Clean up old photos from the photos directory
 */
const cleanupOldPhotos = async (): Promise<void> => {
  try {
    const photosDir = new Directory(Paths.document, 'photos');

    if (!(await photosDir.exists)) {
      return; // Nothing to clean up
    }

    // Get all files in the photos directory
    const files = await photosDir.list();

    // Delete all photo files
    for (const file of files) {
      try {
        if (file instanceof File) {
          await file.delete();
        }
      } catch (error) {
        console.error(`Error deleting photo file:`, error);
      }
    }

    console.log(`Cleaned up ${files.length} photo files`);
  } catch (error) {
    console.error('Error cleaning up photos:', error);
  }
};

export const resetDailyChecks = async (): Promise<boolean> => {
  try {
    const items = await getChecklistItems();

    // Clean up all old photos before resetting
    await cleanupOldPhotos();

    // Reset all items
    const resetItems = items.map(item => ({
      ...item,
      isChecked: false,
      checkedAt: null,
      photoUri: null,
    }));

    const success = await saveChecklistItems(resetItems);

    if (success) {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      await setLastResetDate(today);
    }

    return success;
  } catch (error) {
    console.error('Error resetting daily checks:', error);
    return false;
  }
};

export const checkAndResetIfNeeded = async (): Promise<boolean> => {
  try {
    const lastResetDate = await getLastResetDate();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    if (lastResetDate !== today) {
      console.log('Performing daily reset...');
      return await resetDailyChecks();
    }

    return false; // No reset needed
  } catch (error) {
    console.error('Error checking reset status:', error);
    return false;
  }
};

// ============================================================================
// Settings Management
// ============================================================================

export const getSettings = async (): Promise<AppSettings> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) return DEFAULT_SETTINGS;

    const settings: AppSettings = JSON.parse(data);
    // Merge with defaults to ensure all properties exist
    return {
      dailyTime: settings.dailyTime || DEFAULT_SETTINGS.dailyTime,
      notifications: {
        ...DEFAULT_SETTINGS.notifications,
        ...settings.notifications,
      },
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = async (settings: AppSettings): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
};

export const updateDailyTime = async (dailyTime: string): Promise<boolean> => {
  try {
    const settings = await getSettings();
    const updatedSettings: AppSettings = {
      ...settings,
      dailyTime,
    };
    return await saveSettings(updatedSettings);
  } catch (error) {
    console.error('Error updating daily time:', error);
    return false;
  }
};

export const updateNotificationSettings = async (
  notifications: Partial<AppSettings['notifications']>
): Promise<boolean> => {
  try {
    const settings = await getSettings();
    const updatedSettings: AppSettings = {
      ...settings,
      notifications: {
        ...settings.notifications,
        ...notifications,
      },
    };
    return await saveSettings(updatedSettings);
  } catch (error) {
    console.error('Error updating notification settings:', error);
    return false;
  }
};


// ============================================================================
// Utility Functions
// ============================================================================

export const clearAllData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.CHECKLIST_ITEMS,
      STORAGE_KEYS.DAILY_RESET,
      STORAGE_KEYS.SETTINGS,
    ]);
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};
