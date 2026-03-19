'use client';

import { Home, MessageSquare, LayoutGrid, Newspaper, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}

function NavItem({ icon, label, active, badge, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-0.5 flex-1 py-2 relative transition-colors active:opacity-70',
      )}
      style={{ color: active ? '#496BE3' : '#9CA3AF' }}
    >
      <div className="relative">
        {icon}
        {badge && badge > 0 && (
          <span
            className="absolute -top-1 -right-1.5 flex items-center justify-center bg-red-500 text-white rounded-full font-bold"
            style={{ width: '16px', height: '16px', fontSize: '9px' }}
          >
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </div>
      <span
        className="font-medium"
        style={{ fontSize: '10px', color: active ? '#496BE3' : '#9CA3AF' }}
      >
        {label}
      </span>
      {/* Active dot */}
      {active && (
        <span
          className="absolute bottom-1 rounded-full"
          style={{
            width: '4px',
            height: '4px',
            background: '#496BE3',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      )}
    </button>
  );
}

export function BottomNav() {
  return (
    <nav
      className="flex items-stretch bg-white"
      style={{
        borderTop: '0.5px solid rgba(0,0,0,0.08)',
        // No extra safe-area padding needed — home indicator is rendered inside PhoneFrame
        height: '56px',
        flexShrink: 0,
      }}
    >
      <NavItem
        icon={<Home style={{ width: '22px', height: '22px' }} />}
        label="Inicio"
        active
      />
      <NavItem icon={<Newspaper style={{ width: '22px', height: '22px' }} />} label="Muro" />
      <NavItem icon={<LayoutGrid style={{ width: '22px', height: '22px' }} />} label="Apps" />
      <NavItem icon={<MessageSquare style={{ width: '22px', height: '22px' }} />} label="Chats" />
      <NavItem icon={<User style={{ width: '22px', height: '22px' }} />} label="Perfil" />
    </nav>
  );
}
