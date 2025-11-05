/**
 * TurnedOff App Type Definitions
 */

export interface ChecklistItem {
  id: string;
  name: string;
  order: number;
  isChecked: boolean;
  checkedAt: string | null;  // ISO timestamp
  photoUri: string | null;
  createdAt: string;          // ISO timestamp
}

export interface DailyResetData {
  lastResetDate: string;      // YYYY-MM-DD format
}

export interface AppSettings {
  dailyTime: string;           // HH:MM format (24-hour) - time for daily reset and notification
  notifications: {
    enabled: boolean;
  };
  photoRetention: {
    keepPhotos: boolean;       // If true, photos are kept after daily reset
    autoDeleteDays: number;    // Days to keep photos (0 = delete immediately)
  };
}

export type ChecklistItemInput = Omit<ChecklistItem, 'id' | 'createdAt' | 'isChecked' | 'checkedAt' | 'photoUri'>;
