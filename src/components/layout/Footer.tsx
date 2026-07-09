import { Mail, ChevronUp } from 'lucide-react';
import NeuButton from '@/components/ui/NeuButton';
import { GithubIcon, LinkedinIcon, TiktokIcon, InstagramIcon, WhatsappIcon } from '@/assets/icons/SocialIcons';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-neu-base border-t border-neu-shadow-dark/10">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <p className="font-display font-extrabold text-xl tracking-tight bg-accent-gradient bg-clip-text text-transparent">
              Portfolio
            </p>
            <p className="font-mono text-xs text-neu-accent mt-1">
              {'//'} Full Stack Engineer
            </p>
            <p className="text-neu-text-secondary text-sm mt-3 leading-relaxed max-w-xs">
              Building things that actually work — from backend APIs to polished UIs.
            </p>
            <p className="text-neu-text-secondary/50 text-xs mt-6">
              &copy; {year} All rights reserved.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-xs text-neu-accent uppercase tracking-[0.15em] mb-3">
              Navigation
            </p>
            <nav aria-label="Footer" className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-neu-text-secondary hover:text-neu-accent text-sm transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-2 md:text-right">
            <p className="font-mono text-xs text-neu-accent uppercase tracking-[0.15em] mb-3">
              Connect
            </p>
            <div className="flex md:justify-end gap-2 flex-wrap">
              <NeuButton
                variant="ghost"
                size="sm"
                href="https://github.com/j0nsss"
                ariaLabel="GitHub"
                icon={<GithubIcon />}
              />
              <NeuButton
                variant="ghost"
                size="sm"
                href="https://www.linkedin.com/in/junadhan-alzam-0789113a7/"
                ariaLabel="LinkedIn"
                icon={<LinkedinIcon />}
              />
              <NeuButton
                variant="ghost"
                size="sm"
                href="mailto:jonadalzam@gmail.com"
                ariaLabel="Email"
                icon={<Mail size={18} />}
              />
              <NeuButton
                variant="ghost"
                size="sm"
                href="https://www.tiktok.com/@jonad___"
                ariaLabel="TikTok"
                icon={<TiktokIcon />}
              />
              <NeuButton
                variant="ghost"
                size="sm"
                href="https://www.instagram.com/j0_nadd"
                ariaLabel="Instagram"
                icon={<InstagramIcon />}
              />
              <NeuButton
                variant="ghost"
                size="sm"
                href="https://api.whatsapp.com/send?phone=6285704358406&text=Hi%20"
                ariaLabel="WhatsApp"
                icon={<WhatsappIcon />}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neu-shadow-dark/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neu-text-secondary/40 text-xs">
            Built with React, TypeScript &amp; Tailwind CSS
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neu-text-secondary hover:text-neu-accent text-xs transition-colors"
            aria-label="Scroll to top"
          >
            <span className="font-mono">top</span>
            <ChevronUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}