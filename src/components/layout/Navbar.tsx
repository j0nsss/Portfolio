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

  const renderLinks = (onClick: () => void) =>
    NAV_LINKS.map((link) => {
      const id = link.href.slice(1);
      const active = activeId === id;
      return (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={onClick}
            className={cn(
              'relative font-medium text-sm transition-colors',
              active
                ? 'text-neu-accent'
                : 'text-neu-text-secondary hover:text-neu-text-primary',
            )}
          >
            {link.label}
            {active && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neu-accent" />
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
        'fixed top-0 left-0 right-0 z-50 h-16 bg-neu-base/80 backdrop-blur-md border-b border-neu-shadow-dark/20 transition-shadow duration-400',
        scrolled && 'shadow-neu-flat',
      )}
    >
      <div className="section-container h-full flex items-center justify-between">
        <a
          href="#home"
          onClick={handleNavClick}
          className="font-display font-bold text-neu-text-primary text-lg"
        >
          Your Name
        </a>

        <ul className="hidden md:flex items-center gap-8">{renderLinks(handleNavClick)}</ul>

        <button
          type="button"
          aria-label="Navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-neu-text-primary"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-neu-base shadow-neu-raised-lg rounded-b-neu-lg px-4 py-2">
          <ul className="flex flex-col">{renderLinks(handleNavClick)}</ul>
        </div>
      )}
    </nav>
  );
}
