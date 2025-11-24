export type FlowerType = 'red' | 'blue';

export interface FlowerRecord {
  id: string;
  type: FlowerType;
  content: string;
  timestamp: number;
}

export interface DailyRecords {
  [dateKey: string]: FlowerRecord[];
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  dateKey: string; // Format YYYY-MM-DD
}
