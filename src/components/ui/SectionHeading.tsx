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
    <div className={cn(center && 'text-center')}>
      <p className="text-neu-accent font-mono text-sm uppercase tracking-widest">{eyebrow}</p>
      <h2 className={cn('text-display-lg font-display heading-accent', center && 'mx-auto')}>{title}</h2>
      {subtitle && (
        <p className="text-neu-text-secondary text-base leading-relaxed mt-4 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
