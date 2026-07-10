import { Mail, ArrowUp } from 'lucide-react';
import NeuButton from '@/components/ui/NeuButton';
import {
  GithubIcon,
  LinkedinIcon,
  TiktokIcon,
  InstagramIcon,
  WhatsappIcon,
} from '@/assets/icons/SocialIcons';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { icon: GithubIcon, href: 'https://github.com/j0nsss', label: 'GitHub' },
  {
    icon: LinkedinIcon,
    href: 'https://www.linkedin.com/in/junadhan-alzam-0789113a7/',
    label: 'LinkedIn',
  },
  { icon: TiktokIcon, href: 'https://www.tiktok.com/@jonad___', label: 'TikTok' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/j0_nadd', label: 'Instagram' },
  {
    icon: WhatsappIcon,
    href: 'https://api.whatsapp.com/send?phone=6285704358406&text=Hi%20',
    label: 'WhatsApp',
  },
  { icon: Mail, href: 'mailto:jonadalzam@gmail.com', label: 'Email' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-neu-base border-t border-neu-shadow-dark/10 relative overflow-hidden">
      <span
        className="absolute -top-40 left-1/2 w-96 h-96 rounded-full bg-neu-accent/3 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-display font-extrabold text-2xl tracking-tight bg-accent-gradient bg-clip-text text-transparent">
              Portfolio
            </p>
            <p className="font-mono text-xs text-neu-accent mt-1.5">
              {'//'} Full Stack Engineer
            </p>
            <p className="text-neu-text-secondary text-sm mt-4 leading-relaxed max-w-xs">
              Building things that actually work — from backend APIs to polished UIs.
            </p>
            <p className="text-neu-text-secondary/40 text-xs mt-8">
              &copy; {year} All rights reserved.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-6">
            <p className="font-mono text-xs text-neu-accent uppercase tracking-[0.15em] mb-4">
              Navigation
            </p>
            <nav aria-label="Footer" className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-neu-text-secondary hover:text-neu-accent text-sm transition-colors w-fit relative group"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent-gradient transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-xs text-neu-accent uppercase tracking-[0.15em] mb-4">
              Connect
            </p>
            <div className="flex gap-2 flex-wrap">
              {SOCIAL_LINKS.map((s) => (
                <NeuButton
                  key={s.label}
                  variant="ghost"
                  size="sm"
                  href={s.href}
                  ariaLabel={s.label}
                  icon={<s.icon />}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-neu-shadow-dark/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neu-text-secondary/30 text-xs font-mono">
            {'<'} built with React, TypeScript &amp; Tailwind CSS {'/>'}
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-neu-sm bg-neu-base shadow-neu-flat hover:shadow-neu-raised text-neu-text-secondary hover:text-neu-accent text-xs transition-all duration-300"
            aria-label="Scroll to top"
          >
            <span className="font-mono">top</span>
            <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}