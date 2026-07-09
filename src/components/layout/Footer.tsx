import { Mail } from 'lucide-react';
import NeuButton from '@/components/ui/NeuButton';
import { GithubIcon, LinkedinIcon } from '@/assets/icons/SocialIcons';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-neu-base border-t border-neu-shadow-dark/20">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-display font-bold text-neu-text-primary text-lg">Your Name</p>
            <p className="text-neu-text-secondary text-sm mt-2">Full Stack Engineer &amp; CS Student</p>
            <p className="text-neu-text-secondary text-xs mt-4">&copy; {year} All rights reserved.</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-neu-text-secondary hover:text-neu-accent text-sm w-fit"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex md:justify-end gap-3">
            <NeuButton
              variant="ghost"
              size="sm"
              href="https://github.com"
              ariaLabel="GitHub"
              icon={<GithubIcon />}
            />
            <NeuButton variant="ghost" size="sm" href="#" ariaLabel="LinkedIn" icon={<LinkedinIcon />} />
            <NeuButton
              variant="ghost"
              size="sm"
              href="mailto:hello@yourportfolio.dev"
              ariaLabel="Email"
              icon={<Mail size={18} />}
            />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neu-shadow-dark/20 text-center text-neu-text-secondary text-xs">
          Built with React, TypeScript &amp; Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
