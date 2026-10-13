import React, { useState, useRef, useEffect } from 'react';
import { PROFILE, EDUCATION, EXPERIENCE } from '@/src/lib/data';
import { SectionHeader } from '@/src/components/ui/SectionHeader';

export const AboutSection: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const angleRef = useRef(0);
  const velRef = useRef(0);

  // Pendulum swing reaction to pointer movement with spring damping & idle sway
  useEffect(() => {
    let animId: number;
    let time = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dist = (e.clientX - centerX) / (rect.width / 2);
      // apply impulse to velocity
      velRef.current += dist * 1.8;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const loop = () => {
      time += 0.02;
      // Spring force returning to center (plus subtle idle sway)
      const idle = Math.sin(time) * 1.5;
      const springForce = (idle - angleRef.current) * 0.05;
      velRef.current += springForce;
      velRef.current *= 0.92; // Damping
      angleRef.current += velRef.current;

      // Clamp angle
      const clamped = Math.max(-14, Math.min(14, angleRef.current));
      setSwingAngle(clamped);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <section id="about" className="section-padding relative">
      <div className="site-container">
        <SectionHeader
          tagIndex="01"
          tagLabel="About"
          titlePrefix="Engineering behind"
          italicWord="the craft."
        />

        {/* Three-column grid: minmax(0,1fr) 320px minmax(0,1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 items-stretch">
          {/* Left Column: Bio & Verbatim Resume Summary */}
          <div className="flex flex-col justify-between p-8 rounded-[26px] bg-[var(--card)] border border-[var(--line)] shadow-sm rv">
            <div>
              <span className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider block mb-2">
                Introduction
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans-tight text-[var(--ink)] tracking-tight mb-4">
                Hi, I'm {PROFILE.name.split(' ')[0]}.
              </h3>
              <p className="text-sm sm:text-base text-[var(--ink-2)] leading-relaxed font-normal mb-4">
                {PROFILE.resumeSummary}
              </p>
              <p className="text-xs sm:text-sm font-mono text-[var(--mute)] leading-relaxed">
                Comfortable across Java, JavaScript, and SQL, with strong fundamentals in OOP and MVC architecture.
              </p>
            </div>

            {/* Resume / Social Links from resume */}
            <div className="flex flex-wrap items-center gap-2.5 pt-6 mt-6 border-t border-[var(--line)]">
              <a
                href={PROFILE.resumePath}
                download="Aditya_Suresh_Nakhale_Resume.pdf"
                className="px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--paper)] text-xs font-medium tracking-tight hover:bg-[var(--ink-2)] active:scale-95 transition-all shadow-xs"
              >
                Résumé ↓
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-[var(--line-strong)] text-[var(--ink)] text-xs font-medium tracking-tight hover:bg-[var(--soft)] active:scale-95 transition-all"
              >
                GitHub ↗
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-[var(--line-strong)] text-[var(--ink)] text-xs font-medium tracking-tight hover:bg-[var(--soft)] active:scale-95 transition-all"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Centre Column: Hanging Lanyard ID Card */}
          <div
            ref={containerRef}
            className="flex flex-col items-center justify-start min-h-[480px] select-none rv"
            style={{ '--i': 1 } as React.CSSProperties}
          >
            {/* Lanyard Top Attachment & Strap */}
            <div className="relative flex flex-col items-center z-20">
              {/* Ceiling anchor bolt */}
              <div className="w-5 h-2 bg-[#2c2c2e] rounded-t-sm shadow-xs" />

              {/* Lanyard Strap: 30x56 px with scrolling text */}
              <div className="w-[30px] h-[56px] bg-[#1a1a1c] relative overflow-hidden flex flex-col items-center justify-center border-x border-[#333]">
                <div
                  className="font-mono text-[8px] uppercase tracking-widest text-[#aaa] whitespace-nowrap rotate-90 select-none animate-marquee"
                >
                  {PROFILE.name.toUpperCase()} · DEVELOPER
                </div>
              </div>

              {/* Metal Carabiner Clip */}
              <div className="w-5 h-7 bg-gradient-to-b from-[#b0b0b4] to-[#78787c] rounded-b-md shadow-sm border border-[#555] flex items-center justify-center -mt-0.5">
                <div className="w-2.5 h-1.5 rounded-full bg-[#3a3a3e]" />
              </div>
            </div>

            {/* ID Card Wrapper with Pendulum Swing transform */}
            <div
              style={{
                transform: `rotate(${swingAngle}deg)`,
                transformOrigin: 'top center',
                transition: 'transform 0.08s linear',
              }}
              className="mt-1"
            >
              {/* 3D Flip Card Container: 300x404 px */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Developer ID Card. Press enter or click to flip between front and back."
                onClick={() => setIsFlipped(!isFlipped)}
                onKeyDown={handleCardKeyDown}
                className="w-[300px] h-[404px] cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--ink)] rounded-[20px]"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative w-full h-full rounded-[20px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* FRONT OF ID CARD */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-[20px] bg-[var(--card)] p-5 flex flex-col justify-between border border-[var(--line-strong)] shadow-[0_16px_36px_rgba(0,0,0,0.1)] overflow-hidden transition-colors duration-300"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Top Punch Hole */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-[var(--paper)] border border-[rgba(0,0,0,0.1)]" />

                    {/* Top Black Band */}
                    <div className="bg-[var(--ink)] text-[var(--paper)] py-1.5 px-3 rounded-md text-center mt-3">
                      <span className="font-mono text-[10px] tracking-widest font-bold uppercase">
                        DEVELOPER ID
                      </span>
                    </div>

                    {/* Portrait Photo with Gradient Ring & Soft Halo */}
                    <div className="flex flex-col items-center my-auto">
                      <div className="relative w-[128px] h-[156px] rounded-xl p-[2px] bg-gradient-to-b from-[#e5e5e5] via-[#a3a3a3] to-[#e5e5e5] shadow-md group-hover:scale-102 transition-transform duration-300">
                        <img
                          src={`${import.meta.env.BASE_URL}portrait-bust.png?v=2`}
                          onError={(e) => {
                            const img = e.currentTarget;
                            if (!img.dataset.triedWebp) {
                              img.dataset.triedWebp = 'true';
                              img.src = `${import.meta.env.BASE_URL}portrait-bust.webp?v=2`;
                            }
                          }}
                          alt="Aditya Suresh Nakhale Portrait"
                          className="w-full h-full object-cover rounded-[10px] bg-[var(--paper)]"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="mt-2.5 font-bold font-sans-tight text-base text-[var(--ink)] tracking-tight">
                        {PROFILE.name}
                      </h4>
                      <p className="text-xs font-mono text-[var(--mute)]">
                        {PROFILE.role}
                      </p>
                    </div>

                    {/* Card Data Rows */}
                    <div className="grid grid-cols-3 gap-1 pt-2 border-t border-[var(--line)] text-center font-mono text-[9px]">
                      <div>
                        <span className="text-[var(--mute)] block">ID NO.</span>
                        <span className="font-semibold text-[var(--ink)]">{PROFILE.idNumber}</span>
                      </div>
                      <div>
                        <span className="text-[var(--mute)] block">DEPT</span>
                        <span className="font-semibold text-[var(--ink)]">ENGINEERING</span>
                      </div>
                      <div>
                        <span className="text-[var(--mute)] block">VALID TILL</span>
                        <span className="font-semibold text-[var(--ink)]">{PROFILE.validTill}</span>
                      </div>
                    </div>

                    {/* Bottom Barcode & Holographic Sticker */}
                    <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]">
                      {/* Barcode bars */}
                      <div className="flex items-center gap-[1.5px] h-6 w-32" aria-hidden="true">
                        {[4, 2, 6, 2, 4, 3, 5, 2, 7, 2, 3, 5, 2, 4, 2, 6, 3, 2, 5, 2, 4, 3, 2].map(
                          (h, i) => (
                            <div
                              key={i}
                              className="bg-[var(--ink)] rounded-xs"
                              style={{ width: `${(i % 3) + 1}px`, height: `${h * 3.5}px` }}
                            />
                          )
                        )}
                      </div>

                      {/* Holographic sticker in grays */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#999] via-[#eee] to-[#bbb] flex items-center justify-center border border-[#888] shadow-inner">
                        <span className="font-mono text-[7px] text-[#222] font-bold">ASN</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK OF ID CARD */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-[20px] bg-[#121214] text-[#ecebe8] p-5 flex flex-col justify-between border border-[#333] shadow-[0_16px_36px_rgba(0,0,0,0.18)] overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-[#888] mb-3">
                        CREDENTIALS · WHAT I AM
                      </div>

                      <div className="space-y-2 font-mono text-xs">
                        <div className="text-white font-medium">
                          • {PROFILE.role} & Backend Specialist
                        </div>
                        <div className="text-[#bbb]">
                          • {EDUCATION[0].degree} ({EDUCATION[0].score})
                        </div>
                        <div className="text-[#bbb]">
                          • Production: 1,000+ Users @ 99.9% Uptime
                        </div>
                        <div className="text-[#bbb]">
                          • Projects: Food Rescue AI, Career Generator
                        </div>
                        <div className="text-[#bbb]">
                          • Winner: 1st Prize College Coding Competition
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#333] space-y-2">
                      <div className="font-serif italic text-sm text-[#ddd]">
                        Aditya Suresh Nakhale
                      </div>
                      <div className="font-mono text-[9px] text-[#888]">
                        If found, say hello · {PROFILE.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[10px] font-mono text-center text-[var(--mute)] mt-3">
                Tap, hover or press Enter to flip card
              </p>
            </div>
          </div>

          {/* Right Column: Quick Facts & Paraphrased Quote */}
          <div className="flex flex-col justify-between p-8 rounded-[26px] bg-[var(--card)] border border-[var(--line)] shadow-sm rv" style={{ '--i': 2 } as React.CSSProperties}>
            <div>
              <span className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider block mb-2">
                At a Glance
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-sans-tight text-[var(--ink)] tracking-tight mb-6">
                Quick Facts.
              </h3>

              <div className="space-y-4">
                <div className="pb-3 border-b border-[var(--line)]">
                  <span className="font-mono text-xs text-[var(--mute)] block">Location</span>
                  <span className="text-sm font-medium text-[var(--ink)]">{PROFILE.location}</span>
                </div>

                <div className="pb-3 border-b border-[var(--line)]">
                  <span className="font-mono text-xs text-[var(--mute)] block">Education</span>
                  <span className="text-sm font-medium text-[var(--ink)]">
                    {EDUCATION[0].degree} — {EDUCATION[0].institution}
                  </span>
                  <span className="text-xs font-mono text-[var(--mute)] block">
                    {EDUCATION[0].score}
                  </span>
                </div>

                <div className="pb-3 border-b border-[var(--line)]">
                  <span className="font-mono text-xs text-[var(--mute)] block">Internship</span>
                  <span className="text-sm font-medium text-[var(--ink)]">
                    {EXPERIENCE[0].role} — {EXPERIENCE[0].company}
                  </span>
                  <span className="text-xs font-mono text-[var(--mute)] block">
                    {EXPERIENCE[0].period}
                  </span>
                </div>

                <div className="pb-3">
                  <span className="font-mono text-xs text-[var(--mute)] block">Email</span>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-sm font-medium text-[var(--ink)] hover:underline"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quote paraphrased strictly from resume text */}
            <div className="pt-6 mt-6 border-t border-[var(--line)] bg-[var(--paper)]/60 p-4 rounded-xl">
              <p className="font-serif italic text-sm text-[var(--ink-2)] leading-relaxed">
                "{PROFILE.quote}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
