import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface NeuInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

const NeuInput = forwardRef<HTMLInputElement, NeuInputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id ?? `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

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
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-neu-base shadow-neu-sunken rounded-neu-sm px-4 py-3 text-neu-text-primary outline-none placeholder:text-neu-text-secondary/70',
              icon && 'pl-10',
              className,
            )}
            {...props}
          />
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neu-text-secondary inline-flex">
              {icon}
            </span>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-neu-error">{error}</p>}
      </div>
    );
  },
);

NeuInput.displayName = 'NeuInput';

export default NeuInput;
