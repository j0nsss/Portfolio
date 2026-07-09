import { m } from 'framer-motion';

export default function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-8 select-none">
      <div className="w-px h-16 bg-gradient-to-b from-neu-accent/40 via-neu-accent/20 to-transparent" />
      <div className="absolute flex flex-col items-center gap-1.5">
        <m.div
          className="w-2 h-2 rounded-full bg-neu-accent/60"
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="w-2 h-2 rounded-full bg-neu-accent/30" />
        <div className="w-2 h-2 rounded-full bg-neu-accent/10" />
      </div>
    </div>
  );
}