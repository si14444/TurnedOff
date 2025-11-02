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

export type ChecklistItemInput = Omit<ChecklistItem, 'id' | 'createdAt' | 'isChecked' | 'checkedAt' | 'photoUri'>;
