import { m, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import NeuCard from '@/components/ui/NeuCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Reveal } from '@/hooks/useScrollReveal';
import { useRef } from 'react';

const stats = [
  {
    icon: '🎓',
    title: 'CS Student',
    detail: 'State University of [City]',
    sub: 'Expected 2027',
  },
  {
    icon: '💼',
    title: 'Freelancer Since 2025',
    detail: '10+ projects delivered',
    sub: '100% client satisfaction',
  },
  {
    icon: '📍',
    title: 'Location',
    detail: 'Your City, Country',
    sub: 'Open to Remote',
  },
];

export default function About() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-container section-padding scroll-mt-20 relative overflow-hidden"
    >
      <span
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-neu-accent/3 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <span
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-neu-accent/3 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        <m.div className="lg:col-span-7" style={reduced ? undefined : { y }}>
          <SectionHeading
            eyebrow="Who I am"
            title="A developer who thinks before typing."
            subtitle="I'm an undergraduate Computer Science student with a passion for building real, useful products — not just prototypes. I care about clean architecture, thoughtful UX, and shipping things that actually help people."
          />
          <div className="mt-6 space-y-4 text-neu-text-secondary leading-relaxed">
            <p>
              My journey started with curiosity about how software works under the hood, and it
              quickly grew into a love for full-stack development. I enjoy the whole stack — from
              designing APIs to crafting interfaces people enjoy using.
            </p>
            <p>
              Since starting freelance work in 2025, I've partnered with clients to ship reliable
              web applications, always focusing on maintainability and a polished end result.
            </p>
            <p>
              I'm currently available for new freelance projects and collaborations — let's build
              something great together.
            </p>
          </div>
        </m.div>

        <div className="lg:col-span-5 space-y-5">
          {stats.map((s, i) => (
            <Reveal key={s.title} variant="fadeRight" delay={i * 0.12}>
              <NeuCard className="relative overflow-hidden p-5 pl-6 group">
                <span className="absolute left-0 top-0 h-full w-[3px] bg-accent-gradient rounded-l-neu" />
                <span className="absolute left-0 top-0 h-full w-[3px] bg-neu-accent/10 rounded-l-neu blur-sm scale-y-0 group-hover:scale-y-110 transition-transform duration-500 origin-top" />
                <div className="flex items-start gap-4">
                  <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">
                    {s.icon}
                  </span>
                  <div>
                    <p className="font-display font-bold text-neu-text-primary text-lg">
                      {s.title}
                    </p>
                    <p className="text-neu-text-secondary text-sm mt-0.5">{s.detail}</p>
                    <p className="text-neu-accent text-xs mt-1 font-mono">{s.sub}</p>
                  </div>
                </div>
              </NeuCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}