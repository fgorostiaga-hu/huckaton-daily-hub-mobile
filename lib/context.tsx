'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Task, ViewMode, CalendarViewMode, CalendarEvent, HubSectionKey, HubSectionsConfig } from './types';
import { initialTasks, events } from './data';
import { TODAY } from './utils';

const HUB_SECTIONS_KEY = 'dailyhub-sections';

const defaultSections: HubSectionsConfig = {
  aiBrief: true,
  shift: true,
  events: true,
  tasks: true,
  team: true,
};

function loadSections(): HubSectionsConfig {
  if (typeof window === 'undefined') return defaultSections;
  try {
    const raw = localStorage.getItem(HUB_SECTIONS_KEY);
    if (raw) return { ...defaultSections, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return defaultSections;
}

interface AppState {
  tasks: Task[];
  toggleTask: (taskId: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  
  calendarView: CalendarViewMode;
  setCalendarView: (view: CalendarViewMode) => void;
  
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  
  activeFilters: Set<string>;
  toggleFilter: (filter: string) => void;
  setAllFilters: (active: boolean) => void;
  
  bottomSheet: BottomSheetState | null;
  openBottomSheet: (sheet: BottomSheetState) => void;
  closeBottomSheet: () => void;
  
  events: CalendarEvent[];

  hubSections: HubSectionsConfig;
  toggleHubSection: (key: HubSectionKey) => void;
  dismissAiBrief: () => void;
}

export type BottomSheetState =
  | { type: 'event'; event: CalendarEvent }
  | { type: 'videocall'; event: CalendarEvent }
  | { type: 'shift'; date: Date }
  | { type: 'whos-out' }
  | { type: 'new-task' }
  | { type: 'new-videocall' }
  | { type: 'day-events'; date: Date }
  | { type: 'filters' };

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [viewMode, setViewMode] = useState<ViewMode>('inicio');
  const [calendarView, setCalendarView] = useState<CalendarViewMode>('semana');
  const [selectedDate, setSelectedDate] = useState<Date>(TODAY);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    new Set(['birthday', 'anniversary', 'holiday', 'vacation', 'medical-leave', 'company-event', 'performance', 'survey', 'training', 'onboarding', 'task', 'videocall', 'communication'])
  );
  const [bottomSheet, setBottomSheet] = useState<BottomSheetState | null>(null);
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>(events);
  const [hubSections, setHubSections] = useState<HubSectionsConfig>(defaultSections);

  useEffect(() => {
    setHubSections(loadSections());
  }, []);

  const toggleHubSection = useCallback((key: HubSectionKey) => {
    setHubSections(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(HUB_SECTIONS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const dismissAiBrief = useCallback(() => {
    setHubSections(prev => {
      const next = { ...prev, aiBrief: false };
      localStorage.setItem(HUB_SECTIONS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
          completedDate: !task.completed ? TODAY : undefined,
        };
      }
      return task;
    }));
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(filter)) {
        next.delete(filter);
      } else {
        next.add(filter);
      }
      return next;
    });
  };

  const setAllFilters = (active: boolean) => {
    if (active) {
      setActiveFilters(new Set([
        'birthday', 'anniversary', 'holiday', 'vacation', 'medical-leave',
        'company-event', 'performance', 'survey', 'training', 'onboarding',
        'task', 'videocall', 'communication',
      ]));
    } else {
      setActiveFilters(new Set());
    }
  };

  const openBottomSheet = (sheet: BottomSheetState) => setBottomSheet(sheet);
  const closeBottomSheet = () => setBottomSheet(null);

  

  return (
    <AppContext.Provider value={{
      tasks,
      toggleTask,
      addTask,
      viewMode,
      setViewMode,
      calendarView,
      setCalendarView,
      selectedDate,
      setSelectedDate,
      activeFilters,
      toggleFilter,
      setAllFilters,
      bottomSheet,
      openBottomSheet,
      closeBottomSheet,
      events: allEvents,
      hubSections,
      toggleHubSection,
      dismissAiBrief,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
