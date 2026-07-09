import { forwardRef, type TextareaHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface NeuTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

const NeuTextarea = forwardRef<HTMLTextAreaElement, NeuTextareaProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id ?? `textarea-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className={cn(
            'block text-sm font-medium mb-1.5',
            error ? 'text-neu-error' : 'text-neu-text-secondary',
          )}
        >
          {label}
        </label>
        <div className="relative">
          <textarea
            ref={ref}
            id={inputId}
            className={cn(
              'w-full min-h-[140px] resize-y bg-neu-base shadow-neu-sunken rounded-neu-sm px-4 py-3 text-neu-text-primary outline-none placeholder:text-neu-text-secondary/70',
              icon && 'pl-10',
              className,
            )}
            {...props}
          />
          {icon && (
            <span className="absolute left-3 top-4 text-neu-text-secondary inline-flex">{icon}</span>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-neu-error">{error}</p>}
      </div>
    );
  },
);

NeuTextarea.displayName = 'NeuTextarea';

export default NeuTextarea;
