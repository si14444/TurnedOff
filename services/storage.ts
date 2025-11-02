/**
 * Storage Service
 * Handles all data persistence using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChecklistItem, DailyResetData } from '../types';

const STORAGE_KEYS = {
  CHECKLIST_ITEMS: '@turnedoff:checklist_items',
  DAILY_RESET: '@turnedoff:daily_reset',
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

export const resetDailyChecks = async (): Promise<boolean> => {
  try {
    const items = await getChecklistItems();

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
// Utility Functions
// ============================================================================

export const clearAllData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.CHECKLIST_ITEMS,
      STORAGE_KEYS.DAILY_RESET,
    ]);
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};
