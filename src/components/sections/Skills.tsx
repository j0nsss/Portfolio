import SectionHeading from '@/components/ui/SectionHeading';
import NeuCard from '@/components/ui/NeuCard';
import SkillBadge from '@/components/ui/SkillBadge';
import { skills } from '@/data/skills';
import { Reveal } from '@/hooks/useScrollReveal';

const GROUPS = [
  { label: 'Languages', categories: ['Languages'] },
  { label: 'Frontend', categories: ['Frontend'] },
  { label: 'Backend', categories: ['Backend'] },
  { label: 'Tools & DevOps', categories: ['Tools', 'DevOps'] },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-container section-padding scroll-mt-20 relative overflow-hidden"
    >
      <span
        className="absolute top-20 right-10 w-64 h-64 rounded-full border border-neu-shadow-dark/10 pointer-events-none"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-20 left-10 w-48 h-48 rounded-full border border-neu-shadow-dark/10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="What I do"
            title="Skills & Tooling"
            subtitle="A practical, modern stack for building fast and reliable web applications end to end."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {GROUPS.map((group, i) => {
            const items = skills.filter((s) => group.categories.includes(s.category));
            return (
              <Reveal key={group.label} delay={i * 0.1}>
                <NeuCard className="p-6 group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px flex-1 bg-neu-shadow-dark/20" />
                    <p className="text-neu-accent font-mono text-xs uppercase tracking-[0.15em]">
                      {group.label}
                    </p>
                    <span className="h-px flex-1 bg-neu-shadow-dark/20" />
                  </div>
                  <div className="flex flex-wrap gap-2.5 justify-center">
                    {items.map((s) => (
                      <SkillBadge key={s.name} name={s.name} />
                    ))}
                  </div>
                </NeuCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}