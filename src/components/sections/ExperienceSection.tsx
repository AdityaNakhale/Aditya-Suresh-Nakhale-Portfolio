import React, { useRef, useState, useEffect } from 'react';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { scrollToTarget } from '@/src/lib/scroll';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  place: string;
  type: 'Education' | 'Experience';
  badge: string;
  details: string[];
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'ssc',
    year: '2019 – 2020',
    title: '10th Board (SSC)',
    place: 'Nandgaon High School · Nandgaon Khandeshwar, India',
    type: 'Education',
    badge: 'Score: 73.40%',
    details: ['Secondary School Certificate examination with strong foundation in mathematics and sciences.'],
  },
  {
    id: 'hsc',
    year: '2021 – 2022',
    title: '12th Board (HSC)',
    place: 'Nandgaon High School and Junior College · Nandgaon Khandeshwar, India',
    type: 'Education',
    badge: 'Score: 63.33%',
    details: ['Higher Secondary Certificate examination covering computing, physics, and chemistry.'],
  },
  {
    id: 'bca',
    year: '2023 – 2026',
    title: 'Bachelor of Computer Applications (BCA)',
    place: 'Sant Gadge Baba Amravati University · Amravati, India',
    type: 'Education',
    badge: 'CGPA: 6.5 / 10',
    details: [
      'Comprehensive study in Object-Oriented Programming, Data Structures, Relational Database Management Systems, and Web Engineering.',
    ],
  },
  {
    id: 'internship',
    year: 'Jun 2025 – Sep 2025',
    title: 'Backend Developer Intern',
    place: 'JK Innovative Pvt. Ltd.',
    type: 'Experience',
    badge: 'Live Production',
    details: [
      'Built a REST API in Node.js integrated with PostgreSQL, supporting ~100 user requests per day for a live Career Portfolio Generator platform.',
      'Designed a Prisma ORM data access layer that cut database query latency by 30%, improving overall application performance.',
      'Delivered a Next.js frontend with a Nest.js backend serving 1,000+ users at 99.9% uptime and ~200ms average response time.',
      'Implemented MVC architecture and integrated a MySQL database for core application logic.',
      'Collaborated with a 5-person team to integrate Dropbox APIs for file sharing and storage across 500+ users, maintaining data consistency and security.',
      'Used Git for version control, averaging 20+ commits per week and resolving merge conflicts to keep delivery on schedule.',
    ],
  },
];

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startOffset = windowHeight * 0.75;
      const totalDistance = rect.height;
      const currentScroll = startOffset - rect.top;

      const progress = Math.min(1, Math.max(0, currentScroll / totalDistance));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-padding relative">
      <div className="site-container">
        <SectionHeader
          tagIndex="05"
          tagLabel="Path & Experience"
          titlePrefix="Education and experience"
          italicWord="as one path."
          subtitle="A continuous trajectory from academic foundations to high-throughput production systems."
        />

        {/* Timeline with drawing spine */}
        <div className="relative pl-8 sm:pl-12 max-w-3xl mx-auto">
          {/* Static gray track background */}
          <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-12 w-[2px] bg-[var(--line)]" />

          {/* Dynamic spine that fills as you scroll */}
          <div
            className="absolute left-[11px] sm:left-[19px] top-4 w-[2px] bg-[var(--ink)] origin-top transition-all duration-150 ease-out"
            style={{
              height: `calc(100% - 48px)`,
              transform: `scaleY(${scrollProgress})`,
            }}
          />

          {/* Timeline stops */}
          <div className="space-y-12 sm:space-y-16">
            {TIMELINE_EVENTS.map((event, index) => {
              const itemThreshold = (index + 0.3) / TIMELINE_EVENTS.length;
              const isLit = scrollProgress >= itemThreshold;

              return (
                <div key={event.id} className="relative group">
                  {/* Spine Node / Dot */}
                  <div
                    className={`absolute -left-[27px] sm:-left-[35px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-400 ${
                      isLit
                        ? 'bg-[var(--ink)] border-[var(--paper)] ring-4 ring-[var(--ink)]/15 scale-110'
                        : 'bg-[var(--card)] border-[var(--mute)]'
                    }`}
                  />

                  {/* Card Content */}
                  <div
                    className={`p-6 sm:p-8 rounded-2xl border transition-all duration-400 ${
                      isLit
                        ? 'bg-[var(--card)] border-[var(--line-strong)] shadow-md'
                        : 'bg-[var(--card)]/60 border-[var(--line)] opacity-85'
                    }`}
                  >
                    {/* Header: Year + Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-[var(--ink)] bg-[var(--paper)] px-2.5 py-0.5 rounded-md border border-[var(--line)]">
                        {event.year}
                      </span>
                      <span className="font-mono text-xs text-[var(--mute)]">
                        {event.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold font-sans-tight text-[var(--ink)] tracking-tight">
                      {event.title}
                    </h3>

                    {/* Place */}
                    <p className="font-mono text-xs text-[var(--mute)] mt-1 mb-4">
                      {event.place}
                    </p>

                    {/* Bullets */}
                    <div className="space-y-2 pt-2 border-t border-[var(--line)]">
                      {event.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed font-normal"
                        >
                          • {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Ending Dashed Card: "Next — Your team?" */}
            <div className="relative group">
              <div className="absolute -left-[27px] sm:-left-[35px] top-6 w-4 h-4 rounded-full border-2 border-dashed border-[var(--ink)] bg-[var(--paper)]" />

              <div className="p-8 rounded-2xl border-2 border-dashed border-[var(--line-strong)] bg-[var(--card)]/40 hover:bg-[var(--card)] transition-all duration-300">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] block mb-1">
                  The Future
                </span>
                <h3 className="text-2xl font-bold font-sans-tight text-[var(--ink)] mb-2">
                  Next — Your team?
                </h3>
                <p className="text-sm text-[var(--ink-2)] leading-relaxed mb-4">
                  Seeking to grow into a full-time software engineering career through Google's Software Application Development Apprenticeship, contributing to production codebases while learning from experienced engineering teams.
                </p>
                <button
                  onClick={() => scrollToTarget('#contact')}
                  className="px-5 py-2 rounded-full bg-[var(--ink)] text-[var(--paper)] text-xs font-medium tracking-tight shadow-xs hover:bg-[var(--ink-2)] active:scale-95 transition-all"
                >
                  Start a conversation →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
