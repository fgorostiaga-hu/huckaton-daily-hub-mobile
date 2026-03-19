'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { useApp } from '@/lib/context';
import { useCalendarDensity } from '@/lib/hooks';
import { getShiftForDate, isHoliday, getHolidayName, categoryColors } from '@/lib/data';
import { CategoryIcon } from '@/components/ui/category-icon';
import { TODAY, isPastDate, isTodayDate, cn } from '@/lib/utils';
import { startOfWeek, addDays, isWeekend, getDay } from 'date-fns';
import { CalendarEvent } from '@/lib/types';

const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7:00 to 20:00
const DAY_LABELS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

// Categories allowed in all-day row
const ALL_DAY_CATEGORIES = new Set([
  'holiday', 'vacation', 'medical-leave', 
  'performance', 'survey', 'onboarding', 'communication'
]);

export function WeekView() {
  const { selectedDate, events, activeFilters, openBottomSheet } = useApp();
  const { density, eventMinHeight, showFullName, maxAllDayRows, nameMaxChars } = useCalendarDensity(activeFilters.size);
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  const [tbodyOffsetTop, setTbodyOffsetTop] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tbodyRef.current) {
      setTbodyOffsetTop(tbodyRef.current.offsetTop);
    }
  }, [density]);

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const filteredEvents = useMemo(() => {
    return events.filter(e => activeFilters.has(e.category));
  }, [events, activeFilters]);

  const getEventsForDay = (day: Date, allDay: boolean) => {
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      const eventEnd = event.endDate ? new Date(event.endDate) : eventDate;
      
      const dayTime = day.getTime();
      const startTime = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()).getTime();
      const endTime = new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate()).getTime();
      
      const isInRange = dayTime >= startTime && dayTime <= endTime;
      
      // For all-day row, only show allowed categories
      if (allDay) {
        return isInRange && event.isAllDay && ALL_DAY_CATEGORIES.has(event.category);
      }
      
      return isInRange && !event.isAllDay;
    });
  };

  // Group similar all-day events (vacations)
  const groupAllDayEvents = (dayEvents: CalendarEvent[]) => {
    const grouped: { events: CalendarEvent[]; label: string; color: string; category: string }[] = [];
    const vacations = dayEvents.filter(e => e.category === 'vacation' || e.category === 'medical-leave');
    const others = dayEvents.filter(e => 
      e.category !== 'vacation' && e.category !== 'medical-leave'
    );

    // Group vacations
    if (vacations.length > 1) {
      grouped.push({
        events: vacations,
        label: `Vacaciones · ${vacations.length} personas`,
        color: categoryColors['vacation'],
        category: 'vacation',
      });
    } else {
      vacations.forEach(e => grouped.push({
        events: [e],
        label: e.person?.name.split(' ')[0] || e.title,
        color: categoryColors[e.category],
        category: e.category,
      }));
    }

    others.forEach(e => grouped.push({
      events: [e],
      label: e.title.slice(0, nameMaxChars) + (e.title.length > nameMaxChars ? '...' : ''),
      color: categoryColors[e.category],
      category: e.category,
    }));

    return grouped;
  };

  // Get column background color
  const getColumnBg = (day: Date) => {
    const holiday = isHoliday(day);
    if (holiday) return '#FEFCE8'; // Yellow for holidays
    if (isWeekend(day)) return '#F3F4F6'; // Gray for weekends
    return 'white';
  };

  // Current time indicator
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const isCurrentWeek = weekDays.some(d => isTodayDate(d));
  const todayIndex = weekDays.findIndex(d => isTodayDate(d));
  const timeIndicatorTop = currentHour >= 7 && currentHour <= 20
    ? (currentHour - 7) * eventMinHeight + (currentMinute / 60) * eventMinHeight
    : -1;

  if (activeFilters.size === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-gray-500 text-center">
          No hay eventos. Activa los filtros para ver tu agenda.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 relative">
      {/* Current time indicator — only today's column */}
      {isCurrentWeek && timeIndicatorTop >= 0 && tbodyOffsetTop > 0 && todayIndex >= 0 && (
        <div
          className="absolute pointer-events-none z-20 flex items-center"
          style={{
            top: tbodyOffsetTop + timeIndicatorTop,
            left: `calc(32px + ${todayIndex} * (100% - 32px) / 7)`,
            width: `calc((100% - 32px) / 7)`,
          }}
        >
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: '#496BE3', marginLeft: '-4px' }}
          />
          <div className="flex-1 border-t-2" style={{ borderColor: '#496BE3' }} />
        </div>
      )}
      <table className="w-full border-collapse table-fixed">
        <colgroup>
          <col style={{ width: '32px' }} />
          {weekDays.map((_, i) => <col key={i} />)}
        </colgroup>
        
        {/* Header */}
        <thead className="bg-white">
          {/* Day names row */}
          <tr className="border-b border-gray-200">
            <th className="p-1"></th>
            {weekDays.map((day, i) => {
              const isPast = isPastDate(day);
              const isToday = isTodayDate(day);
              const holiday = isHoliday(day);
              const holidayName = getHolidayName(day);
              
              return (
                <th 
                  key={i}
                  className={cn(
                    'p-1 text-center font-normal',
                    isPast && !isToday && 'opacity-40'
                  )}
                  style={{ backgroundColor: getColumnBg(day) }}
                >
                  <div className="text-[10px] text-gray-500 flex items-center justify-center gap-0.5">
                    {holiday && <span>🏛️</span>}
                    {DAY_LABELS[i]}
                  </div>
                  <div 
                    className={cn(
                      'text-sm font-medium',
                      isToday && 'w-6 h-6 rounded-full flex items-center justify-center mx-auto text-white'
                    )}
                    style={{ backgroundColor: isToday ? '#496BE3' : undefined }}
                    title={holidayName || undefined}
                  >
                    {day.getDate()}
                  </div>
                </th>
              );
            })}
          </tr>

          {/* Shift strips row */}
          <tr className="border-t border-gray-100">
            <td className="px-1 py-2"></td>
            {weekDays.map((day, i) => {
              const shift = getShiftForDate(day);
              const holiday = isHoliday(day);
              const isPast = isPastDate(day);

              return (
                <td
                  key={i}
                  className={cn(
                    'px-1 py-1.5 text-[10px] text-gray-500 text-center',
                    isPast && !isTodayDate(day) && 'opacity-40'
                  )}
                  style={{ backgroundColor: getColumnBg(day) }}
                >
                  <button
                    onClick={() => openBottomSheet({ type: 'shift', date: day })}
                    className="w-full rounded transition-colors min-h-[22px]"
                  >
                    {shift && !holiday ? (
                      <span className="flex items-center justify-center gap-0.5 px-1 py-1 rounded font-medium" style={{ backgroundColor: 'rgba(73, 107, 227, 0.1)', color: '#496BE3' }}>
                        {shift.startTime.replace(':00', '')}-{shift.endTime.replace(':00', '')}
                      </span>
                    ) : holiday ? (
                      <span className="flex items-center justify-center px-1 py-1 rounded font-medium" style={{ backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#92400E' }}>
                        Feriado
                      </span>
                    ) : (
                      <span className="flex items-center justify-center px-1 py-1 rounded" style={{ backgroundColor: '#F3F4F6', color: '#9CA3AF' }}>
                        Desc.
                      </span>
                    )}
                  </button>
                </td>
              );
            })}
          </tr>

          {/* All-day events row — dot indicators */}
          <tr className="border-t border-gray-100">
            <td className="px-1 py-2"></td>
            {weekDays.map((day, i) => {
              const dayEvents = getEventsForDay(day, true);
              const isPast = isPastDate(day);

              // Deduplicate by category — one dot per category
              const seen = new Set<string>();
              const uniqueDots: { color: string; category: string; event: typeof dayEvents[0] }[] = [];
              for (const e of dayEvents) {
                if (!seen.has(e.category)) {
                  seen.add(e.category);
                  uniqueDots.push({ color: categoryColors[e.category], category: e.category, event: e });
                }
              }
              const MAX_DOTS = 3;
              const visibleDots = uniqueDots.slice(0, MAX_DOTS);
              const extraCount = uniqueDots.length - MAX_DOTS;

              return (
                <td
                  key={i}
                  className={cn(
                    'py-2 align-middle',
                    isPast && !isTodayDate(day) && 'opacity-40 grayscale'
                  )}
                  style={{ backgroundColor: getColumnBg(day) }}
                >
                  <button
                    onClick={() => {
                      if (dayEvents.length === 1) {
                        openBottomSheet({ type: 'event', event: dayEvents[0] });
                      } else if (dayEvents.length > 1) {
                        openBottomSheet({ type: 'day-events', date: day });
                      }
                    }}
                    className="w-full min-h-[20px] flex items-center justify-center gap-1"
                    disabled={dayEvents.length === 0}
                  >
                    {visibleDots.map((dot, idx) => (
                      <span
                        key={idx}
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: dot.color }}
                        title={dot.category}
                      />
                    ))}
                    {extraCount > 0 && (
                      <span
                        className="text-[8px] font-bold leading-none"
                        style={{ color: '#496BE3' }}
                      >
                        +{extraCount}
                      </span>
                    )}
                  </button>
                </td>
              );
            })}
          </tr>
        </thead>

        {/* Time grid body */}
        <tbody ref={tbodyRef}>
          {HOURS.map((hour) => (
            <tr key={hour}>
              <td className="text-[8px] text-gray-400 text-right pr-1 bg-white align-top pt-0.5 border-t border-gray-200">
                {hour}:00
              </td>
              {weekDays.map((day, dayIndex) => {
                const timedEvents = getEventsForDay(day, false).filter(e => {
                  if (!e.startTime) return false;
                  const eventHour = parseInt(e.startTime.split(':')[0]);
                  return eventHour === hour;
                });
                const isPast = isPastDate(day);
                const holiday = isHoliday(day);

                return (
                  <td 
                    key={dayIndex}
                    className={cn(
                      'border-t border-gray-200 p-0.5 align-top',
                      isPast && !isTodayDate(day) && 'opacity-40 grayscale'
                    )}
                    style={{ 
                      height: eventMinHeight,
                      backgroundColor: getColumnBg(day),
                    }}
                  >
                    {!holiday && timedEvents.map((event) => {
                      const displayName = event.title.slice(0, nameMaxChars) + (event.title.length > nameMaxChars ? '...' : '');
                      const isVideocall = event.category === 'videocall';
                      return (
                        <button
                          key={event.id}
                          onClick={() => openBottomSheet(
                            isVideocall 
                              ? { type: 'videocall', event } 
                              : { type: 'event', event }
                          )}
                          className="w-full text-[8px] px-1 py-1 rounded text-white text-left flex flex-col gap-0.5"
                          style={{ 
                            backgroundColor: categoryColors[event.category],
                            minHeight: eventMinHeight - 8,
                          }}
                        >
                          <div className="flex items-center gap-1">
                            <CategoryIcon category={event.category} size={10} className="text-white shrink-0" />
                            <span className="font-medium">{event.startTime}</span>
                          </div>
                          <span className="truncate leading-tight">{displayName}</span>
                        </button>
                      );
                    })}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
