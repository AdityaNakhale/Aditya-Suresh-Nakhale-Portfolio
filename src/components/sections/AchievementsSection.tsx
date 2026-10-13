import React, { useRef, useState, useEffect } from 'react';
import { ACHIEVEMENTS, AchievementItem } from '@/src/lib/data';
import { TechLogo } from '@/src/components/ui/TechLogo';

// Easing helper
function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

// Single Animated Counter
const Counter: React.FC<{ target: number; suffix?: string; prefix?: string; active: boolean }> = ({
  target,
  suffix = '',
  prefix = '',
  active,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const duration = 1400; // 1.4s

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutQuart(progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [active, target]);

  return (
    <span className="font-sans-tight font-bold text-4xl sm:text-5xl md:text-6xl text-[var(--ink)] tracking-tight">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const AchievementsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [hasStartedCounting, setHasStartedCounting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      setScrollProgress(progress);

      if (progress > 0.05 && !hasStartedCounting) {
        setHasStartedCounting(true);
      }

      // Calculate which card is closest to screen center
      const cardCount = ACHIEVEMENTS.length;
      const approxIndex = Math.min(cardCount - 1, Math.max(0, Math.round(progress * cardCount)));
      setActiveCardIndex(approxIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasStartedCounting]);

  // Max translation distance
  const travelDistance = 1600; // in px
  const translateX = -scrollProgress * travelDistance;

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative"
      style={{ height: 'calc(100svh + 1800px)' }}
    >
      {/* Pinned Viewport Container (100svh sticky) */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between py-8 select-none">
        {/* Header bar with Thin Progress Bar */}
        <div className="site-container w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] block mb-1">
                06 — Achievements & Metrics
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans-tight text-[var(--ink)] tracking-tight">
                Verified{' '}
                <span className="font-serif-italic font-normal lowercase tracking-normal text-[var(--mute)]">
                  milestones.
                </span>
              </h2>
            </div>
            <div className="font-mono text-xs text-[var(--mute)]">
              Scroll to explore metrics →
            </div>
          </div>

          {/* Thin progress bar */}
          <div className="w-full h-[2px] bg-[var(--line)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--ink)] origin-left transition-transform duration-75"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </div>
        </div>

        {/* Horizontal Card Track */}
        <div className="w-full flex items-center overflow-visible pl-[max(18px,4vw)] my-auto py-8">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 transition-transform duration-100 ease-out will-change-transform"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
            }}
          >
            {ACHIEVEMENTS.map((item, index) => {
              const isCenter = activeCardIndex === index;

              return (
                <div
                  key={item.id}
                  className={`w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,320px)] rounded-[28px] bg-[var(--card)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 shrink-0 ${
                    isCenter
                      ? '-translate-y-3 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.12)]'
                      : 'translate-y-0 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.05)]'
                  }`}
                  style={{
                    boxShadow: isCenter
                      ? 'inset 0 0 0 1px rgba(13,13,13,0.12), 0 24px 50px -12px rgba(0,0,0,0.14)'
                      : 'inset 0 0 0 1px rgba(13,13,13,0.07), 0 8px 24px -8px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Top: 72px Logo Tile with soft brand glow + Index */}
                  <div className="flex items-start justify-between">
                    <div className="relative w-[72px] h-[72px] rounded-2xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center p-3.5">
                      {/* Soft brand glow */}
                      <div
                        className={`absolute inset-0 rounded-2xl blur-lg transition-opacity duration-500 ${
                          isCenter ? 'opacity-40' : 'opacity-15'
                        }`}
                        style={{
                          backgroundColor:
                            item.brandKey === 'prisma'
                              ? '#2d3748'
                              : item.brandKey === 'dropbox'
                              ? '#0061ff'
                              : item.brandKey === 'git'
                              ? '#f05032'
                              : '#2ec866',
                        }}
                      />
                      <TechLogo
                        brandKey={item.brandKey}
                        name={item.platform}
                        size={42}
                        className="relative z-10"
                      />
                    </div>

                    <span className="font-mono text-xs font-semibold text-[var(--mute)]">
                      {item.index}
                    </span>
                  </div>

                  {/* Bottom: Left Info & Right Count-up number */}
                  <div className="flex items-end justify-between gap-4 pt-4 border-t border-[var(--line)]">
                    <div className="max-w-[65%]">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] block">
                        {item.platform}
                      </span>
                      <h4 className="font-bold text-base sm:text-lg font-sans-tight text-[var(--ink)] leading-snug">
                        {item.label}
                      </h4>
                      <p className="text-xs text-[var(--ink-2)] font-medium mt-0.5">
                        {item.caption}
                      </p>
                      <p className="text-[11px] text-[var(--mute)] mt-1 line-clamp-2">
                        {item.detail}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <Counter
                        target={item.number}
                        suffix={item.suffix}
                        prefix={item.prefix}
                        active={hasStartedCounting}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Ending Track Card: "and counting →" */}
            <div className="w-[280px] h-[clamp(260px,36vh,320px)] rounded-[28px] border-2 border-dashed border-[var(--line-strong)] bg-[var(--card)]/40 flex flex-col items-center justify-center text-center p-6 shrink-0">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] block mb-2">
                Continuous Growth
              </span>
              <p className="font-serif-italic text-2xl text-[var(--ink)] mb-1">
                and counting →
              </p>
              <p className="font-mono text-xs text-[var(--mute)] max-w-[180px]">
                Consistently leveling up through live code & architecture.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom index indicators */}
        <div className="site-container w-full flex items-center justify-between text-xs font-mono text-[var(--mute)]">
          <span>01 / College 1st Prize</span>
          <span>05 / 20+ Commits Weekly</span>
        </div>
      </div>
    </section>
  );
};
