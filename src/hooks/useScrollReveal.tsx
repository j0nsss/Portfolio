import { useRef } from 'react';
import { m, useInView } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const margin = '-50px' as const;

type VariantKey = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleIn';

interface RevealProps {
  children: React.ReactNode;
  variant?: VariantKey;
  delay?: number;
  className?: string;
}

const enterConfig = (delay: number) => ({
  duration: 0.5,
  ease,
  delay,
});

const exitConfig = { duration: 0.35, ease };

export function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin });

  const getAnimate = () => {
    if (isInView) {
      switch (variant) {
        case 'fadeDown':
          return { opacity: 1, y: 0, transition: enterConfig(delay) };
        case 'fadeLeft':
          return { opacity: 1, x: 0, transition: enterConfig(delay) };
        case 'fadeRight':
          return { opacity: 1, x: 0, transition: enterConfig(delay) };
        case 'scaleIn':
          return { opacity: 1, scale: 1, transition: enterConfig(delay) };
        default:
          return { opacity: 1, y: 0, transition: enterConfig(delay) };
      }
    }
    switch (variant) {
      case 'fadeDown':
        return { opacity: 0, y: -30, transition: exitConfig };
      case 'fadeLeft':
        return { opacity: 0, x: -30, transition: exitConfig };
      case 'fadeRight':
        return { opacity: 0, x: 30, transition: exitConfig };
      case 'scaleIn':
        return { opacity: 0, scale: 0.9, transition: exitConfig };
      default:
        return { opacity: 0, y: 30, transition: exitConfig };
    }
  };

  return (
    <m.div ref={ref} initial={false} animate={getAnimate()} className={className}>
      {children}
    </m.div>
  );
}

export function StaggerReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin });

  return (
    <m.div
      ref={ref}
      initial={false}
      animate={
        isInView
          ? { transition: { staggerChildren: 0.1 } }
          : { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
      }
      className={className}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  variant = 'fadeUp',
  className,
}: {
  children: React.ReactNode;
  variant?: VariantKey;
  className?: string;
}) {
  const fadeUpExit = { opacity: 0, y: 30, transition: { duration: 0.35, ease } };

  return (
    <m.div
      variants={{
        enter: variant === 'fadeDown' ? { opacity: 1, y: 0, transition: { duration: 0.5, ease } } :
               variant === 'fadeLeft' ? { opacity: 1, x: 0, transition: { duration: 0.5, ease } } :
               variant === 'fadeRight' ? { opacity: 1, x: 0, transition: { duration: 0.5, ease } } :
               variant === 'scaleIn' ? { opacity: 1, scale: 1, transition: { duration: 0.5, ease } } :
               { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
        exit: fadeUpExit,
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}