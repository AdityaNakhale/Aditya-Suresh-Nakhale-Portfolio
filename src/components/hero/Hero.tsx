import React, { useEffect, useRef, useState } from 'react';
import { PROFILE } from '@/src/lib/data';
import { scrollToTarget } from '@/src/lib/scroll';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Autoplay attempt on load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start video muted initially as required by browser autoplay policies
    video.muted = true;
    setIsMuted(true);

    video
      .play()
      .then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      })
      .catch(() => {
        setAutoplayBlocked(true);
        setIsPlaying(false);
      });

    // Unlock sound on visitor's first user interaction anywhere
    const handleFirstInteraction = () => {
      const v = videoRef.current;
      if (v) {
        v.muted = false;
        v.play()
          .then(() => {
            setIsMuted(false);
            setAutoplayBlocked(false);
          })
          .catch(() => {
            v.muted = true;
            setIsMuted(true);
          });
      }
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchend', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchend', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchend', handleFirstInteraction);
    };
  }, []);

  // IntersectionObserver: Pause video when less than 35% visible
  useEffect(() => {
    const heroEl = heroRef.current;
    const video = videoRef.current;
    if (!heroEl || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) {
          video.pause();
        } else {
          video.play().catch(() => {});
        }
      },
      { threshold: [0, 0.35, 0.7, 1.0] }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  // Toggle Sound Button: Single authoritative handler for video native audio
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
      setAutoplayBlocked(false);
      video.play().catch(() => {});
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden select-none bg-[var(--paper)]"
    >
      {/* 1. GIANT GHOST WORD IN CENTER BACKGROUND (ADITYA) */}
      <div
        className="absolute inset-x-0 top-[20%] md:top-[16%] flex items-center justify-center pointer-events-none z-0 overflow-hidden px-4"
        aria-hidden="true"
      >
        <span
          className="text-[23vw] font-black leading-none tracking-tight select-none uppercase font-sans-tight text-[var(--ghost-text)] text-center w-full whitespace-nowrap transition-colors duration-300"
          style={{
            letterSpacing: '-0.02em',
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* 2. CENTER CHARACTER VIDEO: Single native audio stream with perfect lip-sync */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10 pb-0 overflow-hidden">
        <div className="relative w-auto h-[min(94svh,1000px)] flex items-end justify-center pointer-events-auto">
          <video
            ref={videoRef}
            muted={isMuted}
            loop
            playsInline
            preload="auto"
            poster={`${import.meta.env.BASE_URL}portrait-bust.webp`}
            className="w-auto h-[min(94svh,1000px)] max-h-[94svh] object-contain transition-opacity duration-700 select-none"
          >
            <source src={`${import.meta.env.BASE_URL}hero/hero.webm`} type="video/webm" />
            <source src={`${import.meta.env.BASE_URL}hero/9234814a-0148-4616-9979-ae9df0be1f40.webm`} type="video/webm" />
          </video>
        </div>
      </div>

      {/* 3. SINGLE SOUND BUTTON: Elegantly placed top-right, clear of top navigation */}
      <div className="absolute top-20 sm:top-24 right-6 sm:right-10 z-30">
        <button
          onClick={toggleSound}
          className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
          aria-label={isMuted ? 'Unmute video sound' : 'Mute video sound'}
          title={isMuted ? 'Sound is Off — Click to turn Sound On' : 'Sound is On — Click to turn Sound Off'}
        >
          {autoplayBlocked && (
            <span
              className="absolute inset-0 rounded-full bg-black opacity-20 animate-ping pointer-events-none"
              style={{ animationDuration: '2s' }}
            />
          )}

          {isMuted ? (
            // Default Muted Icon (Speaker with diagonal slash)
            <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            // Default Active Icon (Speaker with sound waves)
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          )}
        </button>
      </div>

      {/* 4. HERO FOREGROUND CONTENT: Two Clean Editorial Anchors */}
      <div className="relative z-30 site-container w-full flex flex-col md:flex-row items-start md:items-end justify-between pt-24 pb-8 sm:pb-12 gap-8 pointer-events-none mt-auto">
        {/* Bottom-Left Block: Kicker + Title + Subtitle */}
        <div className="max-w-xl pointer-events-auto">
          {/* Upper Kicker */}
          <div className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-[var(--mute)] font-semibold mb-2">
            {PROFILE.name}
          </div>

          {/* Main Title: Full Stack Developer */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-sans-tight text-[var(--ink)] tracking-[-0.045em] leading-[0.92] mb-3">
            Full Stack<br />Developer.
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-sm text-[var(--mute)] tracking-tight font-normal">
            Creative developer · AI & web technology
          </p>
        </div>

        {/* Bottom-Right Block: Explore work -> on top, Let's talk & Résumé below */}
        <div className="flex flex-col items-start md:items-end gap-2.5 pointer-events-auto shrink-0 w-full md:w-auto">
          {/* Top Primary Button: Explore work -> */}
          <button
            onClick={() => scrollToTarget('#work')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[var(--ink)] text-[var(--paper)] text-xs sm:text-sm font-medium tracking-tight shadow-md hover:bg-[var(--ink-2)] active:scale-95 transition-all text-center"
          >
            Explore work →
          </button>

          {/* Bottom Secondary Row: Let's talk + Résumé ↓ */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => scrollToTarget('#contact')}
              className="flex-1 sm:flex-initial px-5 py-2 rounded-full border border-[var(--line-strong)] bg-[var(--card)]/80 backdrop-blur-xs text-[var(--ink)] text-xs font-medium tracking-tight hover:bg-[var(--card)] active:scale-95 transition-all text-center shadow-2xs"
            >
              Let's talk
            </button>

            <a
              href={PROFILE.resumePath}
              download="Aditya_Suresh_Nakhale_Resume.pdf"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full border border-[var(--line-strong)] bg-[var(--card)]/80 backdrop-blur-xs text-[var(--ink)] text-xs font-medium tracking-tight hover:bg-[var(--card)] active:scale-95 transition-all shadow-2xs"
            >
              <span>Résumé</span>
              <span className="text-[11px]">↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom-Left Circle Mark */}
      <div className="absolute bottom-3 left-6 sm:left-10 z-20 pointer-events-none">
        <div className="w-6 h-6 rounded-full bg-[#1e293b]/20 flex items-center justify-center text-[9px] font-mono font-bold text-[var(--ink)]">
          N
        </div>
      </div>
    </section>
  );
};
