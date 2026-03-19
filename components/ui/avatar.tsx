'use client';

import { cn } from '@/lib/utils';

interface AvatarProps {
  name: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  xs: 'w-5 h-5 text-[8px]',
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
};

const AVATAR_COLOR = 'bg-gray-200 text-gray-600';

export function Avatar({ name, initials, size = 'md', className }: AvatarProps) {
  const displayInitials = initials || name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const colorClass = AVATAR_COLOR;

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-medium shrink-0',
        sizeClasses[size],
        colorClass,
        className
      )}
    >
      {displayInitials}
    </div>
  );
}
