import { m, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowRight, Download, Mail, ChevronDown, Quote } from 'lucide-react';
import NeuButton from '@/components/ui/NeuButton';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { GithubIcon, LinkedinIcon, TiktokIcon, InstagramIcon, WhatsappIcon } from '@/assets/icons/SocialIcons';
import { cn } from '@/utils/cn';
import { useRef } from 'react';

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

const avatarItem: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <m.section ref={sectionRef} className="relative overflow-hidden min-h-[90vh] flex items-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(79,124,172,0.07) 0%, transparent 70%)',
        }}
      />

      {!reduced && (
        <>
          <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-neu-base shadow-neu-raised-lg opacity-20 pointer-events-none animate-rotate-slow" />
          <div className="absolute -bottom-20 -right-10 w-56 h-56 rounded-neu-xl bg-neu-base shadow-neu-raised-lg opacity-20 pointer-events-none animate-rotate-slow" style={{ animationDirection: 'reverse' as unknown as string & {} }} />
          <div className="absolute top-1/3 -right-8 w-32 h-32 rounded-full bg-neu-base shadow-neu-raised-lg opacity-15 pointer-events-none animate-rotate-slow" />
        </>
      )}

      <m.div className="w-full" style={reduced ? undefined : { opacity, y }}>
        <div className="section-container section-padding">
          <m.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            variants={container}
            initial={reduced ? false : 'hidden'}
            animate="show"
          >
            <div className="lg:col-span-7 space-y-6">
              <m.div variants={item} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-neu-sm bg-neu-base shadow-neu-flat">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-neu-text-secondary font-mono text-xs uppercase tracking-wider">
                  Active &middot; Ready to build
                </span>
              </m.div>

              <m.p
                variants={item}
                className="text-neu-accent font-mono text-sm uppercase tracking-widest"
              >
                Full Stack Engineer &amp; CS Student
              </m.p>

              <m.div variants={item} className="w-16 h-1 rounded-full bg-accent-gradient" />

              <m.h1
                variants={item}
                className="text-display-xl font-display font-bold tracking-tight"
              >
                Building things
                <br />
                <span className="text-gradient">that actually work.</span>
              </m.h1>

              <m.p variants={item} className="text-neu-text-secondary text-lg max-w-xl">
                I craft fast, reliable web apps — from backend APIs to polished UIs.
              </m.p>

              <m.div variants={item} className="flex flex-wrap gap-4">
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
              </m.div>

              <m.div variants={item} className="flex gap-3 pt-2 flex-wrap">
                <NeuButton
                  variant="ghost"
                  size="sm"
                  href="https://github.com/j0nsss"
                  ariaLabel="GitHub"
                  icon={<GithubIcon />}
                />
                <NeuButton variant="ghost" size="sm" href="https://www.linkedin.com/in/junadhan-alzam-0789113a7/" ariaLabel="LinkedIn" icon={<LinkedinIcon />} />
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
              </m.div>
            </div>

            <m.div
              variants={avatarItem}
              className={cn('lg:col-span-5 flex justify-center lg:justify-end', !reduced && 'animate-float')}
            >
              <div className="relative w-72">
                <div className="absolute -inset-4 rounded-neu-xl animate-glow-pulse" />
                <div className="relative bg-neu-base shadow-neu-raised-lg rounded-neu-xl p-5 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full p-1 bg-neu-base shadow-neu-sunken mb-3">
                    <div className="w-full h-full rounded-full bg-neu-base overflow-hidden">
                      <img
                        src="/hero.png"
                        alt="Junadhan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-display font-bold text-neu-text-primary">Junadhan Alzam T.P</p>
                    <p className="text-neu-accent font-mono text-xs mt-0.5">Full Stack Engineer</p>
                  </div>
                  <div className="border-t border-neu-shadow-dark/20 my-3" />
                  <div className="flex items-start gap-2 text-left">
                    <Quote size={14} className="text-neu-accent shrink-0 mt-0.5" />
                    <p className="text-neu-text-secondary text-xs leading-relaxed">
                      Building fast, reliable web apps with clean architecture and thoughtful UX.
                    </p>
                  </div>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </m.div>

      <m.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-neu-text-secondary/50 hover:text-neu-accent transition-colors"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </m.a>
    </m.section>
  );
}