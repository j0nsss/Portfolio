import { m } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import NeuCard from '@/components/ui/NeuCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const stats = [
  { icon: '🎓', title: 'CS Student', detail: 'State University of [City]', sub: 'Expected 2027' },
  {
    icon: '💼',
    title: 'Freelancer Since 2025',
    detail: '10+ projects delivered',
    sub: '100% client satisfaction',
  },
  { icon: '📍', title: 'Location', detail: 'Your City, Country', sub: 'Open to Remote' },
];

export default function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="section-container section-padding scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
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
        </div>

        <div className="space-y-6">
          {stats.map((s, i) => (
            <m.div
              key={s.title}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <NeuCard className="relative overflow-hidden p-5 pl-6">
                <span className="absolute left-0 top-0 h-full w-1 bg-accent-gradient rounded-l-neu" />
                <div className="flex items-start gap-4">
                  <span className="text-2xl" aria-hidden="true">
                    {s.icon}
                  </span>
                  <div>
                    <p className="font-display font-bold text-neu-text-primary">{s.title}</p>
                    <p className="text-neu-text-secondary text-sm mt-1">{s.detail}</p>
                    <p className="text-neu-accent text-sm mt-0.5">{s.sub}</p>
                  </div>
                </div>
              </NeuCard>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
