# Aditya Suresh Nakhale — Personal Portfolio

A quiet, editorial, high-performance portfolio website for **Aditya Suresh Nakhale** (Full Stack Developer & Backend Developer Intern). Designed according to an Awwwards "Site of the Day" aesthetic in calm grayscale (white, black, and grays only), with real brand logos preserving their official hues.

---

## 1. Quick Start

### Prerequisites
- Node.js 18+ or 20+
- npm or bun

### Run Locally
```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build for production
npm run build
```

---

## 2. Sections Table

| Index | Section | Component | Key Highlights & Mechanics |
| :--- | :--- | :--- | :--- |
| **00** | **Navigation** | `Navigation.tsx` | Initials mark rotating on hover, frosted glass pill, sliding ink indicator, 2px top scroll progress, full-screen mobile menu. |
| **01** | **Hero** | `hero/Hero.tsx` | Central aspect video with `mix-blend-mode: multiply`, ghost uppercase name, muted loop, voice autoplay unlock, IntersectionObserver auto-pause (<35%), ▶/❚❚ sound toggle. |
| **02** | **About** | `sections/AboutSection.tsx` | 3-column equal height layout. Verbatim summary, hanging lanyard developer ID card with damped pendulum swing & 3D hover/keyboard flip. Quick facts. |
| **03** | **Skills** | `sections/SkillsSection.tsx` | Periodic table of stack (8 cols desktop / 4 mobile), category filter chips, diagonal wave reveal, sticky inspector with 150px logo pop animation & soft glow. |
| **04** | **Work** | `sections/WorkSection.tsx` | Expanding accordion gallery (`min(78svh, 600px)`). Open panel shows 2-col features, tech chips, and illustrative grayscale mini-UI. |
| **05** | **Certifications** | `sections/CertificationsSection.tsx` | White band with hairline borders. Sticky heading, numbered list with ink-flood hover (`scaleX(0→1)`), external profile link. |
| **06** | **Experience** | `sections/ExperienceSection.tsx` | Education and experience unified into a single chronological path. Vertical spine draws dynamically as you scroll; ends with "Next — Your team?". |
| **07** | **Achievements** | `sections/AchievementsSection.tsx` | Pinned horizontal gallery (`100svh` sticky). Cards slide on scroll, easeOutQuart count-up numbers over 1.4s, center card 12px lift. |
| **08** | **Contact & Footer** | `sections/ContactSection.tsx` | Hopping interactive letter bounce heading, large underlined email with "Copied ✓" chip, spinning circular badge, social links. |

---

## 3. Hero Video Pipeline

To process or rebuild the hero video from a raw source introduction video (`intro.mp4` or `intro.mov`):

```bash
# Run the Python script with an input video
python3 scripts/build-hero-assets.py path/to/intro.mp4
```

### Script Execution Steps (`scripts/build-hero-assets.py`):
1. **Centering & Cropping**: Uses FFmpeg crop filter around the speaker, scaled to 768px wide.
2. **Background Whitening**: Applies `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98` so background tones blend into `#f4f2ee`.
3. **Seamless Looping**: Exports H.264 `public/hero/hero.mp4` and VP9 `public/hero/hero.webm` with sample-accurate audio cross-fade.
4. **Portrait Extraction**: Saves a 480×600 head-to-shirt crop at `public/portrait-bust.webp` and a 1200×630 OpenGraph card at `public/og.jpg`.

---

## 4. Brand Logos & Licenses

Brand SVGs in `public/logos/` are used strictly for identification purposes representing technologies and platforms cited in Aditya's official résumé:

- **Java**: Oracle Corporation
- **JavaScript**: OpenJS Foundation
- **C / C++**: ISO / Standard C++ Foundation
- **Node.js**: OpenJS Foundation (MIT)
- **Nest.js**: Kamil Myśliwiec (MIT)
- **Next.js**: Vercel Inc. (MIT)
- **PostgreSQL**: PostgreSQL Global Development Group
- **MySQL**: Oracle Corporation
- **Prisma ORM**: Prisma Data, Inc. (Apache 2.0)
- **Git**: Software Freedom Conservancy (GPLv2)
- **VS Code**: Microsoft Corporation (MIT)
- **Apache NetBeans**: Apache Software Foundation (Apache 2.0)
- **Google / Google Cloud / Google Maps**: Google LLC
- **Dropbox**: Dropbox, Inc.
- **Spring Boot / Hibernate / Thymeleaf**: VMware / Broadcom / Thymeleaf Team
- **HackerRank**: HackerRank Inc.

All vector logos are stored locally in `public/logos/` accompanied by `public/logos/LICENSE`. No third-party CDN or external scripts are invoked at runtime.
