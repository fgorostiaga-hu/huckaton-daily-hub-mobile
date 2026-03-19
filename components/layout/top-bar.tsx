'use client';

import { Bell } from 'lucide-react';

export function TopBar() {
  return (
    <header
      className="flex items-center justify-between bg-white"
      style={{
        height: '48px',
        paddingLeft: '20px',
        paddingRight: '16px',
        borderBottom: '0.5px solid rgba(0,0,0,0.07)',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-comfortaa), Comfortaa, cursive',
          color: '#182E7B',
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '-0.5px',
        }}
      >
        humand
      </span>

      <button
        className="flex items-center justify-center rounded-full transition-colors active:bg-gray-100"
        style={{ width: '36px', height: '36px' }}
        aria-label="Notificaciones"
      >
        <Bell style={{ width: '20px', height: '20px', color: '#374151' }} />
      </button>
    </header>
  );
}
