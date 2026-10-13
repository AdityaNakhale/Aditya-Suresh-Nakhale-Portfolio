import React, { useState } from 'react';
import { PROJECTS, ProjectItem } from '@/src/lib/data';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { TechLogo } from '@/src/components/ui/TechLogo';

export const WorkSection: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" className="section-padding relative">
      <div className="site-container">
        <SectionHeader
          tagIndex="03"
          tagLabel="Selected Work"
          titlePrefix="Production platforms"
          italicWord="built to scale."
          subtitle="Full-stack systems engineered with Java, Spring Boot, Node.js, and relational databases."
        />

        {/* Desktop Expanding Horizontal Accordion / Mobile Vertical Accordion */}
        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[min(78svh,620px)] w-full">
          {PROJECTS.map((project) => {
            const isOpen = activeProjectId === project.id;

            return (
              <div
                key={project.id}
                tabIndex={0}
                role="region"
                aria-expanded={isOpen}
                aria-label={`Project: ${project.title}`}
                onClick={() => setActiveProjectId(project.id)}
                onFocus={() => setActiveProjectId(project.id)}
                className={`relative rounded-[28px] border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--ink)] ${
                  isOpen
                    ? 'flex-[8] bg-[var(--card)] border-[var(--line-strong)] shadow-xl'
                    : 'flex-[1] bg-[var(--soft)]/60 border-[var(--line)] hover:bg-[var(--card)] hover:border-[var(--line-strong)]'
                }`}
              >
                {/* Slim Folded Spine (visible when not open on desktop) */}
                {!isOpen ? (
                  <div className="h-full w-full p-6 flex md:flex-col justify-between items-center select-none">
                    <span className="font-mono text-sm font-bold text-[var(--mute)]">
                      {project.index}
                    </span>

                    {/* Vertical text on desktop */}
                    <div className="md:[writing-mode:vertical-rl] md:rotate-180 text-base font-bold font-sans-tight text-[var(--ink)] tracking-tight truncate max-w-[200px] md:max-w-[320px]">
                      {project.title}
                    </div>

                    {/* Rotating '+' button */}
                    <div className="w-8 h-8 rounded-full border border-[var(--line-strong)] flex items-center justify-center font-mono text-sm font-bold text-[var(--ink)] transition-transform duration-300 group-hover:rotate-90">
                      +
                    </div>
                  </div>
                ) : (
                  /* Open Full Panel: Left Info & Right Illustrative UI */
                  <div className="h-full w-full p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row gap-8 justify-between overflow-y-auto lg:overflow-hidden">
                    {/* Left Column: Details */}
                    <div className="flex-1 flex flex-col justify-between max-w-xl">
                      <div>
                        {/* Number + kicker */}
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[var(--soft)] text-[var(--ink)]">
                            {project.index}
                          </span>
                          <span className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider">
                            {project.kicker}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-sans-tight text-[var(--ink)] tracking-tight mb-4">
                          {project.title}
                        </h3>

                        {/* Description verbatim from resume */}
                        <p className="text-sm sm:text-base text-[var(--ink-2)] leading-relaxed mb-6 font-normal">
                          {project.description}
                        </p>

                        {/* 2-Column Feature List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                          {project.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-[var(--paper)]/80 border border-[var(--line)] text-xs text-[var(--ink-2)] leading-relaxed flex items-start gap-2"
                            >
                              <span className="font-mono text-[10px] text-[var(--mute)] mt-0.5">
                                0{idx + 1}
                              </span>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom: Tech Chips & GitHub Button */}
                      <div className="pt-4 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-md bg-[var(--paper)] border border-[var(--line)] font-mono text-[11px] text-[var(--ink-2)] flex items-center gap-1.5"
                            >
                              <span>{t}</span>
                            </span>
                          ))}
                        </div>

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--paper)] text-xs font-medium tracking-tight shadow-xs hover:bg-[var(--ink-2)] active:scale-95 transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>View on GitHub</span>
                            <span>↗</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Illustrative Mini UI (Grayscale, pure CSS/JSX) */}
                    <div className="flex-1 w-full flex flex-col justify-center items-center">
                      <div className="relative w-full max-w-md bg-[var(--paper)] rounded-2xl border border-[var(--line-strong)] p-4 sm:p-5 shadow-inner">
                        {/* Header bar */}
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--line)]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ccc]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ccc]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ccc]" />
                          </div>
                          <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--mute)] bg-[var(--card)] px-2 py-0.5 rounded border border-[var(--line)]">
                            Illustrative UI
                          </span>
                        </div>

                        {/* Interactive UI Mock for Food Rescue AI */}
                        {project.id === 'food-rescue-ai' ? (
                          <div className="space-y-3 font-mono text-xs">
                            <div className="p-3 bg-[var(--card)] rounded-xl border border-[var(--line)] shadow-2xs">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-[var(--ink)]">Donation Match #409</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--soft)] text-[var(--ink)] font-semibold">
                                  Rescued ✓
                                </span>
                              </div>
                              <p className="text-[11px] text-[var(--mute)]">
                                Proximity: 1.8 km · Google Distance Matrix API
                              </p>
                              {/* 4-Stage Lifecycle Stepper */}
                              <div className="grid grid-cols-4 gap-1 mt-3 text-[9px] text-center">
                                <div className="p-1 rounded bg-[var(--ink)] text-[var(--paper)] font-medium">Pending</div>
                                <div className="p-1 rounded bg-[var(--ink)] text-[var(--paper)] font-medium">Allocated</div>
                                <div className="p-1 rounded bg-[var(--ink)] text-[var(--paper)] font-medium">Claimed</div>
                                <div className="p-1 rounded bg-[var(--ink)] text-[var(--paper)] font-medium">Rescued</div>
                              </div>
                            </div>

                            <div className="p-3 bg-[var(--card)] rounded-xl border border-[var(--line)] flex items-center justify-between">
                              <div>
                                <span className="text-[10px] text-[var(--mute)] block">NGO Capacity Match</span>
                                <span className="font-bold text-sm text-[var(--ink)]">Shelter Hope (98%)</span>
                              </div>
                              <span className="text-xl font-bold font-sans text-[var(--ink)]">0.4 km</span>
                            </div>
                          </div>
                        ) : (
                          /* Interactive UI Mock for Career Portfolio Generator */
                          <div className="space-y-3 font-mono text-xs">
                            <div className="p-3 bg-[var(--card)] rounded-xl border border-[var(--line)] shadow-2xs">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-[var(--ink)]">Student Portfolio Form</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--soft)] text-[var(--ink)] font-semibold">
                                  MVC Pattern
                                </span>
                              </div>
                              <div className="space-y-1.5 text-[11px]">
                                <div className="p-1.5 rounded bg-[var(--paper)] border border-[var(--line)] flex justify-between">
                                  <span className="text-[var(--mute)]">Input: Degree & Skills</span>
                                  <span className="text-[var(--ink)]">Parsed ✓</span>
                                </div>
                                <div className="p-1.5 rounded bg-[var(--paper)] border border-[var(--line)] flex justify-between">
                                  <span className="text-[var(--mute)]">Controller: Servlet Pipeline</span>
                                  <span className="text-[var(--ink)]">Rendered ✓</span>
                                </div>
                              </div>
                            </div>

                            <div className="p-3 bg-[var(--card)] rounded-xl border border-[var(--line)]">
                              <span className="text-[10px] text-[var(--mute)] block">Live Portfolio Output</span>
                              <span className="font-bold text-xs text-[var(--ink)]">student-portfolio.internal/asn-preview</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
