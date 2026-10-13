import React, { useState } from 'react';
import { PROFILE } from '@/src/lib/data';

// Letter Hop Component
const HoppingText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <span className="inline-block">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-transform duration-200 hover:-translate-y-2 hover:text-[var(--ink-2)]"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <footer id="contact" className="section-padding relative bg-[var(--paper)] pt-24 pb-12 border-t border-[var(--line)]">
      <div className="site-container">
        {/* Top Tag & Spinning Circular Badge */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] font-medium">
              07 — Get in touch
            </span>
          </div>

          {/* Circular "Say Hello" badge spinning slowly */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <svg
              className="w-full h-full animate-spin [animation-duration:16s] origin-center text-[var(--ink)]"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                />
              </defs>
              <text fontSize="8.5" letterSpacing="2.5" fill="currentColor" fontWeight="600">
                <textPath href="#circlePath">
                  SAY HELLO · GET IN TOUCH · SAY HELLO ·
                </textPath>
              </text>
            </svg>
            <div className="absolute w-3 h-3 rounded-full bg-[var(--ink)]" />
          </div>
        </div>

        {/* Huge Interactive Heading with Hopping Letters */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-sans-tight text-[var(--ink)] tracking-[-0.045em] leading-[0.98]">
            <HoppingText text="Let's build" />
            <br />
            <span className="font-serif-italic font-normal text-[var(--mute)]">
              <HoppingText text="something together." />
            </span>
          </h2>
        </div>

        {/* Large Underlined Email + Copy Chip */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-sans-tight text-[var(--ink)] underline underline-offset-8 hover:text-[var(--ink-2)] transition-colors break-all"
            >
              {PROFILE.email}
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-4 py-2 rounded-full border border-[var(--line-strong)] bg-[var(--card)] text-xs font-mono font-medium text-[var(--ink)] hover:bg-[var(--soft)] active:scale-95 transition-all shadow-xs"
              aria-label="Copy email address to clipboard"
            >
              <span aria-live="polite">
                {copied ? 'Copied ✓' : 'Copy Email'}
              </span>
            </button>
          </div>
        </div>

        {/* Channels Grid: Phone, GitHub, LinkedIn */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[var(--line)] mb-16 font-mono text-xs">
          <div>
            <span className="text-[var(--mute)] block mb-1">Direct Phone</span>
            <a
              href={PROFILE.phoneHref}
              className="font-medium text-sm text-[var(--ink)] hover:underline"
            >
              {PROFILE.phone}
            </a>
          </div>

          <div>
            <span className="text-[var(--mute)] block mb-1">GitHub</span>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm text-[var(--ink)] hover:underline inline-flex items-center gap-1"
            >
              <span>{PROFILE.githubHandle}</span>
              <span>↗</span>
            </a>
          </div>

          <div>
            <span className="text-[var(--mute)] block mb-1">LinkedIn</span>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm text-[var(--ink)] hover:underline inline-flex items-center gap-1"
            >
              <span>{PROFILE.linkedinHandle}</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--mute)]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[var(--ink)] transition-colors flex items-center gap-1 font-medium"
            >
              <span>Back to top</span>
              <span>↑</span>
            </button>
            <span className="text-[var(--faint)]">·</span>
            <span>Built with Next.js & React 19</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
