'use client';

import { useMemo, useState } from 'react';
import { useApp } from '@/lib/context';
import { absentToday } from '@/lib/data';
import { Avatar } from '@/components/ui/avatar';
import { isTodayDate } from '@/lib/utils';
import { Cake, Gift, Users, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * TeamSection — cognitively light single card that merges:
 *  • Birthdays & anniversaries (today only)
 *  • Who's out today
 * Secondary info starts collapsed; tap header to expand.
 */
export function TeamSection() {
  const { events, openBottomSheet } = useApp();
  const [expanded, setExpanded] = useState(false);

  const celebrations = useMemo(
    () =>
      events.filter(
        (e) =>
          (e.category === 'birthday' || e.category === 'anniversary') &&
          isTodayDate(e.startDate)
      ),
    [events]
  );

  const hasCelebrations = celebrations.length > 0;
  const hasAbsent = absentToday.length > 0;

  if (!hasCelebrations && !hasAbsent) return null;

  // ── Summary line shown when collapsed ──
  const summaryParts: string[] = [];
  if (hasCelebrations) {
    summaryParts.push(
      celebrations.length === 1
        ? `${celebrations[0].person?.name?.split(' ')[0]} cumple hoy`
        : `${celebrations.length} celebraciones hoy`
    );
  }
  if (hasAbsent) {
    summaryParts.push(
      absentToday.length === 1
        ? `${absentToday[0].name.split(' ')[0]} ausente`
        : `${absentToday.length} ausentes hoy`
    );
  }

  return (
    <section>
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* ── Collapsible header ── */}
        <button
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
          onClick={() => setExpanded((v) => !v)}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: '#EFF6FF' }}
            >
              <Users className="w-4 h-4" style={{ color: '#496BE3' }} />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">Mi equipo hoy</p>
              {!expanded && (
                <p className="text-xs text-gray-400 mt-0.5">{summaryParts.join(' · ')}</p>
              )}
            </div>
          </div>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {/* ── Expanded content ── */}
        {expanded && (
          <div className="border-t border-gray-50">
            {/* Birthdays */}
            {hasCelebrations && (
              <div className="px-4 py-3 space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Celebraciones
                </p>
                {celebrations.map((event) => {
                  const isBirthday = event.category === 'birthday';
                  return (
                    <div key={event.id} className="flex items-center gap-3">
                      <Avatar
                        name={event.person?.name || ''}
                        initials={event.person?.avatar}
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {event.person?.name}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          {isBirthday ? (
                            <><Cake className="w-3 h-3 text-gray-500" /> Cumpleaños</>
                          ) : (
                            <><Gift className="w-3 h-3 text-gray-500" /> {event.yearsInCompany} años en Humand</>
                          )}
                        </p>
                      </div>
                      <button
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-all active:scale-95"
                        style={{ background: '#EEF2FF', color: '#496BE3' }}
                      >
                        Felicitar
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Divider */}
            {hasCelebrations && hasAbsent && (
              <div className="mx-4 h-px bg-gray-50" />
            )}

            {/* Absent */}
            {hasAbsent && (
              <div className="px-4 py-3 space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Ausentes hoy
                </p>
                <div className="flex flex-wrap gap-2">
                  {absentToday.slice(0, 3).map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-full"
                    >
                      <Avatar name={person.name} initials={person.avatar} size="xs" />
                      <span className="text-xs text-gray-600 font-medium">
                        {person.name.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                  {absentToday.length > 3 && (
                    <button
                      onClick={() => openBottomSheet({ type: 'whos-out' })}
                      className="flex items-center px-2.5 py-1.5 rounded-full transition-colors hover:opacity-80"
                      style={{ backgroundColor: '#EEF2FF', color: '#496BE3' }}
                    >
                      <span className="text-xs font-medium">
                        +{absentToday.length - 3} más
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
