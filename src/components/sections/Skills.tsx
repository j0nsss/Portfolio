import { m } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import NeuCard from '@/components/ui/NeuCard';
import SkillBadge from '@/components/ui/SkillBadge';
import { skills } from '@/data/skills';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const GROUPS = [
  { label: 'Languages', categories: ['Languages'] },
  { label: 'Frontend', categories: ['Frontend'] },
  { label: 'Backend', categories: ['Backend'] },
  { label: 'Tools & DevOps', categories: ['Tools', 'DevOps'] },
];

export default function Skills() {
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="section-container section-padding scroll-mt-20">
      <SectionHeading
        eyebrow="What I do"
        title="Skills & Tooling"
        subtitle="A practical, modern stack for building fast and reliable web applications end to end."
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {GROUPS.map((group, i) => {
          const items = skills.filter((s) => group.categories.includes(s.category));
          return (
            <m.div
              key={group.label}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <NeuCard className="p-6">
                <p className="text-neu-text-secondary font-mono text-xs uppercase tracking-wider mb-4">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-3">
                  {items.map((s) => (
                    <SkillBadge key={s.name} name={s.name} />
                  ))}
                </div>
              </NeuCard>
            </m.div>
          );
        })}
      </div>
    </section>
  );
}
