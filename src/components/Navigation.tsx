import React, { useEffect, useState } from 'react';
import { NAV, PROFILE } from '@/src/lib/data';
import { scrollToTarget } from '@/src/lib/scroll';
import { useScrollProgress } from '@/src/lib/hooks';
import { useTheme } from '@/src/lib/theme';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const { theme, toggleTheme, isDark } = useTheme();

  // Scroll detection for 40px threshold
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section with IntersectionObserver rootMargin -45% 0px -50% 0px
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    NAV.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollToTarget(`#${id}`);
  };

  return (
    <>
      {/* 2px ink scroll-progress bar along the very top */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--ink)] z-50 origin-left transition-transform duration-75 pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Main Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 py-4 transition-all duration-300">
        <div className="site-container flex items-center justify-between">
          {/* Left Brand: Initials + Full Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-500 hover:rotate-360 ${
                scrolled
                  ? 'bg-[var(--ink)] text-[var(--paper)] shadow-md'
                  : 'bg-transparent border border-[var(--ink)] text-[var(--ink)]'
              }`}
              title="Aditya Suresh Nakhale — Back to top"
              aria-label="Back to top"
            >
              AN
            </button>
            <span
              className={`font-medium text-sm tracking-tight text-[var(--ink)] transition-opacity duration-300 hidden sm:inline-block ${
                scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              {PROFILE.name}
            </span>
          </div>

          {/* Right Group: Desktop Nav Links Pill + Theme Toggle Switch */}
          <div className="flex items-center gap-3">
            {/* Desktop Nav Links Pill */}
            <nav
              aria-label="Main Navigation"
              className={`hidden md:flex items-center gap-1 p-1.5 rounded-full mr-1 transition-all duration-400 ${
                scrolled
                  ? 'bg-[var(--card)]/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[var(--line)]'
                  : 'bg-transparent'
              }`}
            >
              {NAV.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-1.5 text-xs font-medium tracking-tight rounded-full transition-all duration-200 z-10 ${
                      isActive ? 'text-[var(--paper)]' : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                    }`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {/* Sliding solid ink indicator pill */}
                    {isActive && (
                      <span
                        className="absolute inset-0 bg-[var(--ink)] rounded-full -z-10 shadow-sm"
                        style={{ transition: 'all 0.3s var(--ease)' }}
                      />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Dark Mode / Light Mode Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-[var(--line-strong)] bg-[var(--card)]/80 backdrop-blur-md flex items-center justify-center text-[var(--ink)] shadow-2xs hover:scale-105 active:scale-95 transition-all"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                // Sun Icon (Gold)
                <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" fill="currentColor" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                // Moon Icon (Dark Ink)
                <svg className="w-4 h-4 text-[var(--ink)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="px-4 py-1.5 rounded-full border border-[var(--line-strong)] bg-[var(--card)]/70 backdrop-blur-md text-xs font-medium text-[var(--ink)] shadow-xs hover:bg-[var(--card)] active:scale-95 transition-all"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                Menu
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay with clip-path animation */}
      <div
        className={`fixed inset-0 z-50 bg-[var(--paper)] flex flex-col justify-between p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto [clip-path:circle(150%_at_90%_5%)]'
            : 'opacity-0 pointer-events-none [clip-path:circle(0%_at_90%_5%)]'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)]">
            Navigation
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-full border border-[var(--line-strong)] bg-[var(--card)] text-xs font-mono text-[var(--ink)] flex items-center gap-1.5"
            >
              <span>{isDark ? '☀️ Light' : '🌙 Dark'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-sm font-mono text-[var(--ink)] active:scale-90 transition-transform"
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>
        </div>

        <nav className="flex flex-col gap-5 my-auto">
          {NAV.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-left group flex items-baseline gap-4 py-2 border-b border-[var(--line)]"
              style={{
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileMenuOpen ? 1 : 0,
                transition: `all 0.4s var(--ease) ${0.05 + idx * 0.05}s`,
              }}
            >
              <span className="font-mono text-xs text-[var(--mute)] group-hover:text-[var(--ink)]">
                {item.index}
              </span>
              <span className="text-3xl font-bold font-sans-tight tracking-tight text-[var(--ink)] group-hover:translate-x-2 transition-transform">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--mute)] font-mono">
          <span>{PROFILE.location}</span>
          <span>{PROFILE.validTill}</span>
        </div>
      </div>
    </>
  );
};
