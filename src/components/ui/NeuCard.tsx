import { type ElementType, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface NeuCardProps {
  children: ReactNode;
  className?: string;
  sunken?: boolean;
  accent?: boolean;
  as?: ElementType;
  onClick?: () => void;
}

export default function NeuCard({
  children,
  className,
  sunken = false,
  accent = false,
  as,
  onClick,
}: NeuCardProps) {
  const Comp = as ?? 'div';

  return (
    <Comp
      onClick={onClick}
      className={cn(
        'bg-neu-base rounded-neu transition-shadow duration-400',
        sunken
          ? 'shadow-neu-sunken'
          : accent
            ? 'shadow-neu-accent'
            : 'shadow-neu-raised hover:shadow-neu-hover',
        className,
      )}
    >
      {children}
    </Comp>
  );
}
