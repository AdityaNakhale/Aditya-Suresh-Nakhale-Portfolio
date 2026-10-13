import React from 'react';
import { CERTIFICATIONS } from '@/src/lib/data';

export const CertificationsSection: React.FC = () => {
  return (
    <section
      id="certifications"
      className="bg-[var(--card)] border-y border-[var(--line)] py-20 md:py-28 my-12 transition-colors duration-300"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
          {/* Left Column: Sticky heading & count line */}
          <div className="lg:sticky lg:top-28">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] block mb-2">
              04 — Certifications & Programs
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans-tight text-[var(--ink)] tracking-tight leading-[1.02]">
              Always{' '}
              <span className="font-serif-italic font-normal lowercase tracking-normal text-[var(--mute)]">
                learning.
              </span>
            </h2>
            <p className="mt-4 font-mono text-xs text-[var(--mute)]">
              [ 0{CERTIFICATIONS.length} accredited program ]
            </p>
          </div>

          {/* Right Column: Numbered list with Ink-Flood Hover (scaleX 0->1) */}
          <div className="space-y-4">
            {CERTIFICATIONS.map((cert) => (
              <a
                key={cert.id}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block p-6 sm:p-8 rounded-2xl border border-[var(--line)] bg-[var(--paper)]/50 overflow-hidden transition-colors duration-400 focus:outline-none focus:ring-2 focus:ring-[var(--ink)]"
              >
                {/* Ink Flood Underlay from left to right */}
                <div
                  className="absolute inset-0 bg-[var(--ink)] origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
                  aria-hidden="true"
                />

                {/* Row Content (Turns white on hover) */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-6">
                    <span className="font-mono text-sm sm:text-base font-bold text-[var(--mute)] group-hover:text-white/60 transition-colors duration-300">
                      {cert.index}
                    </span>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-sans-tight text-[var(--ink)] group-hover:text-white transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <p className="font-mono text-xs text-[var(--mute)] group-hover:text-white/80 transition-colors duration-300 mt-1">
                        Issuer: {cert.issuer}
                      </p>
                      <p className="font-mono text-[11px] text-[var(--ink-2)] group-hover:text-white/70 transition-colors duration-300 underline mt-0.5">
                        {cert.linkText}
                      </p>
                    </div>
                  </div>

                  {/* Sliding ↗ Arrow */}
                  <div className="flex items-center gap-2 text-sm font-mono text-[var(--ink)] group-hover:text-white transition-colors duration-300 self-end sm:self-center">
                    <span className="hidden sm:inline-block text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Verify Profile
                    </span>
                    <span className="transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300 text-lg">
                      ↗
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
