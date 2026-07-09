export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  techStack: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  isFeatured: boolean;
  year: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Tools' | 'Languages';
  icon?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
