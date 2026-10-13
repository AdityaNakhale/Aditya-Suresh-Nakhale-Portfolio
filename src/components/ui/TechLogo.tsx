import React, { useState } from 'react';

export const BRAND_MAP: Record<string, string> = {
  java: 'logos/java.svg',
  javascript: 'logos/javascript.svg',
  c: 'logos/c.svg',
  cplusplus: 'logos/cplusplus.svg',
  nodejs: 'logos/nodejs.svg',
  nestjs: 'logos/nestjs.svg',
  nextjs: 'logos/nextjs.svg',
  postgresql: 'logos/postgresql.svg',
  mysql: 'logos/mysql.svg',
  prisma: 'logos/prisma.svg',
  git: 'logos/git.svg',
  vscode: 'logos/vscode.svg',
  apache: 'logos/apache.svg',
  google: 'logos/google.svg',
  dropbox: 'logos/dropbox.svg',
  googlecloud: 'logos/googlecloud.svg',
  googlemaps: 'logos/googlemaps.svg',
  springboot: 'logos/springboot.svg',
  thymeleaf: 'logos/thymeleaf.svg',
  hibernate: 'logos/hibernate.svg',
  html5: 'logos/html5.svg',
  css3: 'logos/css3.svg',
  leetcode: 'logos/leetcode.svg',
  codechef: 'logos/codechef.svg',
  geeksforgeeks: 'logos/geeksforgeeks.svg',
  hackerrank: 'logos/hackerrank.svg',
};

export const CONCEPT_MAP: Record<string, React.FC<{ className?: string }>> = {
  api: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <path d="M6 12h2m4 0h4m-8-3v6" />
    </svg>
  ),
  http: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  ),
  oop: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  mvc: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
      <path d="M6.5 10v2a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
    </svg>
  ),
  design: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5l-2.1 2.1m-8.8 8.8l-2.1 2.1m0-13l2.1 2.1m8.8 8.8l2.1 2.1" />
    </svg>
  ),
  team: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  problem: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M9 18h6m-4 3h2" />
      <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
    </svg>
  ),
  time: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  collab: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M10 4v4m4-4v4M2 10h20" />
    </svg>
  ),
};

export function isBrand(brandKey?: string): boolean {
  if (!brandKey) return false;
  return brandKey in BRAND_MAP;
}

interface TechLogoProps {
  brandKey?: string;
  conceptKey?: string;
  name?: string;
  className?: string;
  size?: number;
}

export const TechLogo: React.FC<TechLogoProps> = ({
  brandKey,
  conceptKey,
  name,
  className = '',
  size = 24,
}) => {
  const [loadError, setLoadError] = useState(false);

  if (brandKey && BRAND_MAP[brandKey] && !loadError) {
    const base = import.meta.env.BASE_URL || '/';
    const cleanPath = BRAND_MAP[brandKey].replace(/^\//, '');
    const fullSrc = `${base}${cleanPath}`;

    return (
      <img
        src={fullSrc}
        alt={name || brandKey}
        width={size}
        height={size}
        onError={() => setLoadError(true)}
        className={`object-contain transition-transform duration-300 ${className}`}
        loading="lazy"
      />
    );
  }

  if (conceptKey && CONCEPT_MAP[conceptKey]) {
    const ConceptIcon = CONCEPT_MAP[conceptKey];
    return (
      <div
        style={{ width: size, height: size }}
        className={`flex items-center justify-center text-[var(--ink)] ${className}`}
      >
        <ConceptIcon className="w-full h-full" />
      </div>
    );
  }

  // Fallback minimalist monogram
  return (
    <div
      style={{ width: size, height: size }}
      className={`flex items-center justify-center rounded-md bg-[var(--soft)] text-[var(--ink)] font-mono text-xs font-semibold ${className}`}
    >
      {(name || 'TK').slice(0, 2).toUpperCase()}
    </div>
  );
};
