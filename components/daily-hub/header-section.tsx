'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/lib/context';
import { getGreeting, formatDate, TODAY, isTodayDate, isEventPast, isOverdue } from '@/lib/utils';
import { Sparkles, Flame, X } from 'lucide-react';

export function HeaderSection() {
  const greeting = getGreeting();
  const firstName = useMemo(() => {
    const names = ['Santiago', 'Felipe', 'Camila', 'Eugenia'];
    return names[Math.floor(Math.random() * names.length)];
  }, []);
  const [showStreakTooltip, setShowStreakTooltip] = useState(false);
  const { tasks, events, hubSections, dismissAiBrief } = useApp();

  // Count pending and overdue tasks
  const pendingTasksCount = useMemo(
    () => tasks.filter(t => !t.completed).length,
    [tasks]
  );
  const overdueTasksCount = useMemo(
    () => tasks.filter(t => !t.completed && isOverdue(t.dueDate)).length,
    [tasks]
  );

  // Count today's upcoming videocalls
  const videocallCount = useMemo(() => {
    return events.filter(e =>
      e.category === 'videocall' &&
      isTodayDate(e.startDate) &&
      !e.isAllDay &&
      e.startTime &&
      !isEventPast(e.startTime)
    ).length;
  }, [events]);

  // Check if any survey closes today
  const surveyClosesToday = useMemo(() =>
    events.some(e => e.category === 'survey' && isTodayDate(e.startDate)),
    [events]
  );

  // Build compact one-line bullets
  const bullets: { text: string; highlight?: string }[] = [];
  if (pendingTasksCount > 0) {
    const overduePart = overdueTasksCount > 0 ? ` y ${overdueTasksCount} vencida${overdueTasksCount > 1 ? 's' : ''}` : '';
    bullets.push({ text: `Tenés ${pendingTasksCount} tareas pendientes${overduePart}` });
  }
  if (videocallCount > 0) {
    bullets.push({ text: `Hoy tenés ${videocallCount} videollamada${videocallCount !== 1 ? 's' : ''}` });
  }
  if (surveyClosesToday) {
    bullets.push({ text: 'La encuesta de clima cierra hoy' });
  }

  return (
    <section className="space-y-3">
      {/* Greeting */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold" style={{ color: '#182E7B' }}>
            {greeting}, {firstName}
          </h1>
          {/* Streak — subtle inline pill */}
          <div
            className="relative flex items-center gap-1 px-2 py-0.5 rounded-full cursor-help shrink-0"
            style={{ background: '#EEF2FF' }}
            onMouseEnter={() => setShowStreakTooltip(true)}
            onMouseLeave={() => setShowStreakTooltip(false)}
          >
            <Flame className="w-4 h-4" style={{ color: '#496BE3' }} />
            <span className="text-sm font-semibold leading-none" style={{ color: '#182E7B' }}>12</span>
            {showStreakTooltip && (
              <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-lg">
                Venís en racha, 12 días ingresando a la app
                <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 rotate-45" />
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-0.5">
          {formatDate(TODAY, "EEEE, d 'de' MMMM 'de' yyyy").replace(/^\w/, c => c.toUpperCase())}
        </p>
      </div>

      {/* AI Brief — conversational bullets */}
      {hubSections.aiBrief && bullets.length > 0 && (
        <div
          className="relative flex items-start gap-2 px-3 py-2.5 rounded-xl border-l-4"
          style={{ backgroundColor: '#EEF2FF', borderLeftColor: '#496BE3' }}
        >
          <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#496BE3' }} />
          <ul className="flex flex-col gap-1 flex-1 pr-5">
            {bullets.map((b) => (
              <li key={b.text} className="flex items-center gap-1.5 text-sm text-gray-700 leading-snug">
                <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                <span className="truncate">{b.text}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={dismissAiBrief}
            className="absolute top-2 right-2 p-0.5 rounded-full hover:bg-indigo-100 transition-colors"
            aria-label="Cerrar resumen"
          >
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      )}
    </section>
  );
}
