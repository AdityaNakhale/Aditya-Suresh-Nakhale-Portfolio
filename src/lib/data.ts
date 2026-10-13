/**
 * Single source of truth for all content on Aditya Suresh Nakhale's portfolio.
 * Extracted strictly from his official résumé and portfolio video.
 */

export interface Profile {
  name: string;
  firstName: string;
  role: string;
  subrole: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  github: string;
  githubHandle: string;
  linkedin: string;
  linkedinHandle: string;
  resumePath: string;
  idNumber: string;
  dept: string;
  validTill: string;
  degreeSummary: string;
  quote: string;
}

export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export interface SkillItem {
  atomicNumber: number;
  symbol: string;
  name: string;
  family: 'Languages' | 'Backend & Web' | 'Databases & ORM' | 'Concepts' | 'Tools' | 'Soft Skills';
  brandKey?: string;
  conceptKey?: string;
  projects: string[];
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  score: string;
}

export interface CertificationItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
  linkText: string;
  url: string;
}

export interface AchievementItem {
  id: string;
  index: string;
  number: number;
  suffix?: string;
  prefix?: string;
  label: string;
  caption: string;
  detail: string;
  platform: 'Competition' | 'Production' | 'Database' | 'Cloud Storage' | 'Git';
  brandKey: string;
}

export const PROFILE: Profile = {
  name: 'Aditya Suresh Nakhale',
  firstName: 'ADITYA',
  role: 'Full Stack Developer',
  subrole: 'Backend Developer Intern',
  email: 'adityanakhale0@gmail.com',
  phone: '+91 93224 85330',
  phoneHref: 'tel:+919322485330',
  location: 'Pune, India',
  resumeSummary:
    "2026 BCA graduate and backend developer intern with hands-on experience building REST APIs, MVC-based services, and full-stack features for a live production application. Built and shipped a Prisma/PostgreSQL-backed data access layer, a Node.js/Nest.js/Next.js web application serving 1,000+ users, and Dropbox-integrated file handling for 500+ users. Comfortable across Java, JavaScript, and SQL, with strong fundamentals in OOP and MVC architecture. Seeking to grow into a full-time software engineering career through Google's Software Application Development Apprenticeship, contributing to production codebases while learning from experienced engineering teams.",
  github: 'https://github.com/AdityaNakhale',
  githubHandle: 'github.com/AdityaNakhale',
  linkedin: 'https://linkedin.com/in/aditya-nakhale-a63b67319',
  linkedinHandle: 'linkedin.com/in/aditya-nakhale-a63b67319',
  resumePath: `${import.meta.env.BASE_URL}resume.pdf`,
  idNumber: 'ASN-2026-BCA',
  dept: 'Software Engineering',
  validTill: '2026',
  degreeSummary: 'BCA (2023–2026) · Sant Gadge Baba Amravati University · CGPA 6.5/10',
  quote:
    'Building robust REST APIs, MVC architectures, and data access layers for real production workloads.',
};

export const NAV: NavItem[] = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'skills', label: 'Skills', index: '02' },
  { id: 'work', label: 'Work', index: '03' },
  { id: 'experience', label: 'Experience', index: '04' },
  { id: 'achievements', label: 'Achievements', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: 'Programming Languages',
    skills: ['C', 'C++', 'Java', 'JavaScript'],
  },
  {
    name: 'Backend & Web',
    skills: ['Node.js', 'Nest.js', 'Next.js', 'Servlets', 'JSP', 'REST APIs', 'HTTP', 'HTML', 'CSS'],
  },
  {
    name: 'Databases & ORM',
    skills: ['PostgreSQL', 'MySQL', 'Prisma ORM'],
  },
  {
    name: 'Concepts',
    skills: ['Object-Oriented Programming', 'MVC Architecture', 'API Design'],
  },
  {
    name: 'Tools',
    skills: ['Git', 'VS Code', 'Apache NetBeans', 'Google Workspace'],
  },
  {
    name: 'Soft Skills',
    skills: ['Teamwork', 'Problem Solving', 'Time Management', 'Cross-team Collaboration'],
  },
];

export const SKILLS: SkillItem[] = [
  // Languages
  { atomicNumber: 1, symbol: 'Ja', name: 'Java', family: 'Languages', brandKey: 'java', projects: ['Food Rescue AI', 'Career Portfolio Generator'] },
  { atomicNumber: 2, symbol: 'Js', name: 'JavaScript', family: 'Languages', brandKey: 'javascript', projects: ['JK Innovative Platform', 'Food Rescue AI'] },
  { atomicNumber: 3, symbol: 'Cp', name: 'C++', family: 'Languages', brandKey: 'cplusplus', projects: ['College Coding Competition'] },
  { atomicNumber: 4, symbol: 'C', name: 'C', family: 'Languages', brandKey: 'c', projects: ['Systems & Foundations'] },

  // Backend & Web
  { atomicNumber: 5, symbol: 'No', name: 'Node.js', family: 'Backend & Web', brandKey: 'nodejs', projects: ['JK Innovative Platform'] },
  { atomicNumber: 6, symbol: 'Ne', name: 'Nest.js', family: 'Backend & Web', brandKey: 'nestjs', projects: ['JK Innovative Platform'] },
  { atomicNumber: 7, symbol: 'Nx', name: 'Next.js', family: 'Backend & Web', brandKey: 'nextjs', projects: ['JK Innovative Platform'] },
  { atomicNumber: 8, symbol: 'Se', name: 'Servlets', family: 'Backend & Web', brandKey: 'java', projects: ['Career Portfolio Generator'] },
  { atomicNumber: 9, symbol: 'Js', name: 'JSP', family: 'Backend & Web', brandKey: 'java', projects: ['Career Portfolio Generator'] },
  { atomicNumber: 10, symbol: 'Re', name: 'REST APIs', family: 'Backend & Web', conceptKey: 'api', projects: ['JK Innovative Platform', 'Food Rescue AI'] },
  { atomicNumber: 11, symbol: 'Ht', name: 'HTTP', family: 'Backend & Web', conceptKey: 'http', projects: ['JK Innovative Platform'] },
  { atomicNumber: 12, symbol: 'H5', name: 'HTML', family: 'Backend & Web', brandKey: 'html5', projects: ['Career Portfolio Generator', 'JK Innovative Platform'] },
  { atomicNumber: 13, symbol: 'Cs', name: 'CSS', family: 'Backend & Web', brandKey: 'css3', projects: ['Career Portfolio Generator', 'JK Innovative Platform'] },

  // Databases & ORM
  { atomicNumber: 14, symbol: 'Pg', name: 'PostgreSQL', family: 'Databases & ORM', brandKey: 'postgresql', projects: ['JK Innovative Platform', 'Food Rescue AI'] },
  { atomicNumber: 15, symbol: 'My', name: 'MySQL', family: 'Databases & ORM', brandKey: 'mysql', projects: ['Career Portfolio Generator', 'Food Rescue AI'] },
  { atomicNumber: 16, symbol: 'Pr', name: 'Prisma ORM', family: 'Databases & ORM', brandKey: 'prisma', projects: ['JK Innovative Platform'] },

  // Concepts
  { atomicNumber: 17, symbol: 'Op', name: 'Object-Oriented Programming', family: 'Concepts', conceptKey: 'oop', projects: ['Food Rescue AI', 'Career Portfolio Generator'] },
  { atomicNumber: 18, symbol: 'Mv', name: 'MVC Architecture', family: 'Concepts', conceptKey: 'mvc', projects: ['JK Innovative Platform', 'Career Portfolio Generator'] },
  { atomicNumber: 19, symbol: 'Ad', name: 'API Design', family: 'Concepts', conceptKey: 'design', projects: ['JK Innovative Platform', 'Food Rescue AI'] },

  // Tools
  { atomicNumber: 20, symbol: 'Gt', name: 'Git', family: 'Tools', brandKey: 'git', projects: ['JK Innovative Platform', 'Food Rescue AI'] },
  { atomicNumber: 21, symbol: 'Vs', name: 'VS Code', family: 'Tools', brandKey: 'vscode', projects: ['Everyday Development'] },
  { atomicNumber: 22, symbol: 'Nb', name: 'Apache NetBeans', family: 'Tools', brandKey: 'apache', projects: ['Java MVC Projects'] },
  { atomicNumber: 23, symbol: 'Gw', name: 'Google Workspace', family: 'Tools', brandKey: 'google', projects: ['Documentation & Collaboration'] },

  // Soft Skills
  { atomicNumber: 24, symbol: 'Tw', name: 'Teamwork', family: 'Soft Skills', conceptKey: 'team', projects: ['JK Innovative 5-Person Team'] },
  { atomicNumber: 25, symbol: 'Ps', name: 'Problem Solving', family: 'Soft Skills', conceptKey: 'problem', projects: ['College Coding Competition Winner'] },
  { atomicNumber: 26, symbol: 'Tm', name: 'Time Management', family: 'Soft Skills', conceptKey: 'time', projects: ['Weekly Delivery Schedules'] },
  { atomicNumber: 27, symbol: 'Cc', name: 'Cross-team Collaboration', family: 'Soft Skills', conceptKey: 'collab', projects: ['Production API Integration'] },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'food-rescue-ai',
    index: '01',
    title: 'Food Rescue AI',
    kicker: 'Full-Stack Food Donation & NGO Matching Platform',
    description:
      'Built a full-stack platform in Java (Spring Boot, Spring Data JPA/Hibernate) with Thymeleaf dashboards and a MySQL/PostgreSQL backend to connect food donors with nearby NGOs and shelters in real time.',
    features: [
      'Rule-based scoring system allocating donations by proximity, expiry window, and NGO capacity using Google Maps Geocoding & Distance Matrix APIs.',
      'End-to-end donor registration & listing flows with real-time lifecycle tracking across 4 stages: Pending → Allocated → Claimed → Rescued.',
      'Dedicated Admin & NGO dashboards with real-time analytics and impact reporting.',
      'Full database integration across PostgreSQL and MySQL for reliable transactions.',
    ],
    tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'Thymeleaf', 'PostgreSQL', 'MySQL', 'Google Maps API'],
    github: 'https://github.com/AdityaNakhale',
  },
  {
    id: 'career-portfolio-generator',
    index: '02',
    title: 'Career Portfolio Generator for Students',
    kicker: 'MVC Student Portfolio Architecture',
    description:
      'Built with Java, Servlets, JSP, HTML, CSS, and MySQL, following standard MVC architecture to enable students to dynamically generate shareable portfolio pages.',
    features: [
      'Dynamic form handling allowing students to input credentials, projects, and skills.',
      'Clean content rendering pipeline producing shareable, responsive portfolio views.',
      'Strict separation of concerns adhering to the Model-View-Controller (MVC) architectural pattern.',
      'Structured MySQL database persistence for student profiles and portfolio configurations.',
    ],
    tech: ['Java', 'Servlets', 'JSP', 'HTML', 'CSS', 'MySQL', 'MVC Architecture'],
    github: 'https://github.com/AdityaNakhale',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'jk-innovative',
    role: 'Backend Developer Intern',
    company: 'JK Innovative Pvt. Ltd.',
    period: 'Jun 2025 – Sep 2025',
    bullets: [
      'Built a REST API in Node.js integrated with PostgreSQL, supporting ~100 user requests per day for a live Career Portfolio Generator platform.',
      'Designed a Prisma ORM data access layer that cut database query latency by 30%, improving overall application performance.',
      'Delivered a Next.js frontend with a Nest.js backend serving 1,000+ users at 99.9% uptime and ~200ms average response time.',
      'Implemented MVC architecture and integrated a MySQL database for core application logic.',
      'Collaborated with a 5-person team to integrate Dropbox APIs for file sharing and storage across 500+ users, maintaining data consistency and security.',
      'Used Git for version control, averaging 20+ commits per week and resolving merge conflicts to keep delivery on schedule.',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'bca',
    degree: 'Bachelor of Computer Applications',
    institution: 'Sant Gadge Baba Amravati University',
    period: 'Aug 2023 – 2026',
    location: 'Amravati, India',
    score: 'CGPA: 6.5/10',
  },
  {
    id: 'hsc',
    degree: '12th Board (HSC)',
    institution: 'Nandgaon High School and Junior College',
    period: 'May 2021 – May 2022',
    location: 'Nandgaon Khandeshwar, India',
    score: 'Percentage: 63.33%',
  },
  {
    id: 'ssc',
    degree: '10th Board (SSC)',
    institution: 'Nandgaon High School',
    period: 'May 2019 – May 2020',
    location: 'Nandgaon Khandeshwar, India',
    score: 'Percentage: 73.40%',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'google-cloud-arcade',
    index: '01',
    title: 'Google Cloud Arcade',
    issuer: 'Google Cloud Skills Boost',
    linkText: 'skills.google/public_profiles/64a46582-a638-4b7b-b725-e2e3463d9a0e',
    url: 'https://www.skills.google/public_profiles/64a46582-a638-4b7b-b725-e2e3463d9a0e',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'coding-prize',
    index: '01 / 05',
    number: 1,
    suffix: 'st',
    prefix: 'Rank #',
    label: 'College Level Coding Competition',
    caption: '1st Prize Winner',
    detail: 'Demonstrated algorithmic problem solving, logic speed, and clean code under strict time limits.',
    platform: 'Competition',
    brandKey: 'hackerrank',
  },
  {
    id: 'users-served',
    index: '02 / 05',
    number: 1000,
    suffix: '+',
    label: 'Production Users Served',
    caption: '99.9% Uptime & ~200ms Response',
    detail: 'Full-stack application running Next.js frontend with Nest.js backend at JK Innovative Pvt. Ltd.',
    platform: 'Production',
    brandKey: 'nextjs',
  },
  {
    id: 'latency-reduction',
    index: '03 / 05',
    number: 30,
    suffix: '%',
    label: 'Database Query Latency Reduction',
    caption: 'Prisma ORM Optimization',
    detail: 'Designed and tuned the data access layer in PostgreSQL for optimal query execution.',
    platform: 'Database',
    brandKey: 'prisma',
  },
  {
    id: 'dropbox-users',
    index: '04 / 05',
    number: 500,
    suffix: '+',
    label: 'Users File Storage Managed',
    caption: 'Dropbox API Integration',
    detail: 'Integrated file sharing and storage across a 5-person team, guaranteeing data consistency and security.',
    platform: 'Cloud Storage',
    brandKey: 'dropbox',
  },
  {
    id: 'commits-velocity',
    index: '05 / 05',
    number: 20,
    suffix: '+',
    label: 'Commits per Week',
    caption: 'Git Version Control Velocity',
    detail: 'Consistently delivered production pull requests and resolved merge conflicts to keep delivery on schedule.',
    platform: 'Git',
    brandKey: 'git',
  },
];
