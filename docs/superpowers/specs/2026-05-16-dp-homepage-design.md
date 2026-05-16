# Design Spec — Daniel Plaschg Homepage

**Date:** 2026-05-16
**Owner:** Daniel Plaschg
**Status:** Approved, ready for implementation plan

## Goal

A single-screen personal calling card website for Daniel Plaschg, positioning him as a Growth Consultant. The site is intentionally minimal: name, role, one line of microcopy, a small interactive music player as the personality anchor, and three contact links. Primary visitor action: open one of the contact channels (email, LinkedIn, Instagram).

Inspired in *direction* by minimal one-screen designer portfolios (e.g. joost.design) — same aesthetic family (mono-chrome + accent, retro-tech, lowercase, intimate scale, single personality object) but with original execution: distinct colors, distinct typography, distinct device-form for the player, distinct copy.

## Scope

In scope:
- One HTML file (`index.html`) with inline CSS and JavaScript
- Functional audio player with play/pause, next, previous, progress bar
- Subtle entrance animations on page load
- Responsive (desktop + mobile, single layout that scales)

Out of scope:
- Multiple pages, blog, services pages, case studies
- Build pipeline, framework, package manager
- Backend, analytics, forms
- SEO optimization beyond basic `<meta>` tags
- Deployment automation (local preview only for v1)

## Content

| Element | Value |
|---|---|
| Brand name (display) | `Daniel Plaschg` |
| Tagline (mono) | `growth_consultant` |
| Microcopy | `Say hi — drop me a line whenever.` |
| Logo mark | Original `DP` monogram glyph (designed during implementation) |
| Language | English |
| Email link | `daniel.plaschg@gmail.com` |
| LinkedIn link | Placeholder: `# LINKEDIN_URL` |
| Instagram link | Placeholder: `# INSTAGRAM_URL` |

All copy is original. No phrasing, layout, or assets are copied from third-party sites.

## Visual Direction — "Cyber Cyan"

- **Background:** deep marine `#0a0e1f` with a subtle radial vignette glow toward center (`rgba(103, 232, 249, 0.06)`)
- **Accent / primary text:** cyan `#67e8f9`
- **Secondary text:** cyan at 60–70% opacity
- **Display typography:** Inter Tight, weights 200 (extralight) for the name and 300 (light) for the microcopy. Lowercase for all body text; only proper nouns capitalized.
- **Mono typography** (tagline, controls, contact links): JetBrains Mono, weight 400, letter-spacing 0.05em
- **Mood:** premium, technical, intimate. Minimal ornament. Heavy negative space.

## Layout

Single viewport, centered column, vertically balanced. Approximate stacking with even rhythm:

```
        ╭──────────────╮
        │  [DP glyph]  │   ← 32–40px tall
        │              │
        │ Daniel       │   ← display, ~36px desktop / ~28px mobile
        │   Plaschg    │
        │              │
        │ growth_      │   ← mono, ~12–13px, letter-spaced
        │  consultant  │
        │              │
        │  microcopy   │   ← display thin, ~14–15px, opacity ~0.7
        │              │
        │  ┌────────┐  │   ← player, ~200–220px wide × ~140px tall
        │  │ player │  │
        │  └────────┘  │
        │              │
        │ e · li · ig  │   ← mono, ~12px, opacity ~0.7
        ╰──────────────╯
```

Mobile (<640px): same stack, slightly reduced sizes, player width caps at ~70% of viewport.

## Music Player — Component Spec

**Form factor:** original design, distinct from any third-party reference. Vertical mini tape-deck shape: a rectangular device with a small "display" region at the top (track title + a thin animated cyan waveform/EQ visualization) and three flat circular controls below (previous, play/pause, next). A thin progress bar runs along the bottom edge.

**Visual treatment:**
- Device body: slightly lighter than background (`#10172b`), 1px cyan border at low opacity (`#67e8f955`), 14px border-radius
- Soft cyan glow shadow when a track is playing (`box-shadow: 0 0 40px #67e8f922`)
- All control icons rendered as inline SVG, cyan stroke

**Behavior:**
- Track list: a JavaScript array `tracks[]` at the top of `<script>`, easy to edit. Each entry: `{ title, artist, src }`.
- Player **does not** autoplay (modern browsers block it, and it would be intrusive). Visitor explicitly presses Play.
- When a track ends, the next track loads and plays automatically.
- Previous/Next cycle through the array (wraps at ends).
- Waveform/EQ visualization at top of display: animated when playing (CSS keyframes on small vertical bars), still when paused. No Web Audio API for v1 — fake EQ animation keeps it lightweight.
- Progress bar updates in `timeupdate` listener; clickable to seek.
- Currently-playing track title updates in the display.

**Music files (placeholders):**
- For the initial build, exactly 3 royalty-free instrumental tracks (sourced from Pixabay Music under its free-use license) are bundled as demo content under `audio/` so the player can be tested live.
- A `// TODO: replace with your own tracks` comment above the `tracks[]` array makes the swap obvious. Daniel is responsible for ensuring he has rights to whatever music he ultimately uses (own recordings, royalty-free downloads, or licensed tracks).

## Motion

Subtle, restrained. Five distinct moments:

1. **Page-load stagger:** logo → name → tagline → microcopy → player → contact links, each fading in (opacity 0→1, translateY 8px→0) with ~100ms delay between elements. Total duration: ~700ms.
2. **Background pulse:** the radial vignette glow oscillates between 0.05 and 0.08 opacity over a 4s loop. Almost subliminal.
3. **Player idle state:** the waveform/EQ bars sit still at low height.
4. **Player playing state:** the EQ bars animate (varying heights, ~600ms CSS keyframe loop), the device casts its soft cyan glow.
5. **Hover states:** contact links increase cyan intensity (opacity 0.7→1.0 and a subtle text-shadow glow); player controls scale to 1.05 on hover.

No scroll-triggered animation (there is no scroll). No cursor effects.

## Tech

- Single file: `index.html`
- Inline `<style>` block, inline `<script>` block. No external CSS or JS files.
- Fonts loaded via Google Fonts `<link>` (preconnect + display=swap)
- Logo and player icons: inline SVG
- Demo audio files placed in `audio/` next to `index.html`
- Estimated total size: ~250–350 lines of well-spaced HTML/CSS/JS
- No build tools, no package manager, no dependencies
- Opens directly in a browser via `file://` or any static server

## File Structure

```
DP Homepage V2/
├── index.html              ← the entire site
├── audio/
│   ├── track-01.mp3        ← royalty-free demo
│   ├── track-02.mp3        ← royalty-free demo
│   └── track-03.mp3        ← royalty-free demo
└── README.md               ← brief: how to preview, how to swap tracks, how to fill placeholders
```

## Success Criteria

The build is complete when:
1. Opening `index.html` in Chrome, Safari, and Firefox shows the same intended layout
2. All page-load animations fire correctly on first paint
3. The player plays, pauses, skips next/previous, advances automatically at track end, and seeks via progress-bar click
4. The page is usable and visually intact at 1440×900, 1024×768, and 390×844 viewports
5. No console errors
6. Placeholders for LinkedIn and Instagram URLs are clearly marked with `# LINKEDIN_URL` / `# INSTAGRAM_URL` so Daniel can find and replace them
7. The `tracks[]` array in the script block has a clear `// TODO: replace with your own tracks` comment above it

## Open Items / Owner Responsibilities

- Daniel provides his own LinkedIn URL and Instagram URL (replacing placeholders)
- Daniel sources and provides his final music tracks (with appropriate rights/licenses) and replaces the demo files
- Domain registration and deployment are out of scope for v1; local preview only

## Originality Statement

This design borrows the *aesthetic category* of minimal one-screen personal sites (a broad and uncopyrightable design family) and the *idea* of a small interactive device as a personality anchor (a common pattern across many sites). All specific design choices — color palette, exact typography pairing, device form factor for the player, microcopy wording, logo mark, motion timing — are original work created for Daniel Plaschg.
