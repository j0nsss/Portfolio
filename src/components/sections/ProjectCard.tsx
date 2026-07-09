import { motion } from 'framer-motion';
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
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <NeuCard className="overflow-hidden p-5 lg:p-8 rounded-neu-lg shadow-neu-raised-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className={cn('relative', reversed && 'lg:order-2')}>
            <div className="shadow-neu-sunken rounded-neu overflow-hidden">
              <img
                src={project.thumbnailSrc}
                alt={project.thumbnailAlt}
                loading="lazy"
                className="w-full h-64 lg:h-80 object-cover"
              />
            </div>
            <span className="absolute bottom-3 left-3 bg-accent-gradient text-white text-xs px-2 py-1 rounded-full">
              Live Demo
            </span>
          </div>

          <div className={cn(reversed && 'lg:order-1')}>
            <p className="text-neu-accent font-mono text-xs uppercase tracking-wider">
              {project.year} · Featured
            </p>
            <h3 className="text-display-md font-display font-bold text-neu-text-primary mt-2">
              {project.title}
            </h3>
            <p className="text-neu-text-secondary mt-2">{project.tagline}</p>

            <div className="border-t border-neu-shadow-dark/30 my-4" />
            <p className="text-neu-text-primary font-medium text-sm">The Challenge</p>
            <p className="text-neu-text-secondary text-sm mt-1">{project.challenge}</p>

            <div className="border-t border-neu-shadow-dark/30 my-4" />
            <p className="text-neu-text-primary font-medium text-sm">How It Was Built</p>
            <p className="text-neu-text-secondary text-sm mt-1">{project.solution}</p>

            <div className="border-t border-neu-shadow-dark/30 my-4" />
            <p className="text-neu-text-primary font-medium text-sm">Highlights</p>
            <ul className="mt-2 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2 items-start text-neu-text-secondary text-sm">
                  <CheckCircle2 size={18} className="text-neu-accent shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-neu-shadow-dark/30 my-4" />
            <p className="text-neu-text-primary font-medium text-sm">Tech Stack</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.techStack.map((t) => (
                <SkillBadge key={t} name={t} size="sm" />
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              {project.liveUrl && (
                <NeuButton
                  href={project.liveUrl}
                  variant="primary"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  Live Demo
                </NeuButton>
              )}
              <NeuButton href={project.githubUrl} variant="ghost" icon={<GithubIcon />}>
                GitHub
              </NeuButton>
            </div>
          </div>
        </div>
      </NeuCard>
    </motion.div>
  );
}
