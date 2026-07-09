import type { MouseEventHandler, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface NeuButtonProps {
  children?: ReactNode;
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  ariaLabel?: string;
}

const sizeClasses: Record<NonNullable<NeuButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function NeuButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  icon,
  iconPosition = 'left',
  ariaLabel,
}: NeuButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 rounded-neu font-medium transition-all duration-200 ease-neu',
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
  );

  const variantClasses =
    variant === 'primary'
      ? 'bg-accent-gradient text-white shadow-neu-raised active:shadow-neu-pressed'
      : 'bg-neu-base text-neu-accent shadow-neu-raised active:shadow-neu-pressed hover:shadow-neu-hover';

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="inline-flex">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variantClasses)}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(base, variantClasses)}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
