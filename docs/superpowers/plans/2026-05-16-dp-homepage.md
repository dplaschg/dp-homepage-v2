# DP Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-screen personal calling-card website for Daniel Plaschg (Growth Consultant) with name, tagline, microcopy, a functional cyber-cyan mini music player, and three contact links — all in one `index.html` file.

**Architecture:** One self-contained HTML file with inline `<style>` and `<script>` blocks. No framework, no build step, no dependencies. Fonts via Google Fonts CDN. Logo and player controls as inline SVG. Three royalty-free MP3 demo files in `audio/`. Visual verification via Playwright screenshots at 1440 and 390 viewports.

**Tech Stack:** HTML5, CSS3 (custom properties, grid/flex, keyframes), vanilla JS (HTMLAudioElement), inline SVG, Google Fonts (Inter Tight + JetBrains Mono).

**Spec reference:** `docs/superpowers/specs/2026-05-16-dp-homepage-design.md`

---

## Verification Approach (TDD adaptation for static HTML)

Traditional unit-testing doesn't fit a single static HTML file. Instead, every task ends with a **visual verification step** using the existing Playwright script at `.research/screenshot.mjs`. The engineer launches a local file-server, screenshots the page at both viewports, and visually confirms the expected element renders before committing. Each task lists what to look for.

Local server command (used throughout):
```bash
cd "/Users/dplaschg/Projects/DP Homepage V2" && python3 -m http.server 4242
```

Screenshot command (used throughout):
```bash
cd "/Users/dplaschg/Projects/DP Homepage V2/.research" && node screenshot.mjs http://localhost:4242/index.html ./verify
```

---

### Task 0: Project Setup

**Files:**
- Create: `.gitignore`
- Create: `README.md`
- Create: `index.html` (empty placeholder)
- Create: `audio/` (empty directory)

- [ ] **Step 0.1: Initialize git repository**

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2"
git init
git config --local user.name "Daniel Plaschg"
git config --local user.email "daniel.plaschg@gmail.com"
```

Expected: `Initialized empty Git repository in /Users/dplaschg/Projects/DP Homepage V2/.git/`

- [ ] **Step 0.2: Write `.gitignore`**

Create `/Users/dplaschg/Projects/DP Homepage V2/.gitignore` with:

```
.DS_Store
node_modules/
.superpowers/
.research/node_modules/
.research/shots/
.research/verify/
.claude/settings.local.json
```

- [ ] **Step 0.3: Write README skeleton**

Create `/Users/dplaschg/Projects/DP Homepage V2/README.md` with:

```markdown
# Daniel Plaschg — Homepage

Single-file personal site. No build step.

## Preview

```bash
python3 -m http.server 4242
# open http://localhost:4242/index.html
```

## Customize

- **Social URLs:** find `# LINKEDIN_URL` and `# INSTAGRAM_URL` in `index.html` and replace.
- **Music tracks:** replace files in `audio/` and update the `tracks` array at the top of the `<script>` block in `index.html`. You are responsible for ensuring you have the rights to any music you ship.
```

- [ ] **Step 0.4: Create empty placeholder files**

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2"
mkdir -p audio
touch index.html
touch audio/.gitkeep
```

- [ ] **Step 0.5: First commit**

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2"
git add .gitignore README.md index.html audio/.gitkeep docs/
git commit -m "chore: project setup"
```

Expected: commit succeeds.

---

### Task 1: HTML Skeleton + CSS Variables + Fonts

**Files:**
- Modify: `index.html` (write full skeleton)

- [ ] **Step 1.1: Write full HTML skeleton**

Replace the contents of `/Users/dplaschg/Projects/DP Homepage V2/index.html` with:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Daniel Plaschg — Growth Consultant</title>
  <meta name="description" content="Growth consultant. Say hi." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@200;300&family=JetBrains+Mono:wght@400&display=swap" />
  <style>
    :root {
      --bg: #0a0e1f;
      --accent: #67e8f9;
      --accent-dim: rgba(103, 232, 249, 0.7);
      --accent-faint: rgba(103, 232, 249, 0.06);
      --device-bg: #10172b;
      --device-border: rgba(103, 232, 249, 0.33);
      --device-glow: rgba(103, 232, 249, 0.13);
      --font-display: "Inter Tight", ui-sans-serif, system-ui, -apple-system, sans-serif;
      --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    html, body { height: 100%; }

    body {
      background: var(--bg);
      color: var(--accent);
      font-family: var(--font-display);
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <main class="stage"></main>
  <script></script>
</body>
</html>
```

- [ ] **Step 1.2: Start local server (one-time, keep running in background)**

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2" && python3 -m http.server 4242
```

Run in background. The engineer keeps it running across all remaining tasks.

- [ ] **Step 1.3: Verify in browser**

Open `http://localhost:4242/index.html` in a browser. Expected: a solid deep-navy background, no errors in console.

- [ ] **Step 1.4: Screenshot verification**

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2/.research" && node screenshot.mjs http://localhost:4242/index.html ./verify
```

Check `.research/verify/desktop-hero.png` and `.research/verify/mobile-hero.png`. Both should show a uniform deep-navy background. No layout, no text yet.

- [ ] **Step 1.5: Commit**

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2"
git add index.html
git commit -m "feat: html skeleton with css variables and google fonts"
```

---

### Task 2: Centered Stage Layout + DP Logo Glyph

**Files:**
- Modify: `index.html` (add `.stage` styles + logo SVG)

- [ ] **Step 2.1: Add `.stage` layout styles**

Inside the `<style>` block in `index.html`, append (before the closing `</style>`):

```css
    .stage {
      width: min(420px, 88vw);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 28px;
      text-align: center;
      position: relative;
    }

    .logo {
      width: 36px;
      height: 36px;
      color: var(--accent);
    }

    .logo svg { width: 100%; height: 100%; display: block; }
```

- [ ] **Step 2.2: Add DP logo SVG inside `<main class="stage">`**

Replace `<main class="stage"></main>` with:

```html
  <main class="stage">
    <div class="logo" aria-label="Daniel Plaschg">
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6 6h10a8 8 0 0 1 8 8v0a8 8 0 0 1-8 8H6V6z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M30 14v16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="30" cy="10" r="1.5" fill="currentColor"/>
      </svg>
    </div>
  </main>
```

The glyph is original: a stylized "D" (rounded rectangle with arc) plus a vertical stroke + dot suggesting "P" — a compact monogram that reads cleanly at small sizes.

- [ ] **Step 2.3: Visual verification**

Reload `http://localhost:4242/index.html`. Expected: a small cyan glyph centered in the viewport.

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2/.research" && node screenshot.mjs http://localhost:4242/index.html ./verify
```

Check screenshots — the cyan monogram should appear centered.

- [ ] **Step 2.4: Commit**

```bash
git add index.html
git commit -m "feat: centered stage layout and DP monogram glyph"
```

---

### Task 3: Name, Tagline, Microcopy

**Files:**
- Modify: `index.html` (typography styles + content)

- [ ] **Step 3.1: Add typography CSS**

Append to the `<style>` block (before `</style>`):

```css
    .name {
      font-family: var(--font-display);
      font-weight: 200;
      font-size: clamp(28px, 4.2vw, 38px);
      letter-spacing: -0.02em;
      line-height: 1.05;
      color: var(--accent);
    }

    .tagline {
      font-family: var(--font-mono);
      font-weight: 400;
      font-size: 12px;
      letter-spacing: 0.12em;
      color: var(--accent-dim);
      text-transform: lowercase;
    }

    .microcopy {
      font-family: var(--font-display);
      font-weight: 300;
      font-size: 14px;
      line-height: 1.5;
      color: var(--accent-dim);
      max-width: 280px;
    }
```

- [ ] **Step 3.2: Insert the three text elements inside `<main class="stage">`, after the logo**

After the closing `</div>` of the logo, before the closing `</main>`, add:

```html
    <h1 class="name">Daniel Plaschg</h1>
    <p class="tagline">growth_consultant</p>
    <p class="microcopy">Say hi — drop me a line whenever.</p>
```

- [ ] **Step 3.3: Visual verification**

Reload the page. Expected stack from top: glyph, "Daniel Plaschg" (thin, large), "growth_consultant" (mono, small, letter-spaced), then "Say hi — drop me a line whenever." (thin, slightly larger than the tagline).

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2/.research" && node screenshot.mjs http://localhost:4242/index.html ./verify
```

- [ ] **Step 3.4: Commit**

```bash
git add index.html
git commit -m "feat: name, tagline, and microcopy"
```

---

### Task 4: Contact Links Row

**Files:**
- Modify: `index.html` (add `.contact` styles + links)

- [ ] **Step 4.1: Add contact-row CSS**

Append to the `<style>` block:

```css
    .contact {
      display: flex;
      gap: 14px;
      font-family: var(--font-mono);
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: lowercase;
      margin-top: 4px;
    }

    .contact a {
      color: var(--accent-dim);
      text-decoration: none;
      transition: color 0.2s ease, text-shadow 0.2s ease;
    }

    .contact .sep {
      color: var(--accent-dim);
      opacity: 0.4;
    }
```

- [ ] **Step 4.2: Insert contact row at the end of `<main class="stage">`**

After the `<p class="microcopy">…</p>` line (we will move the player above this in a later task), add:

```html
    <nav class="contact" aria-label="Contact">
      <a href="mailto:daniel.plaschg@gmail.com">email</a>
      <span class="sep">·</span>
      <a href="# LINKEDIN_URL" target="_blank" rel="noopener noreferrer">linkedin</a>
      <span class="sep">·</span>
      <a href="# INSTAGRAM_URL" target="_blank" rel="noopener noreferrer">instagram</a>
    </nav>
```

The literal strings `# LINKEDIN_URL` and `# INSTAGRAM_URL` are intentional placeholders. The README references them.

- [ ] **Step 4.3: Visual verification**

Reload. Expected: a single horizontal row at the bottom of the stack — "email · linkedin · instagram" — in mono lowercase. Clicking "email" should open the mail composer.

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2/.research" && node screenshot.mjs http://localhost:4242/index.html ./verify
```

- [ ] **Step 4.4: Commit**

```bash
git add index.html
git commit -m "feat: contact links row with email, linkedin, instagram placeholders"
```

---

### Task 5: Music Player — Static Markup & Styling

**Files:**
- Modify: `index.html` (player markup + styles, no JS yet)

- [ ] **Step 5.1: Add player CSS**

Append to the `<style>` block:

```css
    .player {
      width: 100%;
      max-width: 220px;
      background: var(--device-bg);
      border: 1px solid var(--device-border);
      border-radius: 14px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 0 0 rgba(103, 232, 249, 0);
      transition: box-shadow 0.4s ease;
    }

    .player.is-playing {
      box-shadow: 0 0 40px var(--device-glow);
    }

    .player-display {
      background: rgba(103, 232, 249, 0.04);
      border-radius: 8px;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-height: 56px;
      justify-content: center;
    }

    .player-track {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--accent);
      letter-spacing: 0.05em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: lowercase;
    }

    .player-eq {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 14px;
    }

    .player-eq span {
      flex: 1;
      background: var(--accent);
      border-radius: 1px;
      height: 20%;
      opacity: 0.6;
    }

    .player-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
    }

    .player-controls button {
      background: transparent;
      border: none;
      color: var(--accent);
      cursor: pointer;
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.15s ease, color 0.2s ease;
    }

    .player-controls button:hover {
      transform: scale(1.08);
    }

    .player-controls svg {
      width: 18px;
      height: 18px;
      display: block;
    }

    .player-controls .btn-play svg {
      width: 22px;
      height: 22px;
    }

    .player-progress {
      height: 2px;
      background: rgba(103, 232, 249, 0.15);
      border-radius: 1px;
      position: relative;
      cursor: pointer;
    }

    .player-progress-fill {
      height: 100%;
      background: var(--accent);
      border-radius: 1px;
      width: 0%;
      pointer-events: none;
    }
```

- [ ] **Step 5.2: Insert the player markup**

Inside `<main class="stage">`, between the `<p class="microcopy">…</p>` and the `<nav class="contact">…</nav>`, add:

```html
    <section class="player" aria-label="Music player">
      <div class="player-display">
        <div class="player-track" id="trackLabel">— —</div>
        <div class="player-eq" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
        </div>
      </div>

      <div class="player-controls">
        <button class="btn-prev" type="button" aria-label="Previous track">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="19,20 9,12 19,4" fill="currentColor"/><line x1="5" y1="4" x2="5" y2="20"/></svg>
        </button>
        <button class="btn-play" type="button" aria-label="Play">
          <svg id="iconPlay" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
        </button>
        <button class="btn-next" type="button" aria-label="Next track">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="5,4 15,12 5,20" fill="currentColor"/><line x1="19" y1="4" x2="19" y2="20"/></svg>
        </button>
      </div>

      <div class="player-progress" id="progressTrack" role="slider" aria-label="Track progress" tabindex="0">
        <div class="player-progress-fill" id="progressFill"></div>
      </div>
    </section>
```

- [ ] **Step 5.3: Visual verification**

Reload. Expected: between the microcopy and the contact row, a small dark cyan-bordered device with: top display showing "— —" and a row of static EQ bars, three control buttons (prev / play / next), a thin progress line at the bottom (empty). Nothing audio yet — clicking does nothing.

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2/.research" && node screenshot.mjs http://localhost:4242/index.html ./verify
```

- [ ] **Step 5.4: Commit**

```bash
git add index.html
git commit -m "feat: music player static markup and styling"
```

---

### Task 6: Player JS — Audio Playback (tracks, play/pause, next/prev, auto-advance)

**Files:**
- Modify: `index.html` (replace empty `<script>` block)

- [ ] **Step 6.1: Add tracks array placeholders + audio element**

For now, the `tracks` array points to filenames that don't exist yet (we add the actual MP3 files in Task 12). That's fine — Task 6 verifies the JS wiring; the audio errors are expected until Task 12.

Replace the empty `<script></script>` in `index.html` with:

```html
  <script>
    // TODO: replace with your own tracks. You are responsible for the rights.
    const tracks = [
      { title: "track one", src: "audio/track-01.mp3" },
      { title: "track two", src: "audio/track-02.mp3" },
      { title: "track three", src: "audio/track-03.mp3" },
    ];

    const player = document.querySelector(".player");
    const trackLabel = document.getElementById("trackLabel");
    const btnPrev = document.querySelector(".btn-prev");
    const btnPlay = document.querySelector(".btn-play");
    const btnNext = document.querySelector(".btn-next");
    const iconPlay = document.getElementById("iconPlay");
    const progressTrack = document.getElementById("progressTrack");
    const progressFill = document.getElementById("progressFill");

    const audio = new Audio();
    audio.preload = "metadata";
    let currentIndex = 0;
    let isPlaying = false;

    const ICON_PLAY = '<polygon points="6,4 20,12 6,20"/>';
    const ICON_PAUSE = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';

    function loadTrack(index, autoplay) {
      currentIndex = (index + tracks.length) % tracks.length;
      const t = tracks[currentIndex];
      audio.src = t.src;
      trackLabel.textContent = t.title;
      if (autoplay) {
        audio.play().catch(() => { /* user gesture required or file missing */ });
      }
    }

    function setPlayingState(playing) {
      isPlaying = playing;
      iconPlay.innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
      btnPlay.setAttribute("aria-label", playing ? "Pause" : "Play");
      player.classList.toggle("is-playing", playing);
    }

    btnPlay.addEventListener("click", () => {
      if (!audio.src) loadTrack(0, false);
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    });

    btnPrev.addEventListener("click", () => loadTrack(currentIndex - 1, true));
    btnNext.addEventListener("click", () => loadTrack(currentIndex + 1, true));

    audio.addEventListener("play", () => setPlayingState(true));
    audio.addEventListener("pause", () => setPlayingState(false));
    audio.addEventListener("ended", () => loadTrack(currentIndex + 1, true));

    // Initialize label without loading audio (avoids 404 noise before Task 12)
    trackLabel.textContent = tracks[0].title;
  </script>
```

- [ ] **Step 6.2: Verify wiring in console**

Reload `http://localhost:4242/index.html`. Open browser DevTools console. Expected:
- Track label reads "track one"
- Clicking Play does nothing visible yet (the MP3 files don't exist — Task 12 adds them), but the icon should swap to a pause icon if a file existed. For now, verify by:

  ```js
  // paste in console:
  document.querySelector('.btn-play').click();
  // then check:
  document.querySelector('.btn-prev').click();   // label should change to "track three"
  document.querySelector('.btn-next').click();   // label should change to "track one"
  document.querySelector('.btn-next').click();   // label should change to "track two"
  ```

The track label should cycle. The icon may or may not swap depending on whether the missing audio fires an error before `play` — that's fine; Task 12 makes it fully functional.

- [ ] **Step 6.3: Visual verification (no regression)**

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2/.research" && node screenshot.mjs http://localhost:4242/index.html ./verify
```

Visual should be unchanged from Task 5.

- [ ] **Step 6.4: Commit**

```bash
git add index.html
git commit -m "feat: player audio wiring with play/pause, next/prev, auto-advance"
```

---

### Task 7: Progress Bar — timeupdate + click-to-seek

**Files:**
- Modify: `index.html` (extend `<script>` with progress handlers)

- [ ] **Step 7.1: Add progress logic**

Inside the `<script>` block, just before the final line (`trackLabel.textContent = tracks[0].title;`), insert:

```js
    audio.addEventListener("timeupdate", () => {
      if (!audio.duration || isNaN(audio.duration)) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = pct + "%";
    });

    audio.addEventListener("loadedmetadata", () => {
      progressFill.style.width = "0%";
    });

    function seekFromEvent(event) {
      if (!audio.duration || isNaN(audio.duration)) return;
      const rect = progressTrack.getBoundingClientRect();
      const x = (event.clientX ?? rect.left) - rect.left;
      const ratio = Math.min(1, Math.max(0, x / rect.width));
      audio.currentTime = ratio * audio.duration;
    }

    progressTrack.addEventListener("click", seekFromEvent);
    progressTrack.addEventListener("keydown", (e) => {
      if (!audio.duration || isNaN(audio.duration)) return;
      if (e.key === "ArrowRight") audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
      if (e.key === "ArrowLeft") audio.currentTime = Math.max(0, audio.currentTime - 5);
    });
```

- [ ] **Step 7.2: Verify (will be fully exercised in Task 12 once audio exists)**

Reload. No visible change yet. No console errors. The click handler is wired but does nothing without audio loaded — that's fine.

- [ ] **Step 7.3: Commit**

```bash
git add index.html
git commit -m "feat: progress-bar updates and click-to-seek"
```

---

### Task 8: EQ Animation — Idle vs Playing

**Files:**
- Modify: `index.html` (add EQ keyframe animations)

- [ ] **Step 8.1: Add EQ keyframe CSS**

Append to the `<style>` block:

```css
    @keyframes eq-pulse-a { 0%, 100% { height: 25%; } 50% { height: 85%; } }
    @keyframes eq-pulse-b { 0%, 100% { height: 60%; } 50% { height: 30%; } }
    @keyframes eq-pulse-c { 0%, 100% { height: 40%; } 30% { height: 95%; } 70% { height: 20%; } }
    @keyframes eq-pulse-d { 0%, 100% { height: 70%; } 40% { height: 35%; } 80% { height: 90%; } }

    .player.is-playing .player-eq span {
      opacity: 1;
      animation-duration: 0.9s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }
    .player.is-playing .player-eq span:nth-child(4n+1) { animation-name: eq-pulse-a; }
    .player.is-playing .player-eq span:nth-child(4n+2) { animation-name: eq-pulse-b; animation-delay: 0.1s; }
    .player.is-playing .player-eq span:nth-child(4n+3) { animation-name: eq-pulse-c; animation-delay: 0.2s; }
    .player.is-playing .player-eq span:nth-child(4n)   { animation-name: eq-pulse-d; animation-delay: 0.3s; }
```

- [ ] **Step 8.2: Verify idle state**

Reload. EQ bars should sit at the static low height defined in Task 5. No animation.

- [ ] **Step 8.3: Verify playing state (manually trigger class)**

In DevTools console:

```js
document.querySelector('.player').classList.add('is-playing');
```

Expected: bars start animating at varied heights with staggered phases. The device gets a soft cyan glow halo. Then remove the class:

```js
document.querySelector('.player').classList.remove('is-playing');
```

Bars stop animating, glow fades.

- [ ] **Step 8.4: Commit**

```bash
git add index.html
git commit -m "feat: EQ bars animate when player is in is-playing state"
```

---

### Task 9: Page-Load Staggered Entrance Animations

**Files:**
- Modify: `index.html` (add entrance keyframes + per-element delays)

- [ ] **Step 9.1: Add entrance animation CSS**

Append to the `<style>` block:

```css
    @keyframes rise-in {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .stage > * {
      animation: rise-in 0.6s ease-out both;
    }
    .stage > .logo      { animation-delay: 0ms; }
    .stage > .name      { animation-delay: 100ms; }
    .stage > .tagline   { animation-delay: 200ms; }
    .stage > .microcopy { animation-delay: 300ms; }
    .stage > .player    { animation-delay: 400ms; }
    .stage > .contact   { animation-delay: 500ms; }

    @media (prefers-reduced-motion: reduce) {
      .stage > * { animation: none !important; }
    }
```

- [ ] **Step 9.2: Verify**

Hard-reload (Cmd+Shift+R). Expected: elements fade in from below, staggered, finishing around 1.1s after load.

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2/.research" && node screenshot.mjs http://localhost:4242/index.html ./verify
```

The screenshot script waits 2s after load, so the final frame should look identical to before (all elements visible, settled).

- [ ] **Step 9.3: Commit**

```bash
git add index.html
git commit -m "feat: staggered page-load entrance animation"
```

---

### Task 10: Background Radial Vignette + Pulse

**Files:**
- Modify: `index.html` (add pseudo-element on body)

- [ ] **Step 10.1: Add vignette CSS**

Append to the `<style>` block:

```css
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(circle at center, var(--accent-faint) 0%, transparent 60%);
      opacity: 1;
      animation: vignette-pulse 4s ease-in-out infinite;
      z-index: 0;
    }

    .stage { position: relative; z-index: 1; }

    @keyframes vignette-pulse {
      0%, 100% { opacity: 0.85; }
      50%      { opacity: 1.25; }
    }

    @media (prefers-reduced-motion: reduce) {
      body::before { animation: none !important; }
    }
```

(Note: `.stage` already had `position: relative` from Task 2 — re-declaring is harmless and keeps the z-index pairing explicit.)

- [ ] **Step 10.2: Verify**

Reload. Expected: a barely-perceptible cyan radial glow behind the content, breathing slowly over a 4-second loop. Should never feel "loud" — if it's visually distracting, the opacity values in `vignette-pulse` need to come down.

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2/.research" && node screenshot.mjs http://localhost:4242/index.html ./verify
```

- [ ] **Step 10.3: Commit**

```bash
git add index.html
git commit -m "feat: subtle radial vignette with slow pulse"
```

---

### Task 11: Hover States — Links & Controls

**Files:**
- Modify: `index.html` (extend hover CSS for contact + player buttons)

- [ ] **Step 11.1: Strengthen the contact hover style**

Find the `.contact a { … }` rule in the `<style>` block (added in Task 4). Directly below it, add:

```css
    .contact a:hover,
    .contact a:focus-visible {
      color: var(--accent);
      text-shadow: 0 0 8px rgba(103, 232, 249, 0.5);
      outline: none;
    }
```

- [ ] **Step 11.2: Add focus-visible style for player buttons**

Find the `.player-controls button:hover { … }` rule (added in Task 5). Directly below it, add:

```css
    .player-controls button:focus-visible {
      outline: 1px solid var(--accent);
      outline-offset: 4px;
      border-radius: 50%;
    }
```

- [ ] **Step 11.3: Verify**

Reload. Hover each contact link — expect a brighter cyan + glow. Tab through with the keyboard — each link and each player control should show a focus ring.

- [ ] **Step 11.4: Commit**

```bash
git add index.html
git commit -m "feat: hover and focus-visible states for links and controls"
```

---

### Task 12: Royalty-Free Demo Tracks

**Files:**
- Create: `audio/track-01.mp3`
- Create: `audio/track-02.mp3`
- Create: `audio/track-03.mp3`
- Modify: `index.html` (update `tracks[]` titles to match real files)

The demo tracks come from Pixabay Music (https://pixabay.com/music/), which licenses its catalogue royalty-free for personal and commercial use under the Pixabay Content License — no attribution required, no signup required for the file URLs they host. Daniel can swap them at any time.

- [ ] **Step 12.1: Download three short instrumental tracks from Pixabay**

The engineer browses https://pixabay.com/music/search/instrumental/ and downloads three short instrumental tracks (~1–3 minutes each, preferably ambient or low-key so they pair with the calm aesthetic). Suggested workflow:

1. Open Pixabay Music in a browser
2. Filter for "Instrumental" + duration up to 3 minutes
3. Pick three tracks that fit a calm, modern, slightly synthy mood
4. Click each one's download button
5. Rename the downloaded files to `track-01.mp3`, `track-02.mp3`, `track-03.mp3`
6. Place them in `/Users/dplaschg/Projects/DP Homepage V2/audio/`
7. Note each track's title for the next step

Verify:

```bash
ls -lh "/Users/dplaschg/Projects/DP Homepage V2/audio/"
```

Expected: three `.mp3` files plus `.gitkeep`.

- [ ] **Step 12.2: Update `tracks` array titles in `index.html`**

In the `<script>` block, replace the `tracks` array with the actual track titles (and optionally artist if Pixabay lists one). Example shape (the engineer fills in the real titles):

```js
    // TODO: replace with your own tracks. You are responsible for the rights.
    const tracks = [
      { title: "ACTUAL TITLE 1", src: "audio/track-01.mp3" },
      { title: "ACTUAL TITLE 2", src: "audio/track-02.mp3" },
      { title: "ACTUAL TITLE 3", src: "audio/track-03.mp3" },
    ];
```

Titles should stay lowercase and short to fit the display.

- [ ] **Step 12.3: Live verification of the full player**

Reload the page. Walk through:

1. Track label shows the first track's title
2. Click **Play** — audio starts, icon swaps to pause, EQ bars animate, device glows cyan
3. Progress bar advances over time
4. Click somewhere along the progress bar — playback seeks to that position
5. Click **Next** — second track loads and starts playing automatically, label updates
6. Click **Previous** twice — wraps back to the last track
7. Let a track finish — next one starts automatically
8. Click **Pause** — audio pauses, icon swaps back to play, EQ freezes, glow fades

Each behaviour must work. If any fails, fix before commit.

- [ ] **Step 12.4: Commit**

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2"
git add audio/ index.html
git commit -m "feat: add 3 royalty-free demo tracks and wire titles"
```

---

### Task 13: Responsive Verification & README Finalization

**Files:**
- Modify: `README.md` (expand with track-license note and known-good viewports)

- [ ] **Step 13.1: Final screenshot pass at all target viewports**

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2/.research" && node screenshot.mjs http://localhost:4242/index.html ./verify-final
```

Review `desktop-full.png`, `desktop-hero.png`, `mobile-full.png`, `mobile-hero.png`. Checklist:

- [ ] Desktop (1440×900): glyph + name + tagline + microcopy + player + contact links all visible in a centered column, vertically balanced, generous breathing room
- [ ] Mobile (390×844): same vertical stack, no horizontal scroll, player fits within ~70% of viewport width, contact links don't wrap
- [ ] Cyan glow on background is subtle, not loud
- [ ] No element clipped or overflowing

If any viewport looks broken, fix the relevant CSS (likely `clamp()` ranges or `.stage` `width`) and re-run.

- [ ] **Step 13.2: Manually open in Safari and Firefox**

```bash
open -a "Safari" "http://localhost:4242/index.html"
open -a "Firefox" "http://localhost:4242/index.html"
```

Walk through the same player checklist from Task 12.3 in each browser. Common cross-browser pitfalls to watch:
- Safari: `prefers-reduced-motion` handling, `preconnect` quirks
- Firefox: font weight rendering may look slightly heavier — verify Inter Tight 200 still reads thin

- [ ] **Step 13.3: Finalize README**

Replace the contents of `/Users/dplaschg/Projects/DP Homepage V2/README.md` with:

```markdown
# Daniel Plaschg — Homepage

Single-file personal site. No build step, no dependencies.

## Preview locally

```bash
python3 -m http.server 4242
# then open http://localhost:4242/index.html
```

## Customize

### Social URLs
Open `index.html` and find the strings `# LINKEDIN_URL` and `# INSTAGRAM_URL`. Replace each with the real URL.

### Music tracks
1. Drop your MP3 / M4A files into `audio/`.
2. Edit the `tracks` array at the top of the `<script>` block in `index.html` — update `title` and `src` for each entry. Add or remove entries as needed.

**Important — music rights:** the bundled demo tracks come from Pixabay Music under the Pixabay Content License (royalty-free). If you replace them with anything else, you are responsible for ensuring you have the rights to host and play that music publicly. Owning a song on Spotify or having it in your iTunes library is not a license to stream it from your website.

## Verified browsers / viewports

Tested in Chrome, Safari, Firefox at 1440×900 (desktop), 1024×768 (tablet), 390×844 (iPhone-class).

## Deploying

Any static host works: Vercel drop, Netlify drag-and-drop, GitHub Pages, Cloudflare Pages, S3, or your own server. Upload the directory; serve `index.html` at the root.
```

- [ ] **Step 13.4: Final commit**

```bash
cd "/Users/dplaschg/Projects/DP Homepage V2"
git add README.md
git commit -m "docs: finalize README with customization and music-rights notes"
```

- [ ] **Step 13.5: Done — summary**

```bash
git log --oneline
ls -la "/Users/dplaschg/Projects/DP Homepage V2"
```

Expected: ~13 commits, the directory contains `index.html`, `audio/` (with 3 MP3s), `README.md`, `docs/`, `.gitignore`.

The site is ready: open `http://localhost:4242/index.html` and verify the final experience end-to-end.
