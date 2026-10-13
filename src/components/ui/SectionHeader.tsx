import React from 'react';

interface SectionHeaderProps {
  tagIndex: string;
  tagLabel: string;
  titlePrefix: string;
  italicWord: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tagIndex,
  tagLabel,
  titlePrefix,
  italicWord,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      {/* Section mono tag */}
      <div className="flex items-center gap-2 mb-3 rv" style={{ '--i': 0 } as React.CSSProperties}>
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] font-medium">
          {tagIndex} — {tagLabel}
        </span>
      </div>

      {/* Main heading with tight tracking & one italic accent word */}
      <h2
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-sans-tight text-[var(--ink)] tracking-[-0.045em] leading-[1.02] rv"
        style={{ '--i': 1 } as React.CSSProperties}
      >
        {titlePrefix}{' '}
        <span className="font-serif-italic font-normal lowercase tracking-normal text-[var(--mute)]">
          {italicWord}
        </span>
      </h2>

      {subtitle && (
        <p
          className="mt-4 text-base sm:text-lg text-[var(--mute)] max-w-2xl rv font-normal leading-relaxed"
          style={{ '--i': 2 } as React.CSSProperties}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
