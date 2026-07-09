import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SkillBadgeProps {
  name: string;
  icon?: ReactNode;
  size?: 'sm' | 'md';
}

export default function SkillBadge({ name, icon, size = 'md' }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 bg-neu-base shadow-neu-flat rounded-full font-mono text-neu-text-secondary transition-shadow duration-400 hover:shadow-neu-raised',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
      )}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {name}
    </span>
  );
}
