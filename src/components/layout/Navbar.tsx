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
                ? 'block py-3 px-4 rounded-neu-sm'
                : 'px-4 py-2 rounded-neu-sm',
              active
                ? 'text-neu-accent shadow-neu-sunken'
                : 'text-neu-text-secondary hover:text-neu-text-primary hover:shadow-neu-flat',
            )}
          >
            {link.label}
            {active && !mobile && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-accent-gradient" />
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
          className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-neu-text-primary shadow-neu-flat rounded-neu-sm"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mx-4 mb-2 bg-neu-base shadow-neu-raised-lg rounded-b-neu-xl border border-neu-shadow-dark/10 overflow-hidden">
          <ul className="flex flex-col divide-y divide-neu-shadow-dark/10">
            {renderLinks(handleNavClick, true)}
          </ul>
        </div>
      )}
    </nav>
  );
}