import { m } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import NeuCard from '@/components/ui/NeuCard';
import NeuButton from '@/components/ui/NeuButton';
import SkillBadge from '@/components/ui/SkillBadge';
import type { Project } from '@/types';
import { cn } from '@/utils/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { GithubIcon } from '@/assets/icons/SocialIcons';

interface ProjectCardProps {
  project: Project;
  reversed?: boolean;
}

export default function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  const reduced = useReducedMotion();

  return (
    <m.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <NeuCard className="overflow-hidden p-5 lg:p-8 rounded-neu-lg shadow-neu-raised-lg group">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <m.div
            className={cn('relative', reversed && 'lg:order-2')}
            initial={reduced ? false : { opacity: 0, x: reversed ? 30 : -30 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="shadow-neu-sunken rounded-neu overflow-hidden">
              <img
                src={project.thumbnailSrc}
                alt={project.thumbnailAlt}
                loading="lazy"
                className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <span className="absolute bottom-3 left-3 bg-accent-gradient/90 backdrop-blur-sm text-white text-[11px] font-mono px-2.5 py-1 rounded-full shadow-neu-flat">
              ● live
            </span>
          </m.div>

          <m.div
            className={cn('space-y-4', reversed && 'lg:order-1')}
            initial={reduced ? false : { opacity: 0, x: reversed ? -30 : 30 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-neu-accent font-mono text-[11px] uppercase tracking-[0.15em]">
                {project.year}
              </span>
              <span className="w-1 h-1 rounded-full bg-neu-shadow-dark" />
              <span className="text-neu-text-secondary font-mono text-[11px] uppercase tracking-[0.15em]">
                Featured
              </span>
            </div>

            <h3 className="text-display-md font-display font-bold text-neu-text-primary">
              {project.title}
            </h3>
            <p className="text-neu-text-secondary text-sm leading-relaxed">
              {project.tagline}
            </p>

            <div className="border-t border-neu-shadow-dark/20 pt-4 space-y-3">
              <div>
                <p className="text-neu-accent font-mono text-xs">The Challenge</p>
                <p className="text-neu-text-secondary text-sm mt-1 leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div>
                <p className="text-neu-accent font-mono text-xs">How It Was Built</p>
                <p className="text-neu-text-secondary text-sm mt-1 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            <div className="border-t border-neu-shadow-dark/20 pt-4">
              <p className="text-neu-accent font-mono text-xs mb-2">Highlights</p>
              <ul className="space-y-1.5">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-2 items-start text-neu-text-secondary text-sm"
                  >
                    <CheckCircle2 size={15} className="text-neu-accent shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-neu-shadow-dark/20 pt-4">
              <p className="text-neu-accent font-mono text-xs mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <SkillBadge key={t} name={t} size="sm" />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {project.liveUrl && (
                <NeuButton
                  href={project.liveUrl}
                  variant="primary"
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  Live Demo
                </NeuButton>
              )}
              <NeuButton href={project.githubUrl} variant="ghost" icon={<GithubIcon />}>
                GitHub
              </NeuButton>
            </div>
          </m.div>
        </div>
      </NeuCard>
    </m.div>
  );
}