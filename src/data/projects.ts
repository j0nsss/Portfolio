import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Personal Finance Tracker',
    tagline: 'A full-stack application for managing personal finances.',
    description:
      'A complete personal finance management solution with budgeting, expense tracking, and reporting.',
    challenge: 'What pain point or problem was being solved?',
    solution: 'How the architecture and tech choices addressed it.',
    techStack: ['React', 'Node.js', 'Supabase', 'Typescript', 'Tailwind CSS'],
    highlights: [
      'Reduced load time by X% with optimized queries',
      'Implemented feature Y that increased engagement',
      'Deployed on Vercel with CI/CD pipeline for seamless updates',
    ],
    liveUrl: 'https://neofin-pearl.vercel.app/',
    githubUrl: 'https://github.com/j0nsss/Persolnal-Finance-Tracker',
    thumbnailSrc: '/src/assets/NeoFin.png',
    thumbnailAlt: 'Screenshot of Personal Finance Tracker',
    isFeatured: true,
    year: '2026',
  },
  
];
