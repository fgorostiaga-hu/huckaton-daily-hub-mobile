'use client';

import { useState, useRef } from 'react';
import { useApp } from '@/lib/context';
import { ViewToggle } from '@/components/ui/view-toggle';
import { HeaderSection } from './header-section';
import { HubSettings } from './hub-settings';
import { ShiftBanner } from './shift-banner';
import { EventsSection } from './events-section';
import { TasksSection } from './tasks-section';
import { TeamSection } from './team-section';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw } from 'lucide-react';

export function DailyHub() {
  const { hubSections } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const isPullingRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startYRef.current = e.touches[0].clientY;
      isPullingRef.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPullingRef.current || isRefreshing) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startYRef.current;
    if (diff > 0 && containerRef.current?.scrollTop === 0) {
      setPullDistance(Math.min(diff * 0.5, 80));
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
      }, 800);
    } else {
      setPullDistance(0);
    }
    isPullingRef.current = false;
  };

  if (isRefreshing) {
    return (
      <div className="flex-1 overflow-y-auto bg-[#F5F6FA]">
        <div className="p-4 space-y-4">
          <div className="flex justify-center">
            <ViewToggle />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-7 w-44" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
          <Skeleton className="h-14 w-full rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-14 w-full rounded-2xl" />
            <Skeleton className="h-14 w-full rounded-2xl" />
            <Skeleton className="h-14 w-full rounded-2xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-14 w-full rounded-2xl" />
            <Skeleton className="h-14 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto bg-[#F5F6FA] relative"
      style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull-to-refresh indicator */}
      {pullDistance > 0 && (
        <div
          className="absolute left-0 right-0 flex justify-center items-center"
          style={{ height: pullDistance }}
        >
          <RefreshCw
            className={`w-4 h-4 text-gray-400 ${pullDistance > 60 ? 'animate-spin' : ''}`}
            style={{ transform: `rotate(${pullDistance * 3}deg)` }}
          />
        </div>
      )}

      <div
        className="flex flex-col"
        style={{
          gap: '12px',
          padding: '12px 16px',
          transform: `translateY(${pullDistance}px)`,
          transition: pullDistance === 0 ? 'transform 0.2s ease' : 'none',
        }}
      >
        {/* ── View toggle + settings ── */}
        <div className="flex items-center justify-center pt-1">
          <div className="flex-1" />
          <ViewToggle />
          <div className="flex-1 flex justify-end">
            <HubSettings />
          </div>
        </div>

        {/* ── 1. Header: greeting + streak + AI brief ── */}
        <HeaderSection />

        {/* ── 2. Shift banner ── */}
        {hubSections.shift && <ShiftBanner />}

        {/* ── 3. Próximos eventos ── */}
        {hubSections.events && <EventsSection />}

        {/* ── 4. Mis tareas ── */}
        {hubSections.tasks && <TasksSection />}

        {/* ── 5. Mi equipo hoy ── */}
        {hubSections.team && <TeamSection />}

        {/* Bottom padding for FAB */}
        <div style={{ height: '72px' }} />
      </div>
    </div>
  );
}
