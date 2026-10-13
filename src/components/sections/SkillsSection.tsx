import React, { useState } from 'react';
import { SKILLS, SkillItem } from '@/src/lib/data';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { TechLogo, isBrand } from '@/src/components/ui/TechLogo';

const FAMILIES = [
  'All',
  'Languages',
  'Backend & Web',
  'Databases & ORM',
  'Concepts',
  'Tools',
  'Soft Skills',
] as const;

export const SkillsSection: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILLS[0]);

  return (
    <section id="skills" className="section-padding relative">
      <div className="site-container">
        <SectionHeader
          tagIndex="02"
          tagLabel="Skills"
          titlePrefix="The periodic table of"
          italicWord="my stack."
          subtitle="Every language, framework, database, and engineering discipline extracted directly from production work."
        />

        {/* Family filter chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8 rv">
          {FAMILIES.map((family) => {
            const isSelected = selectedFamily === family;
            return (
              <button
                key={family}
                onClick={() => setSelectedFamily(family)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 ${
                  isSelected
                    ? 'bg-[var(--ink)] text-[var(--paper)] shadow-xs'
                    : 'bg-[var(--card)]/80 border border-[var(--line)] text-[var(--ink-2)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'
                }`}
                aria-pressed={isSelected}
              >
                {family}
              </button>
            );
          })}
        </div>

        {/* Grid + Sticky Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Periodic Table Grid (8 columns desktop, 4 columns mobile) */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 sm:gap-3">
            {SKILLS.map((skill, index) => {
              const row = Math.floor(index / 8);
              const col = index % 8;
              const delayMs = (row + col) * 40;
              const matchesFilter = selectedFamily === 'All' || skill.family === selectedFamily;
              const isActive = activeSkill.atomicNumber === skill.atomicNumber;

              return (
                <button
                  key={skill.atomicNumber}
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onFocus={() => setActiveSkill(skill)}
                  className={`group relative aspect-square p-2 rounded-xl flex flex-col justify-between text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--ink)] ${
                    matchesFilter ? 'opacity-100 scale-100' : 'opacity-25 grayscale scale-95'
                  } ${
                    isActive
                      ? 'bg-[var(--ink)] text-[var(--paper)] shadow-lg ring-1 ring-[var(--ink)]'
                      : 'bg-[var(--card)] border border-[var(--line)] hover:border-[var(--line-strong)] hover:shadow-md'
                  }`}
                  style={{
                    transitionDelay: `${delayMs}ms`,
                  }}
                  aria-label={`${skill.name}, ${skill.family}`}
                >
                  {/* Top: Atomic Number & Mini Logo */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`font-mono text-[9px] font-semibold ${
                        isActive ? 'text-white/70' : 'text-[var(--mute)]'
                      }`}
                    >
                      {skill.atomicNumber}
                    </span>
                    <TechLogo
                      brandKey={skill.brandKey}
                      conceptKey={skill.conceptKey}
                      name={skill.name}
                      size={12}
                      className={isActive ? 'brightness-125' : ''}
                    />
                  </div>

                  {/* Center: 2-letter Symbol */}
                  <div className="text-center my-auto">
                    <span
                      className={`font-mono text-lg sm:text-xl font-bold tracking-tight block group-hover:scale-105 transition-transform ${
                        isActive ? 'text-white' : 'text-[var(--ink)]'
                      }`}
                    >
                      {skill.symbol}
                    </span>
                  </div>

                  {/* Bottom: Skill Name */}
                  <div className="w-full overflow-hidden">
                    <span
                      className={`block font-sans text-[10px] sm:text-[11px] font-medium truncate ${
                        isActive ? 'text-white/90' : 'text-[var(--ink-2)]'
                      }`}
                    >
                      {skill.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px wide) */}
          <aside className="sticky top-24 rounded-[26px] bg-[var(--card)] border border-[var(--line)] p-6 shadow-md transition-all duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--mute)]">
                Element Inspector
              </span>
              <span className="font-mono text-xs font-bold text-[var(--ink)]">
                #{activeSkill.atomicNumber}
              </span>
            </div>

            {/* 150px Brand Logo with Pop Animation + Soft Brand Glow */}
            <div className="relative my-6 flex flex-col items-center justify-center min-h-[170px]">
              {/* Soft glow circle behind logo */}
              <div
                className="absolute w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
                style={{
                  backgroundColor: isBrand(activeSkill.brandKey) ? '#4285f4' : '#121214',
                }}
              />

              <div className="relative transform transition-transform duration-300 scale-100 hover:scale-105">
                <TechLogo
                  brandKey={activeSkill.brandKey}
                  conceptKey={activeSkill.conceptKey}
                  name={activeSkill.name}
                  size={120}
                  className="transition-all duration-300 drop-shadow-sm"
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div>
                <span className="font-mono text-[10px] text-[var(--mute)] uppercase tracking-wider block">
                  Skill Name
                </span>
                <h4 className="text-xl font-bold font-sans-tight text-[var(--ink)]">
                  {activeSkill.name}
                </h4>
              </div>

              <div>
                <span className="font-mono text-[10px] text-[var(--mute)] uppercase tracking-wider block">
                  Category / Family
                </span>
                <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-[var(--soft)] text-xs font-mono text-[var(--ink)]">
                  {activeSkill.family}
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] text-[var(--mute)] uppercase tracking-wider block">
                  Applied in Projects
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {activeSkill.projects.map((proj, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-md border border-[var(--line)] bg-[var(--paper)] text-[var(--ink-2)] font-mono"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
