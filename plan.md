# Portfolio Website — Master Build Plan for OpenCode

> **Agent Instructions:** Follow this document sequentially, phase by phase. Never skip a phase. Each phase builds on the previous one. Treat every code block, token value, and file path as authoritative. Where a decision isn't specified, default to the design system defined in Phase 2.

---

## Table of Contents

1. [Project Overview & Goals](#1-project-overview--goals)
2. [Project Setup & Architecture](#2-project-setup--architecture)
3. [Design System & Neumorphic Tokens](#3-design-system--neumorphic-tokens)
4. [Component Specifications](#4-component-specifications)
5. [Phase-by-Phase Execution Plan](#5-phase-by-phase-execution-plan)
6. [Content Placeholders](#6-content-placeholders)
7. [Quality Checklist](#7-quality-checklist)

---

## 1. Project Overview & Goals

### 1.1 Owner Profile
| Field | Value |
|---|---|
| Role | Full Stack Engineer & Undergraduate Computer Science Student |
| Status | Active freelancer since early 2025 |
| Portfolio Goal | Showcase 2 high-quality projects, communicate tech depth, attract freelance clients |
| Tone | Professional, modern, approachable — confident but not arrogant |

### 1.2 Core Technical Requirements
| Concern | Choice | Reason |
|---|---|---|
| Framework | React 18 + TypeScript | Type safety, component model, ecosystem |
| Build Tool | Vite 5 | Instant HMR, fast cold starts |
| Styling | Tailwind CSS v3 | Utility-first, pairs perfectly with custom design tokens |
| Icons | Lucide React | Consistent stroke-based icon set, tree-shakeable |
| Routing | React Router v6 (hash mode) | SPA with smooth anchor-scroll behavior |
| Form Handling | React Hook Form | Lightweight, no re-render penalty |
| Animations | Framer Motion | Scroll-triggered reveals, micro-interactions |
| Linting | ESLint + Prettier | Clean, consistent code for agent output |

### 1.3 Design Philosophy
- **Style:** Neumorphism (Soft UI) — the UI appears to be extruded from or pressed into the background surface.
- **Mood:** Calm, focused, modern. A developer's desk lit by soft daylight.
- **Signature Element:** Every interactive card uses a dual-shadow raised state that depresses (flips to inset shadow) on hover/focus — communicating depth and physicality.
- **Do NOT:** Use harsh borders, pure-black text on white, garish accent colors, or heavy drop shadows. Keep contrast compliant (WCAG AA minimum).

---

## 2. Project Setup & Architecture

### 2.1 Scaffold Command Sequence

The agent must run these commands in order inside the project root:

```bash
# 1. Create the Vite + React + TypeScript project
npm create vite@latest portfolio -- --template react-ts

# 2. Enter the directory
cd portfolio

# 3. Install dependencies
npm install

# 4. Install Tailwind CSS and its Vite plugin
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 5. Install runtime dependencies
npm install react-router-dom framer-motion lucide-react react-hook-form

# 6. Install dev utilities
npm install -D @types/node prettier eslint-config-prettier
```

### 2.2 Canonical Folder Structure

Create this exact directory tree inside `src/`:

```
portfolio/
├── public/
│   ├── favicon.ico
│   └── og-image.png                  # Open Graph placeholder (800×420)
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── avatar.webp            # Developer photo (placeholder: 400×400)
│   │   │   ├── project-1-thumb.webp   # Project 1 screenshot
│   │   │   └── project-2-thumb.webp   # Project 2 screenshot
│   │   └── icons/                     # Any custom SVG icons
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── ui/                        # Reusable Neumorphic primitives
│   │   │   ├── NeuCard.tsx            # Raised card wrapper
│   │   │   ├── NeuButton.tsx          # Neumorphic CTA button
│   │   │   ├── NeuInput.tsx           # Neumorphic form input
│   │   │   ├── NeuTextarea.tsx        # Neumorphic textarea
│   │   │   ├── SkillBadge.tsx         # Tech stack pill/badge
│   │   │   └── SectionHeading.tsx     # Consistent section title block
│   │   │
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Skills.tsx
│   │       ├── Projects.tsx
│   │       ├── ProjectCard.tsx
│   │       └── Contact.tsx
│   │
│   ├── data/
│   │   ├── projects.ts                # Project data objects
│   │   └── skills.ts                  # Skills/stack arrays
│   │
│   ├── hooks/
│   │   ├── useScrollSpy.ts            # Active nav link detection
│   │   └── useReducedMotion.ts        # Respects prefers-reduced-motion
│   │
│   ├── types/
│   │   └── index.ts                   # Shared TypeScript interfaces
│   │
│   ├── utils/
│   │   └── cn.ts                      # clsx/twMerge className utility
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                      # Tailwind directives + global resets
│
├── tailwind.config.js                 # Design tokens live here
├── tsconfig.json
├── vite.config.ts
├── postcss.config.js
├── .eslintrc.cjs
├── .prettierrc
└── plan.md                            # This file
```

### 2.3 Configuration Files

#### `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

#### `tsconfig.json` (add path alias)
Ensure `compilerOptions` contains:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### `.prettierrc`
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 100
}
```

#### `src/utils/cn.ts`
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Install: npm install clsx tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
> **Agent note:** Run `npm install clsx tailwind-merge` if not already installed.

---

## 3. Design System & Neumorphic Tokens

### 3.1 Color Palette

The entire UI is built on a single soft-gray base. All colors below are design tokens.

| Token Name | Hex Value | Usage |
|---|---|---|
| `neu-base` | `#e0e5ec` | Page background, card surface |
| `neu-shadow-dark` | `#a3b1c6` | Dark half of neumorphic shadow |
| `neu-shadow-light` | `#ffffff` | Light half of neumorphic shadow |
| `neu-text-primary` | `#2d3a4a` | Headings, primary body copy |
| `neu-text-secondary` | `#6b7a90` | Subtitles, captions, muted copy |
| `neu-accent` | `#4f7cac` | CTAs, links, active states, accents |
| `neu-accent-light` | `#d0e4f7` | Accent tint backgrounds |
| `neu-accent-dark` | `#2e5c8a` | Hover state for accent |
| `neu-success` | `#4caf8a` | Form success feedback |
| `neu-error` | `#e07070` | Form error feedback |

### 3.2 `tailwind.config.js` — Full Configuration

Replace the default config with this exact content:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // ─── Color Palette ───────────────────────────────────────────────
      colors: {
        neu: {
          base:          '#e0e5ec',
          'shadow-dark': '#a3b1c6',
          'shadow-light':'#ffffff',
          'text-primary':'#2d3a4a',
          'text-secondary': '#6b7a90',
          accent:        '#4f7cac',
          'accent-light':'#d0e4f7',
          'accent-dark': '#2e5c8a',
          success:       '#4caf8a',
          error:         '#e07070',
        },
      },

      // ─── Typography ───────────────────────────────────────────────────
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 4rem)',   { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)',     { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)',{ lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },

      // ─── Neumorphic Box Shadows ───────────────────────────────────────
      //
      // NAMING CONVENTION:
      //   neu-raised   → element appears to pop OUT of the surface
      //   neu-sunken   → element appears pressed INTO the surface
      //   neu-flat     → subtle definition without strong depth
      //   neu-pressed  → active/click state (deep sunken)
      //
      boxShadow: {
        // Standard raised card (default resting state)
        'neu-raised':
          '6px 6px 14px #a3b1c6, -6px -6px 14px #ffffff',

        // Large raised for hero/section containers
        'neu-raised-lg':
          '10px 10px 20px #a3b1c6, -10px -10px 20px #ffffff',

        // Sunken element — input fields, inset panels
        'neu-sunken':
          'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff',

        // Deep sunken — active button press state
        'neu-pressed':
          'inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff',

        // Flat subtle — for non-interactive elements needing definition
        'neu-flat':
          '2px 2px 6px #a3b1c6, -2px -2px 6px #ffffff',

        // Accent raised — highlighted card with accent tint
        'neu-accent':
          '6px 6px 14px #a3b1c6, -6px -6px 14px #ffffff, inset 0 0 0 1px rgba(79, 124, 172, 0.2)',

        // Hover transition state — slightly larger lift
        'neu-hover':
          '8px 8px 18px #a3b1c6, -8px -8px 18px #ffffff',
      },

      // ─── Border Radius ────────────────────────────────────────────────
      borderRadius: {
        'neu':    '16px',
        'neu-sm': '10px',
        'neu-lg': '24px',
        'neu-xl': '32px',
      },

      // ─── Spacing Additions ────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      // ─── Transitions ─────────────────────────────────────────────────
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'neu': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      // ─── Background Patterns ─────────────────────────────────────────
      backgroundImage: {
        'neu-gradient': 'linear-gradient(145deg, #e6ebf2, #d4d9e0)',
        'accent-gradient': 'linear-gradient(135deg, #4f7cac, #2e5c8a)',
      },
    },
  },
  plugins: [],
};
```

### 3.3 `src/index.css` — Global Resets & Tailwind Directives

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── Google Fonts Import ──────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

/* ── Base Resets ──────────────────────────────────────────────────── */
@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-neu-base text-neu-text-primary font-body;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5 {
    @apply font-display font-bold text-neu-text-primary;
  }

  /* Scrollbar styling — subtle and on-brand */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { @apply bg-neu-base; }
  ::-webkit-scrollbar-thumb { @apply bg-neu-shadow-dark rounded-full; }

  /* Focus ring — accessible but styled */
  :focus-visible {
    @apply outline-none ring-2 ring-neu-accent ring-offset-2 ring-offset-neu-base;
  }
}

/* ── Reusable Component Layer ─────────────────────────────────────── */
@layer components {
  /* Neumorphic surface base — apply to any elevated container */
  .neu-surface {
    @apply bg-neu-base rounded-neu shadow-neu-raised transition-shadow duration-400;
    transition-timing-function: theme('transitionTimingFunction.neu');
  }

  .neu-surface:hover {
    @apply shadow-neu-hover;
  }

  /* Section layout wrapper */
  .section-container {
    @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .section-padding {
    @apply py-20 lg:py-28;
  }

  /* Accent underline decoration for section headings */
  .heading-accent::after {
    content: '';
    @apply block w-12 h-1 mt-3 rounded-full;
    background: theme('backgroundImage.accent-gradient');
  }
}

/* ── Utility Overrides ────────────────────────────────────────────── */
@layer utilities {
  /* Text gradient for hero accent words */
  .text-gradient {
    @apply bg-clip-text text-transparent;
    background-image: theme('backgroundImage.accent-gradient');
  }

  /* Disable transitions for users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

### 3.4 Shared TypeScript Types (`src/types/index.ts`)

```typescript
export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  challenge: string;        // What problem did this solve?
  solution: string;         // How was it built/solved?
  techStack: string[];
  highlights: string[];     // 3-4 bullet point achievements
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
  icon?: string;            // Lucide icon name or custom SVG key
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
```

---

## 4. Component Specifications

### 4.1 UI Primitives (`src/components/ui/`)

---

#### `NeuCard.tsx`
A polymorphic wrapper that applies neumorphic surface styles. All project cards, about panels, and skill blocks use this.

```typescript
// Props
interface NeuCardProps {
  children: React.ReactNode;
  className?: string;
  sunken?: boolean;       // inset shadow variant
  accent?: boolean;       // adds accent ring
  as?: React.ElementType; // default: 'div'
  onClick?: () => void;
}

// Shadow logic:
// sunken=false (default) → shadow-neu-raised, hover → shadow-neu-hover
// sunken=true            → shadow-neu-sunken (no hover change)
// accent=true            → shadow-neu-accent
```

---

#### `NeuButton.tsx`
Two variants: `primary` (solid accent gradient) and `ghost` (neumorphic raised, no fill).

```typescript
interface NeuButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;            // renders as <a> if provided
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: React.ReactNode;   // optional Lucide icon
  iconPosition?: 'left' | 'right';
}

// Primary: bg-accent-gradient text-white, shadow-neu-raised
// On active/press: shadow-neu-pressed (inset)
// Ghost: bg-neu-base text-neu-accent, shadow-neu-raised
// Transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

---

#### `NeuInput.tsx`
Always renders with `shadow-neu-sunken` to indicate it is a vessel ready to receive input.

```typescript
interface NeuInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

// Visual: bg-neu-base, shadow-neu-sunken, rounded-neu-sm
// Focus: ring-2 ring-neu-accent (via :focus-visible)
// Error state: text-neu-error label + error message below
```

---

#### `NeuTextarea.tsx`
Same as `NeuInput` but for multi-line. Minimum height 140px, auto-grow.

---

#### `SkillBadge.tsx`
Small pill that displays a technology name with an optional icon.

```typescript
interface SkillBadgeProps {
  name: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md';
}

// Style: bg-neu-base, shadow-neu-flat, rounded-full, px-3 py-1.5
// Hover: shadow-neu-raised (lift effect)
// Text: text-neu-text-secondary font-mono text-sm
```

---

#### `SectionHeading.tsx`
Consistent heading block used at the top of every section.

```typescript
interface SectionHeadingProps {
  eyebrow: string;    // e.g. "What I do" — small uppercase text above
  title: string;      // Main heading
  subtitle?: string;  // Optional paragraph below
  center?: boolean;   // Center-align variant
}

// eyebrow: text-neu-accent font-mono text-sm uppercase tracking-widest
// title: text-display-lg font-display heading-accent class
// subtitle: text-neu-text-secondary text-base leading-relaxed
```

---

### 4.2 Layout Components

---

#### `Navbar.tsx` — Full Specification

**Desktop behavior (md and above):**
- Fixed to top, full width.
- Background: `bg-neu-base/80 backdrop-blur-md` (frosted glass).
- Bottom border: `border-b border-neu-shadow-dark/20`.
- Left: Site name/logo as text mark — styled as `font-display font-bold text-neu-text-primary`.
- Right: Horizontal nav links. Active link uses `text-neu-accent` with a small dot indicator below.
- On scroll past 80px: adds `shadow-neu-flat` to the navbar for subtle lift.

**Mobile behavior (below md):**
- Logo left, hamburger icon (Lucide `Menu` / `X`) right.
- Clicking hamburger opens a full-width dropdown panel beneath the navbar.
- Dropdown panel: `bg-neu-base shadow-neu-raised-lg rounded-b-neu-lg` with stacked vertical nav links.
- Each mobile nav link: large touch target (min-height 48px), `text-neu-text-primary` default, `text-neu-accent` active.
- Closing: clicking a link, clicking X, or clicking outside.

**Nav links:**
```
Home | About | Skills | Projects | Contact
```
Each link is a smooth-scroll anchor: `href="#section-id"`.

**Active link detection:** Use `useScrollSpy` hook — observe each section's `IntersectionObserver`, update active state when section enters viewport (threshold 0.4).

---

#### `Footer.tsx`

- Three columns (stacked on mobile, horizontal on desktop):
  - **Left:** Name + short tagline + copyright year (dynamic `new Date().getFullYear()`).
  - **Center:** Quick nav links (same as Navbar).
  - **Right:** Social icons (GitHub, LinkedIn, Email) as `NeuButton` ghost small variants with Lucide icons.
- Bottom strip: `text-neu-text-secondary text-xs text-center` — "Built with React, TypeScript & Tailwind CSS."
- Full width, `bg-neu-base`, top border, subtle padding.

---

### 4.3 Section Components

---

#### `Hero.tsx` — Full Specification

**Layout (Desktop):** Two-column split, 55%/45%. Text left, avatar right.
**Layout (Mobile):** Single column, avatar above text, centered.

**Content — Left Column:**
```
[EYEBROW]    Full Stack Engineer & CS Student
[HEADLINE]   Building things
             that actually work.
[SUBLINE]    I craft fast, reliable web apps — from
             backend APIs to polished UIs.
[CTA ROW]    [View My Work →]    [Download CV]
[SOCIAL ROW] GitHub icon | LinkedIn icon | Email icon
```

**Content — Right Column:**
- Avatar image in a large circular container.
- Container style: `shadow-neu-raised-lg rounded-full p-2 bg-neu-base`.
- A soft pulsing accent ring behind the avatar (CSS `@keyframes pulse`): `border-4 border-neu-accent-light`.

**Headline treatment:**
- "Building things" — `text-display-xl font-display text-neu-text-primary`.
- "that actually work." — same size but `text-gradient` class (accent gradient).
- This creates a memorable two-color display headline.

**Animations (Framer Motion):**
- Eyebrow → headline → subline → CTAs → social: staggered fade-up on mount (y: 20 → 0, opacity: 0 → 1, stagger 0.1s).
- Avatar: fade-in with slight scale (0.95 → 1.0).
- Respect `useReducedMotion` — if true, skip animations.

**Background:** A very subtle radial gradient on the hero section only: `radial-gradient(ellipse at 70% 50%, rgba(79,124,172,0.07) 0%, transparent 70%)`.

---

#### `About.tsx` — Full Specification

**Layout:** Two-column on desktop (text left, details right), single column on mobile.

**Left — Narrative text:**
```
[SECTION HEADING]
eyebrow: "Who I am"
title: "A developer who thinks before typing."
subtitle: Paragraph 1: Background as a CS student, passion for building real products.
          Paragraph 2: Started freelancing in 2025. Focus on clean architecture and UX.
          Paragraph 3: Currently available for freelance projects.
```

**Right — Stat/Detail Cards:**
Three small `NeuCard` components in a vertical stack:
1. `🎓 CS Student` — University name (placeholder), expected graduation year.
2. `💼 Freelancer Since 2025` — Projects delivered, client satisfaction (placeholder).
3. `📍 Location` — City/country placeholder + "Open to Remote".

Each card: `shadow-neu-raised rounded-neu p-5`, left-accent bar in `bg-accent-gradient` (4px wide, full height, rounded).

---

#### `Skills.tsx` — Full Specification

**Layout:** Section heading, then a CSS Grid of skill badges organized by category.

**Category Groups (rendered as sub-sections):**

Each group has a small category label (`text-neu-text-secondary font-mono text-xs uppercase tracking-wider`) followed by a flex-wrap row of `SkillBadge` components.

```
Languages:    TypeScript, JavaScript, Python, SQL
Frontend:     React.js, Next.js, Tailwind CSS, HTML5, CSS3
Backend:      Node.js, Express.js, REST APIs, PostgreSQL, MongoDB
Tools & DevOps: Git, GitHub, Docker, Vite, VS Code, Postman
```

**Layout detail:**
- Full-width `NeuCard` per category group, `shadow-neu-raised rounded-neu p-6`.
- Categories rendered in a 2-column grid on desktop, single column on mobile.
- Stagger animation on scroll: each card fades up with 0.1s delay using Framer Motion `whileInView`.

---

#### `Projects.tsx` + `ProjectCard.tsx` — Full Specification

> **This section is the most critical.** With only 2 projects, the layout must make them feel substantial and prominent, not sparse.

**Layout Strategy — Desktop:**
Two projects are displayed as **full-width stacked cards** (not a grid), each taking 100% container width. This "feature card" treatment ensures each project feels like a case study, not a thumbnail.

Each `ProjectCard` alternates layout direction:
- Project 1: Image LEFT, content RIGHT.
- Project 2: Image RIGHT, content LEFT.

This zigzag pattern prevents monotony and signals intentional design.

**Layout Strategy — Mobile:**
Each card stacks vertically: image on top, content below.

---

**`ProjectCard.tsx` — Internal Structure:**

```
┌─────────────────────────────────────────────────────────────┐
│  NeuCard (shadow-neu-raised-lg, rounded-neu-lg, overflow-   │
│  hidden, p-8 on desktop, p-5 on mobile)                     │
│                                                             │
│  ┌─────────────────────┐  ┌──────────────────────────────┐  │
│  │                     │  │  EYEBROW: Year · Category    │  │
│  │  Project Screenshot │  │                              │  │
│  │  (rounded-neu,      │  │  TITLE (text-display-md)     │  │
│  │   shadow-neu-sunken)│  │  TAGLINE (text-secondary)    │  │
│  │                     │  │                              │  │
│  │  [Live Demo badge]  │  │  ── The Challenge ──         │  │
│  │                     │  │  Short paragraph             │  │
│  └─────────────────────┘  │                              │  │
│                            │  ── How It Was Built ──      │  │
│                            │  Short paragraph             │  │
│                            │                              │  │
│                            │  ── Highlights ──            │  │
│                            │  • Achievement 1             │  │
│                            │  • Achievement 2             │  │
│                            │  • Achievement 3             │  │
│                            │                              │  │
│                            │  ── Tech Stack ──            │  │
│                            │  [Badge] [Badge] [Badge]     │  │
│                            │                              │  │
│                            │  [Live Demo →] [GitHub ↗]   │  │
│                            └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**ProjectCard visual details:**
- Card background: `bg-neu-base shadow-neu-raised-lg rounded-neu-lg`.
- Screenshot container: `shadow-neu-sunken rounded-neu` — inset shadow makes the image look embedded.
- "Live Demo" badge overlaid on image bottom-left: small pill, `bg-accent-gradient text-white text-xs px-2 py-1 rounded-full`.
- Section dividers inside card: `border-t border-neu-shadow-dark/30 my-4`.
- Highlight bullets: `flex gap-2 items-start` — Lucide `CheckCircle2` icon in `text-neu-accent` + text.
- CTA buttons: `NeuButton primary` for Live Demo, `NeuButton ghost` for GitHub.
- Entire card has `whileInView` fade-up animation (Framer Motion), once only.

---

**`src/data/projects.ts` — Data Schema Example:**

```typescript
import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project Title One',                           // ← REPLACE
    tagline: 'A one-sentence description of what it does.',// ← REPLACE
    description: 'Longer paragraph overview.',            // ← REPLACE
    challenge: 'What pain point or problem was being solved?',// ← REPLACE
    solution: 'How the architecture and tech choices addressed it.',// ← REPLACE
    techStack: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'], // ← REPLACE
    highlights: [
      'Reduced load time by X% with optimized queries',  // ← REPLACE
      'Implemented feature Y that increased engagement',  // ← REPLACE
      'Deployed on Z with CI/CD pipeline',               // ← REPLACE
    ],
    liveUrl: 'https://your-live-demo-url.com',           // ← REPLACE
    githubUrl: 'https://github.com/yourusername/repo',   // ← REPLACE
    thumbnailSrc: '/src/assets/images/project-1-thumb.webp',
    thumbnailAlt: 'Screenshot of Project Title One',
    isFeatured: true,
    year: '2025',
  },
  {
    id: 'project-2',
    title: 'Project Title Two',                          // ← REPLACE
    tagline: 'A one-sentence description of what it does.',// ← REPLACE
    description: 'Longer paragraph overview.',           // ← REPLACE
    challenge: 'What pain point or problem was being solved?',// ← REPLACE
    solution: 'How the architecture and tech choices addressed it.',// ← REPLACE
    techStack: ['Next.js', 'Express', 'MongoDB', 'Docker'],// ← REPLACE
    highlights: [
      'Built a real-time feature using WebSockets',      // ← REPLACE
      'Achieved 95+ Lighthouse score across all metrics',// ← REPLACE
      'Scaled to handle X concurrent users',             // ← REPLACE
    ],
    liveUrl: 'https://your-live-demo-url.com',           // ← REPLACE
    githubUrl: 'https://github.com/yourusername/repo-2', // ← REPLACE
    thumbnailSrc: '/src/assets/images/project-2-thumb.webp',
    thumbnailAlt: 'Screenshot of Project Title Two',
    isFeatured: true,
    year: '2025',
  },
];
```

---

#### `Contact.tsx` — Full Specification

**Layout:** Two-column on desktop, single column on mobile.
- **Left (40%):** Availability panel + contact info.
- **Right (60%):** Contact form.

**Left panel — Availability Card:**
```
[NeuCard — shadow-neu-raised, full height]

  🟢 Available for Projects     ← green dot pulse animation
  
  "Have a project in mind? I'd love to hear about it.
  I'm currently taking on new freelance work."
  
  ─────────────────
  
  📧  your.email@example.com
  💼  LinkedIn: /in/yourhandle
  🐙  GitHub: /yourusername
  📍  Your City, Country
  
```

Availability dot: `w-2.5 h-2.5 rounded-full bg-neu-success` with `@keyframes ping` pulse.

**Right panel — Contact Form:**

Fields (all using `NeuInput` / `NeuTextarea`):
1. Full Name (required, min 2 chars)
2. Email Address (required, valid email regex)
3. Subject (required, min 5 chars)
4. Message (required, min 20 chars, `NeuTextarea`, 5 rows)
5. Submit button: `NeuButton primary full-width` — "Send Message →"

**Form behavior:**
- Managed by `react-hook-form`.
- Validation triggers on blur (not on every keystroke).
- On invalid field: `NeuInput` label turns `text-neu-error`, helper text appears below input in `text-neu-error text-sm`.
- On submit: button shows loading state — spinner icon replaces arrow icon, text becomes "Sending…", button `disabled`.
- **Note:** Actual form submission is a placeholder (`console.log(data)`). The agent must add a comment: `// TODO: Replace with EmailJS, Formspree, or backend endpoint`.
- On success: show a `NeuCard` success message with `text-neu-success` and a Lucide `CheckCircle2` icon, replacing the form.
- On error: show inline error message in `text-neu-error`.

---

### 4.4 `App.tsx` — Page Assembly

```typescript
// App.tsx structure
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

function App() {
  return (
    <div className="bg-neu-base min-h-screen">
      <Navbar />
      <main>
        <section id="home">    <Hero />     </section>
        <section id="about">   <About />    </section>
        <section id="skills">  <Skills />   </section>
        <section id="projects"><Projects /> </section>
        <section id="contact"> <Contact />  </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

---

## 5. Phase-by-Phase Execution Plan

> **OpenCode:** Execute phases in strict order. Do not begin a new phase until all tasks in the current phase are complete and the app renders without TypeScript or console errors.

---

### ✅ Phase 1 — Project Scaffold & Dependencies

**Objective:** Get a running Vite + React + TypeScript app with all dependencies installed.

**Tasks:**
1. Run scaffold commands from Section 2.1 in exact order.
2. Create the full folder structure from Section 2.2. Create empty placeholder files (`.tsx` and `.ts`) for every file listed — do not write implementations yet, just stubs with a default export.
3. Write `vite.config.ts` from Section 2.3.
4. Update `tsconfig.json` with path aliases from Section 2.3.
5. Write `.prettierrc` from Section 2.3.
6. Write `src/utils/cn.ts` and run `npm install clsx tailwind-merge`.
7. Write `src/types/index.ts` with all interfaces from Section 3.4.
8. Run `npm run dev` — confirm app starts without errors. The page may be blank or show placeholder text. That is expected.

**Success Criteria:** `npm run dev` runs. Browser shows page. `npm run build` produces no TypeScript errors.

---

### ✅ Phase 2 — Design System Implementation

**Objective:** All design tokens are live. The base neumorphic look is visible in the browser.

**Tasks:**
1. Replace `tailwind.config.js` with the full configuration from Section 3.2. Do not omit any key.
2. Replace `src/index.css` with content from Section 3.3.
3. In `src/main.tsx`, confirm `import './index.css'` is present.
4. Temporarily update `App.tsx` to render a test div:
   ```tsx
   <div className="min-h-screen bg-neu-base flex items-center justify-center">
     <div className="neu-surface p-10 rounded-neu">
       <p className="text-neu-text-primary font-display text-2xl">Design Tokens Active</p>
       <p className="text-neu-text-secondary mt-2">Neumorphic shadow is working.</p>
     </div>
   </div>
   ```
5. Verify in browser: background is `#e0e5ec`, the card shows a visible soft raised shadow on both sides. If shadows are invisible, check that Tailwind is picking up the config (restart dev server).
6. Remove the test div once verified. Restore `App.tsx` to proper structure.
7. Write `src/data/projects.ts` with placeholder data from Section 4.3. Mark all `// ← REPLACE` fields clearly.
8. Write `src/data/skills.ts` with the full skills arrays from Section 4.3 Skills.

**Success Criteria:** Neumorphic shadow is visible. Background color is the correct off-gray. Google Fonts load correctly (check Network tab).

---

### ✅ Phase 3 — UI Primitive Components

**Objective:** All reusable `src/components/ui/` components are implemented and individually testable.

**Tasks (implement in this order):**

**3.1 — `NeuCard.tsx`**
- Implement using props from Section 4.1.
- Shadow class logic: use `cn()` utility to conditionally apply `shadow-neu-raised`, `shadow-neu-sunken`, or `shadow-neu-accent`.
- Add `transition-shadow duration-400` and hover shadow upgrade.
- Test by temporarily placing `<NeuCard>Hello</NeuCard>` in `App.tsx`.

**3.2 — `NeuButton.tsx`**
- Two variants: `primary` (gradient) and `ghost` (raised, no fill).
- Active/pressed state: `active:shadow-neu-pressed`.
- If `href` prop provided, render as `<a>` tag with `target="_blank" rel="noopener noreferrer"`.
- Icon support: if `icon` prop provided, render it left or right of label text.
- Disabled state: `opacity-50 cursor-not-allowed pointer-events-none`.

**3.3 — `NeuInput.tsx`**
- Always `shadow-neu-sunken rounded-neu-sm`.
- Label above input: `text-neu-text-secondary text-sm font-medium mb-1.5`.
- Error state: label color changes to `text-neu-error`, error message appears below.
- Forward ref: use `React.forwardRef` so `react-hook-form` can register it.

**3.4 — `NeuTextarea.tsx`**
- Same as `NeuInput` but `<textarea>`.
- Minimum height `140px`, `resize-y`.
- Forward ref.

**3.5 — `SkillBadge.tsx`**
- Implement from Section 4.1.
- Optional Lucide icon support.

**3.6 — `SectionHeading.tsx`**
- Implement from Section 4.1.
- `heading-accent::after` CSS pseudo-element gives the gradient underline.

**Success Criteria:** All 6 UI components compile without TypeScript errors. No `any` types used. Props match their interfaces exactly.

---

### ✅ Phase 4 — Hooks

**Objective:** Custom hooks are implemented and ready for use in components.

**Tasks:**

**4.1 — `src/hooks/useReducedMotion.ts`**
```typescript
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
}
```

**4.2 — `src/hooks/useScrollSpy.ts`**
- Accept an array of section IDs and a threshold (default `0.4`).
- Use `IntersectionObserver` to watch all sections.
- Return the ID of the currently intersecting section.
- Clean up observer on unmount.

```typescript
import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[], threshold = 0.4): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, [sectionIds, threshold]);

  return activeId;
}
```

**Success Criteria:** Both hooks compile without errors. No side effects that cause console warnings.

---

### ✅ Phase 5 — Layout Components

**Objective:** `Navbar` and `Footer` are implemented and functional.

**Tasks:**

**5.1 — `Navbar.tsx`**
- Implement all desktop and mobile behaviors from Section 4.2.
- Mobile menu state: `const [menuOpen, setMenuOpen] = useState(false)`.
- Scroll shadow: `const [scrolled, setScrolled] = useState(false)` + `window.addEventListener('scroll', ...)` in `useEffect`.
- Use `useScrollSpy(['home','about','skills','projects','contact'])` to determine active link.
- Nav link component (inline): renders `<a href="#id">`, applies active class when `activeId === id`.
- Close mobile menu on nav link click.
- Hamburger: Lucide `Menu` when closed, `X` when open. Smooth transition.
- Navbar height: `h-16` (64px). Body content should have `pt-16` to avoid overlap (set on `<main>` in `App.tsx`).

**5.2 — `Footer.tsx`**
- Implement three-column layout from Section 4.2.
- Social icon links use `NeuButton` ghost small with Lucide `Github`, `Linkedin`, `Mail` icons.
- Copyright year: `{new Date().getFullYear()}`.

**Success Criteria:** Navbar renders on all screen sizes. Mobile hamburger opens and closes. Active nav link updates on scroll. Footer renders correctly.

---

### ✅ Phase 6 — Section Components

**Objective:** All five page sections are implemented with real content structure and Framer Motion animations.

**Implement in this order:**

**6.1 — `Hero.tsx`**
- Two-column desktop, single-column mobile.
- Framer Motion: `AnimatePresence` + `motion.div` for each text element with staggered entrance.
- `useReducedMotion()`: if true, set all animation `duration` to `0`.
- Avatar: circular with raised shadow. Use `src/assets/images/avatar.webp` — if missing, use a placeholder div with initials.
- Gradient headline: "Building things" plain + "that actually work." in `text-gradient` class.
- CTAs: `NeuButton primary` ("View My Work →" links to `#projects`) + `NeuButton ghost` ("Download CV" — href to a placeholder PDF path).
- Social links row: three icon-only `NeuButton ghost sm` for GitHub, LinkedIn, Email.

**6.2 — `About.tsx`**
- Left: narrative paragraphs, section heading.
- Right: three `NeuCard` stat blocks with left accent bar.
- `whileInView` fade-up animation, `once: true`.

**6.3 — `Skills.tsx`**
- Section heading.
- Map through skill categories, render a `NeuCard` per category.
- 2-column grid on desktop: `grid grid-cols-1 md:grid-cols-2 gap-6`.
- `SkillBadge` for each skill.
- Staggered `whileInView` on each card.

**6.4 — `ProjectCard.tsx`**
- Full implementation from Section 4.3.
- Accept a `Project` object + a `reversed: boolean` prop (controls image-left vs image-right).
- Desktop: `grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`.
- On `reversed=true`: `lg:grid-flow-col-dense` with the content column given `lg:col-start-1` and image given `lg:col-start-2`.
- Screenshot: `<img>` with `shadow-neu-sunken rounded-neu object-cover w-full h-64 lg:h-80`.
- Highlight bullets: use Lucide `CheckCircle2` icon.
- Tech badges: use `SkillBadge sm` components.
- Both CTA buttons on same row with `gap-3`.

**6.5 — `Projects.tsx`**
- Section heading.
- Import `projects` array from `src/data/projects.ts`.
- Map projects: `<ProjectCard key={p.id} project={p} reversed={index % 2 !== 0} />`.
- Wrap each card in a `motion.div whileInView` fade-up.
- Spacing between cards: `space-y-12 lg:space-y-20`.

**6.6 — `Contact.tsx`**
- Left availability panel + right form.
- Desktop: `grid grid-cols-1 lg:grid-cols-5 gap-12`. Left gets `lg:col-span-2`, right gets `lg:col-span-3`.
- Form managed by `react-hook-form` with validation rules from Section 4.3.
- On submit: `handleSubmit(onSubmit)` where `onSubmit` logs data and sets `submitState` to `'success'`.
- If `submitState === 'success'`: replace form with success card.
- Pulsing green dot on availability panel.

**Success Criteria:** All sections render. No `undefined` errors. Framer Motion animations play on first scroll into view. Form validation triggers correctly.

---

### ✅ Phase 7 — Final Assembly & Polish

**Objective:** The complete page is assembled, responsive, and production-ready.

**Tasks:**

**7.1 — `App.tsx` Final Assembly**
- Import and render all layout + section components.
- Add `pt-16` to `<main>` to offset fixed navbar height.
- Ensure each `<section>` has the correct `id` attribute.

**7.2 — Responsive Audit**
Test at these breakpoints. Fix any layout issues found:
- `320px` (very small mobile)
- `375px` (standard mobile)
- `768px` (tablet)
- `1024px` (laptop)
- `1280px` (desktop)
- `1440px` (large desktop)

**Known mobile issues to check proactively:**
- Navbar hamburger tap target must be at least 44×44px.
- Hero avatar must not overflow on small screens.
- Project cards must not have horizontal scroll.
- Contact form inputs must not be too small to tap on mobile.
- All `NeuCard` components should have adequate padding on mobile (min `p-5`).

**7.3 — Accessibility Audit**
- All images: `alt` text present.
- All interactive elements: keyboard-focusable (`tabindex` not `-1` unless intentional).
- Form labels: each `<input>` has an associated `<label>` (use `htmlFor` / `id`).
- Color contrast: verify `text-neu-text-secondary` on `bg-neu-base` meets WCAG AA (4.5:1 for normal text). If not, darken the color.
- Navbar mobile menu: `aria-expanded` attribute reflects open/close state. `aria-label="Navigation menu"` on hamburger button.
- Landmark roles: `<main>`, `<nav>`, `<footer>` are used semantically.

**7.4 — Performance**
- All images: use `.webp` format where possible. Add `loading="lazy"` to all images below the fold.
- Hero image: `loading="eager"` (above fold).
- Fonts: already loaded via Google Fonts `display=swap`.
- Framer Motion: use `LazyMotion` with `domAnimation` feature bundle to reduce bundle size:
  ```tsx
  import { LazyMotion, domAnimation } from 'framer-motion';
  // Wrap App in <LazyMotion features={domAnimation}>
  ```

**7.5 — Final Build Test**
```bash
npm run build
npm run preview
```
- Confirm no TypeScript errors.
- Confirm no Tailwind purge issues (missing classes that were dynamically constructed).
- If Tailwind purges dynamic class names (e.g. `shadow-neu-raised` applied via conditional logic), add them to `tailwind.config.js` `safelist` array:
  ```javascript
  safelist: [
    'shadow-neu-raised',
    'shadow-neu-sunken',
    'shadow-neu-hover',
    'shadow-neu-pressed',
    'shadow-neu-accent',
    'shadow-neu-flat',
    'shadow-neu-raised-lg',
  ],
  ```

**Success Criteria:** `npm run build` succeeds. `npm run preview` shows the complete portfolio. No console errors in production build.

---

## 6. Content Placeholders

All items marked `← REPLACE` in the data files are content that the human will fill in. The agent must use these placeholder values during build so the layout looks realistic:

| Placeholder | Suggested Build-Time Value |
|---|---|
| Developer Name | "Your Name" |
| Tagline | "Full Stack Engineer & CS Student" |
| University | "State University of [City]" |
| Location | "Your City, Country" |
| Email | "hello@yourportfolio.dev" |
| LinkedIn | "#" |
| GitHub | "https://github.com" |
| Project 1 Title | "E-Commerce Platform" |
| Project 1 Stack | React, Node.js, PostgreSQL, Stripe |
| Project 2 Title | "Task Management App" |
| Project 2 Stack | Next.js, MongoDB, Express, Socket.io |
| Avatar | Initials placeholder div: `bg-accent-gradient text-white text-4xl font-bold` |
| Project screenshots | Solid colored divs with project name text centered |

---

## 7. Quality Checklist

Before marking the build as complete, the agent must verify every item:

### Design
- [ ] Background color matches `#e0e5ec` exactly — not white, not light gray, but the specific off-blue-gray.
- [ ] Every interactive card shows a visible raised shadow on both sides (test in Chromium).
- [ ] Hover states on cards and buttons work correctly.
- [ ] Active/pressed states on buttons depress with inset shadow.
- [ ] Input fields show sunken/inset shadow at rest.
- [ ] No solid borders anywhere (Neumorphism uses shadows, not borders, for depth).
- [ ] Section headings all use `SectionHeading` component consistently.
- [ ] The gradient headline in Hero is visible as two-tone text.
- [ ] Project section with 2 projects fills the viewport with substance — no empty whitespace below the second project.

### Code Quality
- [ ] No `any` TypeScript types in component props or data.
- [ ] All components are typed with explicit interfaces.
- [ ] `cn()` utility is used for all conditional className logic — no string concatenation with `+`.
- [ ] No inline styles (no `style={{}}`) except where unavoidable (e.g., dynamic color values).
- [ ] All `useEffect` hooks have proper dependency arrays and cleanup functions.
- [ ] No direct DOM manipulation — React state only.

### Responsiveness
- [ ] Navbar hamburger appears below `md` breakpoint only.
- [ ] Mobile menu is usable with thumbs (large touch targets).
- [ ] Hero section is readable and not clipped on 320px width.
- [ ] Project cards stack properly on mobile.
- [ ] No horizontal scroll at any breakpoint.

### Functionality
- [ ] Smooth scroll works on all nav links.
- [ ] Active nav link updates as user scrolls between sections.
- [ ] Contact form validates all fields before submission.
- [ ] Contact form shows loading state during submit.
- [ ] Contact form shows success state after submit.
- [ ] All external links open in `target="_blank"`.

### Accessibility
- [ ] Tab order is logical (top-left to bottom-right).
- [ ] All images have descriptive `alt` text.
- [ ] Form fields have associated labels.
- [ ] Hamburger button has `aria-label` and `aria-expanded`.
- [ ] No keyboard trap in mobile menu (Escape key closes it).
- [ ] Color contrast passes WCAG AA minimum.

---

*End of plan.md — OpenCode should begin execution at Phase 1.*
