'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/lib/context';
import { categoryColors } from '@/lib/data';
import { TODAY, isEventPast, getTimeUntilEvent } from '@/lib/utils';
import { ChevronDown, ChevronUp, CalendarDays, Video } from 'lucide-react';
import { CalendarEvent } from '@/lib/types';
import { CategoryIcon } from '@/components/ui/category-icon';

// Categories to include in "Proximos eventos" section
const INCLUDED_CATEGORIES = new Set([
  'videocall',
  'onboarding',
  'performance',
  'survey',
  'company-event',
  'training',
]);

export function EventsSection() {
  const { events, openBottomSheet } = useApp();
  const [expanded, setExpanded] = useState(false);

  // Only upcoming events today (no past ones)
  const upcomingEvents = useMemo(() => {
    return events.filter(event => {
      if (!INCLUDED_CATEGORIES.has(event.category)) return false;

      const eventDate = new Date(event.startDate);
      const eventEnd = event.endDate ? new Date(event.endDate) : eventDate;

      const todayTime = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
      const startMs = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()).getTime();
      const endMs = new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate()).getTime();

      if (todayTime < startMs || todayTime > endMs) return false;

      // Skip timed events that already passed (mock current time = 08:00)
      if (!event.isAllDay && event.startTime && isEventPast(event.startTime)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (!a.isAllDay && b.isAllDay) return -1;
      if (a.isAllDay && !b.isAllDay) return 1;
      if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime);
      return 0;
    });
  }, [events]);

  // Empty state
  if (upcomingEvents.length === 0) {
    return (
      <section>
        <div className="bg-white rounded-2xl shadow-sm flex items-center gap-3 px-4 py-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: '#EFF6FF' }}>
            <CalendarDays className="w-4 h-4" style={{ color: '#496BE3' }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Próximos eventos</p>
            <p className="text-xs text-gray-400">Tu agenda está libre ✨</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Collapsible header */}
        <button
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
          onClick={() => setExpanded(v => !v)}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: '#EFF6FF' }}>
              <CalendarDays className="w-4 h-4" style={{ color: '#496BE3' }} />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">Próximos eventos</p>
              {!expanded && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {upcomingEvents.length} evento{upcomingEvents.length !== 1 ? 's' : ''} hoy
                </p>
              )}
            </div>
          </div>
          {expanded
            ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
            : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
          }
        </button>

        {/* All events — only visible when expanded */}
        {expanded && (
          <div className="border-t border-gray-50 divide-y divide-gray-50">
            {upcomingEvents.map((event) => (
              <EventRow
                key={event.id}
                event={event}
                onClick={() => openBottomSheet({ type: 'event', event })}
                onJoin={() => openBottomSheet({ type: 'videocall', event })}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EventRow({ event, onClick, onJoin }: { event: CalendarEvent; onClick: () => void; onJoin: () => void }) {
  const color = categoryColors[event.category] || '#6B7280';
  const isVideocall = event.category === 'videocall';
  const timeUntil = !event.isAllDay && event.startTime ? getTimeUntilEvent(event.startTime) : null;

  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <button
        onClick={onClick}
        className="flex-1 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left rounded-lg"
      >
        <div
          className="w-1 h-10 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <CategoryIcon category={event.category} size={18} className="text-gray-500 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{event.title}</p>
          <div className="flex items-center gap-1.5">
            <p className="text-xs text-gray-500">
              {event.isAllDay ? 'Todo el día' : `${event.startTime} – ${event.endTime}`}
            </p>
            {timeUntil && (
              <span className="text-[10px] text-gray-400">{timeUntil}</span>
            )}
          </div>
        </div>
      </button>

      {isVideocall && (
        <button
          onClick={(e) => { e.stopPropagation(); onJoin(); }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors hover:opacity-90"
          style={{ backgroundColor: '#496BE3', color: 'white' }}
        >
          <Video className="w-3.5 h-3.5" />
          Unirse
        </button>
      )}
    </div>
  );
}
