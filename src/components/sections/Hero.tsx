import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import NeuButton from '@/components/ui/NeuButton';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { GithubIcon, LinkedinIcon } from '@/assets/icons/SocialIcons';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(79,124,172,0.07) 0%, transparent 70%)',
        }}
      />
      <div className="section-container section-padding relative">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          variants={container}
          initial={reduced ? false : 'hidden'}
          animate="show"
        >
          <div className="lg:col-span-7 space-y-6">
            <motion.p
              variants={item}
              className="text-neu-accent font-mono text-sm uppercase tracking-widest"
            >
              Full Stack Engineer &amp; CS Student
            </motion.p>

            <motion.h1 variants={item} className="text-display-xl font-display font-bold">
              Building things
              <br />
              <span className="text-gradient">that actually work.</span>
            </motion.h1>

            <motion.p variants={item} className="text-neu-text-secondary text-lg max-w-xl">
              I craft fast, reliable web apps — from backend APIs to polished UIs.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <NeuButton
                href="#projects"
                variant="primary"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                View My Work
              </NeuButton>
              <NeuButton href="#" variant="ghost" icon={<Download size={18} />}>
                Download CV
              </NeuButton>
            </motion.div>

            <motion.div variants={item} className="flex gap-3 pt-2">
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
            </motion.div>
          </div>

          <motion.div variants={item} className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              <span className="absolute inset-0 rounded-full border-4 border-neu-accent-light animate-ping" />
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2 bg-neu-base shadow-neu-raised-lg">
                <div className="w-full h-full rounded-full bg-accent-gradient flex items-center justify-center text-white text-5xl font-bold font-display">
                  YN
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
