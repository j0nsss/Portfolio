import { Mail } from 'lucide-react';
import NeuButton from '@/components/ui/NeuButton';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

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
