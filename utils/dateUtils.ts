import { CalendarDay } from '../types';

export const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getMonthName = (date: Date): string => {
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

export const generateCalendarGrid = (currentDate: Date): CalendarDay[] => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of the month
  const firstDayOfMonth = new Date(year, month, 1);
  // Last day of the month
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarDays: CalendarDay[] = [];

  const today = new Date();
  const todayKey = formatDateKey(today);

  // Previous month padding
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthLastDay - i);
    calendarDays.push({
      date: d,
      isCurrentMonth: false,
      isToday: formatDateKey(d) === todayKey,
      dateKey: formatDateKey(d),
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    calendarDays.push({
      date: d,
      isCurrentMonth: true,
      isToday: formatDateKey(d) === todayKey,
      dateKey: formatDateKey(d),
    });
  }

  // Next month padding to fill grid (42 cells total for 6 rows standard)
  const remainingCells = 42 - calendarDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    const d = new Date(year, month + 1, i);
    calendarDays.push({
      date: d,
      isCurrentMonth: false,
      isToday: formatDateKey(d) === todayKey,
      dateKey: formatDateKey(d),
    });
  }

  return calendarDays;
};