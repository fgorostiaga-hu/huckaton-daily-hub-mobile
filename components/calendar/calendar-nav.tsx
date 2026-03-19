'use client';

import { useApp } from '@/lib/context';
import { ViewToggle } from '@/components/ui/view-toggle';
import { TODAY, formatDate, cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import {
  startOfWeek, endOfWeek, addWeeks, subWeeks,
  addMonths, subMonths, isSameMonth
} from 'date-fns';
import { CalendarViewMode } from '@/lib/types';
import { CalendarSearch } from './calendar-search';

const FILTER_CATEGORIES = [
  'birthday', 'holiday', 'vacation', 'company-event', 'performance',
  'survey', 'training', 'onboarding', 'task', 'videocall', 'communication',
];

export function CalendarNav() {
  const { calendarView, setCalendarView, selectedDate, setSelectedDate, openBottomSheet, activeFilters } = useApp();

  const activeCount = FILTER_CATEGORIES.filter(c => activeFilters.has(c)).length;
  const allActive = activeCount === FILTER_CATEGORIES.length;

  const goToToday = () => setSelectedDate(TODAY);

  const goPrev = () => {
    switch (calendarView) {
      case 'semana':
        setSelectedDate(subWeeks(selectedDate, 1));
        break;
      case 'mes':
        setSelectedDate(subMonths(selectedDate, 1));
        break;
    }
  };

  const goNext = () => {
    switch (calendarView) {
      case 'semana':
        setSelectedDate(addWeeks(selectedDate, 1));
        break;
      case 'mes':
        setSelectedDate(addMonths(selectedDate, 1));
        break;
    }
  };

  const getDateRangeLabel = () => {
    switch (calendarView) {
      case 'semana': {
        const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
        if (isSameMonth(start, end)) {
          return `${start.getDate()} – ${formatDate(end, "d 'de' MMMM")}`;
        }
        return `${formatDate(start, "d MMM")} – ${formatDate(end, "d MMM")}`;
      }
      case 'mes':
        return formatDate(selectedDate, "MMMM yyyy").replace(/^\w/, c => c.toUpperCase());
    }
  };

  return (
    <div className="space-y-3">
      {/* View toggle */}
      <div className="flex justify-center">
        <ViewToggle />
      </div>

      {/* Calendar view mode toggle */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-full">
          {(['semana', 'mes'] as CalendarViewMode[]).map((view) => (
            <button
              key={view}
              onClick={() => setCalendarView(view)}
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium transition-all capitalize',
                calendarView === view
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Search + Filters row */}
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <CalendarSearch />
        </div>
        <button
          onClick={() => openBottomSheet({ type: 'filters' })}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border-2 transition-colors relative shrink-0"
          style={
            !allActive
              ? { borderColor: '#496BE3', color: '#496BE3', backgroundColor: '#EEF2FF' }
              : { borderColor: '#E5E7EB', color: '#6B7280', backgroundColor: 'white' }
          }
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
          {!allActive && (
            <span
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
              style={{ backgroundColor: '#496BE3' }}
            >
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Date navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={goPrev}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={goNext}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={goToToday}
            className="px-2 py-0.5 text-xs font-medium rounded-full hover:bg-gray-100 transition-colors"
            style={{ color: '#496BE3' }}
          >
            Hoy
          </button>
        </div>
        <span className="text-xs font-medium text-gray-700">
          {getDateRangeLabel()}
        </span>
      </div>
    </div>
  );
}
