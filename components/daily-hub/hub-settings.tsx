'use client';

import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/lib/context';
import { Settings } from 'lucide-react';
import type { HubSectionKey } from '@/lib/types';

const sectionLabels: { key: HubSectionKey; label: string }[] = [
  { key: 'aiBrief', label: 'Resumen IA' },
  { key: 'shift', label: 'Turno' },
  { key: 'events', label: 'Próximos eventos' },
  { key: 'tasks', label: 'Mis tareas' },
  { key: 'inbox', label: 'Inbox' },
  { key: 'team', label: 'Mi equipo hoy' },
];

export function HubSettings() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { hubSections, toggleHubSection } = useApp();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Configurar secciones"
      >
        <Settings className="w-4 h-4 text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
          <p className="px-3 pb-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Secciones visibles
          </p>
          {sectionLabels.map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <span className="text-sm text-gray-700">{label}</span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={hubSections[key]}
                  onChange={() => toggleHubSection(key)}
                />
                <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-accent transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4" />
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
