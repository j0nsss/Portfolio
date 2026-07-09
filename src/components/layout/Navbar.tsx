import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'contact'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS, 0.4);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  const renderLinks = (onClick: () => void, mobile = false) =>
    NAV_LINKS.map((link) => {
      const id = link.href.slice(1);
      const active = activeId === id;
      return (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={onClick}
            className={cn(
              'relative font-medium text-sm transition-all duration-300',
              mobile
                ? 'block py-3.5 px-5 rounded-neu-sm'
                : 'px-4 py-2 rounded-neu-sm',
              active
                ? 'text-neu-accent shadow-neu-sunken bg-neu-base'
                : 'text-neu-text-secondary hover:text-neu-text-primary hover:shadow-neu-flat',
            )}
          >
            {link.label}
            {active && (
              <span
                className={cn(
                  'absolute bg-accent-gradient rounded-full',
                  mobile
                    ? 'left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full'
                    : '-bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-8',
                )}
              />
            )}
          </a>
        </li>
      );
    });

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-400',
        scrolled
          ? 'bg-neu-base/90 backdrop-blur-xl shadow-neu-flat border-b border-neu-shadow-dark/10'
          : 'bg-neu-base/70 backdrop-blur-md',
      )}
    >
      <div className="section-container h-full flex items-center justify-between">
        <a
          href="#home"
          onClick={handleNavClick}
          className="font-display font-extrabold text-xl tracking-tight bg-accent-gradient bg-clip-text text-transparent"
        >
          Portfolio
        </a>

        <ul className="hidden md:flex items-center gap-1 bg-neu-base rounded-neu-sm shadow-neu-sunken p-1">
          {renderLinks(handleNavClick)}
        </ul>

        <button
          type="button"
          aria-label="Navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden relative inline-flex items-center justify-center w-11 h-11 -mr-2 text-neu-text-primary shadow-neu-flat rounded-neu-sm overflow-hidden"
        >
          <span className="relative z-10">
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <m.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </m.span>
              ) : (
                <m.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </m.span>
              )}
            </AnimatePresence>
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <m.div
              className="fixed inset-0 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />
            <m.div
              className="md:hidden relative z-50 mx-4 bg-neu-base shadow-neu-raised-lg rounded-b-neu-xl border border-neu-shadow-dark/10"
              initial={{ opacity: 0, y: -12, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -12, scaleY: 0.95 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'top' }}
            >
              <ul className="flex flex-col py-2">
                {renderLinks(handleNavClick, true)}
              </ul>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}