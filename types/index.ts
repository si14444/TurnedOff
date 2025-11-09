/**
 * TurnedOff App Type Definitions
 */

export interface ChecklistItem {
  id: string;
  name: string;
  order: number;
  isChecked: boolean;
  checkedAt: string | null; // ISO timestamp
  photoUri: string | null;
  requiresPhoto: boolean; // Whether this item requires photo verification
  createdAt: string; // ISO timestamp
}

export interface DailyResetData {
  lastResetDate: string; // YYYY-MM-DD format
}

export interface AppSettings {
  dailyTime: string; // HH:MM format (24-hour) - time for daily reset and notification
  notifications: {
    enabled: boolean;
  };
}

export type ChecklistItemInput = Omit<
  ChecklistItem,
  "id" | "createdAt" | "isChecked" | "checkedAt" | "photoUri"
>;
