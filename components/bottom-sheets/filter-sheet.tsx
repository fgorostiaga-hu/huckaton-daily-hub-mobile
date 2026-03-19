'use client';

import { useApp } from '@/lib/context';
import { categoryColors } from '@/lib/data';
import { CategoryIcon } from '@/components/ui/category-icon';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const FILTER_CATEGORIES = [
  'birthday',
  'holiday',
  'vacation',
  'company-event',
  'performance',
  'survey',
  'training',
  'onboarding',
  'task',
  'videocall',
  'communication',
] as const;

const FILTER_LABELS: Record<string, string> = {
  birthday: 'Cumpleaños',
  holiday: 'Feriados',
  vacation: 'Vacaciones',
  'company-event': 'Eventos de empresa',
  performance: 'Desempeño',
  survey: 'Evaluación de Clima',
  training: 'Capacitaciones',
  onboarding: 'Onboarding',
  task: 'Tareas',
  videocall: 'Videollamadas',
  communication: 'Comunicaciones',
};

export function FilterSheet() {
  const { activeFilters, toggleFilter, setAllFilters, closeBottomSheet } = useApp();

  const allActive = FILTER_CATEGORIES.every(c => activeFilters.has(c));
  const someActive = FILTER_CATEGORIES.some(c => activeFilters.has(c));
  const activeCount = FILTER_CATEGORIES.filter(c => activeFilters.has(c)).length;

  const handleToggleAll = () => {
    setAllFilters(!allActive);
  };

  const handleToggle = (category: string) => {
    toggleFilter(category);
    // Paired categories
    if (category === 'birthday') toggleFilter('anniversary');
    if (category === 'vacation') toggleFilter('medical-leave');
  };

  return (
    <div className="space-y-0 -mx-4 -mt-2">
      {/* Section label */}
      <div className="px-4 pt-2 pb-2">
        <span className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase">
          Tipos de eventos
        </span>
      </div>

      {/* All types row */}
      <button
        onClick={handleToggleAll}
        className={cn(
          'w-full flex items-center gap-3 px-4 py-3 transition-colors',
          allActive ? 'bg-indigo-50' : 'hover:bg-gray-50'
        )}
      >
        <div
          className={cn(
            'w-5 h-5 rounded flex items-center justify-center border-2 shrink-0 transition-all'
          )}
          style={
            allActive
              ? { borderColor: '#496BE3', backgroundColor: '#496BE3' }
              : someActive
              ? { borderColor: '#496BE3', backgroundColor: 'white' }
              : { borderColor: '#D1D5DB', backgroundColor: 'white' }
          }
        >
          {allActive && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          {!allActive && someActive && (
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#496BE3' }} />
          )}
        </div>
        <span className={cn('text-sm font-semibold flex-1 text-left', allActive ? 'text-gray-800' : 'text-gray-600')}>
          Todos los tipos
        </span>
        <span className="text-xs text-gray-400 shrink-0">
          {activeCount}/{FILTER_CATEGORIES.length}
        </span>
      </button>

      {/* Thin divider */}
      <div className="mx-4 border-t border-gray-100" />

      {/* Individual categories */}
      {FILTER_CATEGORIES.map((category) => {
        const isActive = activeFilters.has(category);
        const color = categoryColors[category];
        const label = FILTER_LABELS[category];

        return (
          <button
            key={category}
            onClick={() => handleToggle(category)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div
              className="w-5 h-5 rounded flex items-center justify-center border-2 shrink-0 transition-all"
              style={
                isActive
                  ? { borderColor: color, backgroundColor: 'white' }
                  : { borderColor: '#E5E7EB', backgroundColor: 'white' }
              }
            >
              {isActive && (
                <Check className="w-3 h-3" style={{ color }} strokeWidth={3} />
              )}
            </div>

            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${color}20` }}
            >
              <CategoryIcon category={category} size={16} style={{ color }} />
            </div>

            <span
              className={cn(
                'text-sm flex-1 text-left transition-colors',
                isActive ? 'text-gray-800 font-medium' : 'text-gray-400'
              )}
            >
              {label}
            </span>
          </button>
        );
      })}

      <div className="h-2" />
    </div>
  );
}
