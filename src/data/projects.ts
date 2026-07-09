import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    tagline: 'A full-stack storefront with seamless checkout.',
    description:
      'A complete e-commerce experience with product catalog, cart, and secure payments.',
    challenge: 'What pain point or problem was being solved?',
    solution: 'How the architecture and tech choices addressed it.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    highlights: [
      'Reduced load time by X% with optimized queries',
      'Implemented feature Y that increased engagement',
      'Deployed on Z with CI/CD pipeline',
    ],
    liveUrl: 'https://your-live-demo-url.com',
    githubUrl: 'https://github.com/yourusername/repo',
    thumbnailSrc: '/src/assets/images/project-1-thumb.webp',
    thumbnailAlt: 'Screenshot of E-Commerce Platform',
    isFeatured: true,
    year: '2025',
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    tagline: 'Real-time collaboration for distributed teams.',
    description:
      'A real-time task board that keeps distributed teams in sync with live updates.',
    challenge: 'What pain point or problem was being solved?',
    solution: 'How the architecture and tech choices addressed it.',
    techStack: ['Next.js', 'MongoDB', 'Express', 'Socket.io'],
    highlights: [
      'Built a real-time feature using WebSockets',
      'Achieved 95+ Lighthouse score across all metrics',
      'Scaled to handle X concurrent users',
    ],
    liveUrl: 'https://your-live-demo-url.com',
    githubUrl: 'https://github.com/yourusername/repo-2',
    thumbnailSrc: '/src/assets/images/project-2-thumb.webp',
    thumbnailAlt: 'Screenshot of Task Management App',
    isFeatured: true,
    year: '2025',
  },
];
