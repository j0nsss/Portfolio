import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/sections/ProjectCard';
import { projects } from '@/data/projects';
import { Reveal } from '@/hooks/useScrollReveal';

export default function Projects() {
  return (
    <section id="projects" className="section-container section-padding scroll-mt-20">
      <Reveal>
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects I've Built"
          subtitle="A case study that shows how I approach real-world problems."
        />
      </Reveal>

      <div className="mt-10 space-y-12 lg:space-y-20">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}