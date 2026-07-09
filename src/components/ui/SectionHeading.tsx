import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: SectionHeadingProps) {
  return (
    <div className={cn('relative', center && 'text-center')}>
      <div className="flex items-center gap-3 mb-2">
        <span className="h-px w-6 bg-accent-gradient" />
        <p className="text-neu-accent font-mono text-xs uppercase tracking-[0.2em]">{eyebrow}</p>
        <span className={cn('h-px flex-1 bg-neu-shadow-dark/20', center && 'hidden')} />
        {center && <span className="h-px w-6 bg-accent-gradient" />}
      </div>
      <h2
        className={cn(
          'text-display-lg font-display font-bold text-neu-text-primary leading-tight',
          center && 'mx-auto',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-neu-text-secondary text-base leading-relaxed mt-4',
            center ? 'max-w-xl mx-auto' : 'max-w-2xl',
          )}
        >
          {subtitle}
        </p>
      )}
      <span
        className={cn(
          'block w-16 h-0.5 mt-4 rounded-full bg-accent-gradient',
          center && 'mx-auto',
        )}
      />
    </div>
  );
}