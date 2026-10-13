/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ScrollProvider } from '@/src/lib/scroll';
import { Navigation } from '@/src/components/Navigation';
import { Hero } from '@/src/components/hero/Hero';
import { AboutSection } from '@/src/components/sections/AboutSection';
import { SkillsSection } from '@/src/components/sections/SkillsSection';
import { WorkSection } from '@/src/components/sections/WorkSection';
import { CertificationsSection } from '@/src/components/sections/CertificationsSection';
import { ExperienceSection } from '@/src/components/sections/ExperienceSection';
import { AchievementsSection } from '@/src/components/sections/AchievementsSection';
import { ContactSection } from '@/src/components/sections/ContactSection';

export default function App() {
  // Global RevealObserver: adds .is-in to .rv and .rv-mask once only
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const revealElements = document.querySelectorAll('.rv, .rv-mask');
    revealElements.forEach((el) => observer.observe(el));

    // Handle dynamically mounted nodes
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches('.rv, .rv-mask')) observer.observe(node);
            node.querySelectorAll('.rv, .rv-mask').forEach((child) => observer.observe(child));
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <ScrollProvider>
      <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] antialiased relative selection:bg-[var(--ink)] selection:text-[var(--paper)]">
        {/* Navigation */}
        <Navigation />

        {/* Main Continuous Single Scroll Surface */}
        <main>
          {/* 4.1 Hero */}
          <Hero />

          {/* 4.2 About */}
          <AboutSection />

          {/* 4.3 Skills */}
          <SkillsSection />

          {/* 4.4 Work */}
          <WorkSection />

          {/* 4.5 Certifications */}
          <CertificationsSection />

          {/* 4.6 Experience */}
          <ExperienceSection />

          {/* 4.7 Achievements */}
          <AchievementsSection />
        </main>

        {/* 4.8 Contact + Footer */}
        <ContactSection />
      </div>
    </ScrollProvider>
  );
}
