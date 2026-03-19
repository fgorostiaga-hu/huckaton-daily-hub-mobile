import { format, isToday, isBefore, isSameDay, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const TODAY = new Date();

export function formatDate(date: Date, formatStr: string): string {
  return format(date, formatStr, { locale: es });
}

export function isPastDate(date: Date): boolean {
  return isBefore(startOfDay(date), startOfDay(TODAY));
}

export function isTodayDate(date: Date): boolean {
  return isSameDay(date, TODAY);
}

export function isOverdue(date: Date): boolean {
  return isBefore(startOfDay(date), startOfDay(TODAY));
}

export function isDueToday(date: Date): boolean {
  return isSameDay(date, TODAY);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

export function formatDateRange(start: Date, end?: Date): string {
  if (!end || isSameDay(start, end)) {
    return formatDate(start, "d 'de' MMMM");
  }
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()} – ${formatDate(end, "d 'de' MMMM")}`;
  }
  return `${formatDate(start, "d 'de' MMM")} – ${formatDate(end, "d 'de' MMM")}`;
}

export function getLeaveTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'vacation': 'Vacaciones',
    'medical-leave': 'Licencia médica',
    'personal': 'Licencia personal',
  };
  return labels[type] || type;
}

// Mock current time for demo: 08:00 on TODAY
const MOCK_CURRENT_MINS = 8 * 60; // 08:00

export function isEventPast(startTime: string): boolean {
  const [h, m] = startTime.split(':').map(Number);
  return (h * 60 + m) < MOCK_CURRENT_MINS;
}

export function getTimeUntilEvent(startTime: string): string {
  const [h, m] = startTime.split(':').map(Number);
  const diff = (h * 60 + m) - MOCK_CURRENT_MINS;
  if (diff <= 0) return '';
  if (diff < 60) return `en ${diff} min`;
  const hours = Math.floor(diff / 60);
  const mins = diff % 60;
  if (mins === 0) return `en ${hours}h`;
  return `en ${hours}h ${mins}m`;
}
