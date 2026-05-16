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

1. Drop your audio files (MP3 / M4A / WAV) into `audio/`.
2. Edit the `tracks` array at the top of the `<script>` block in `index.html` — update `title` and `src` for each entry. Add or remove entries as needed.

**Important — music rights:** the bundled demo files in `audio/` are original sine-wave test tones generated for this build (pure math output, no third-party content). If you replace them with anything else, you are responsible for ensuring you have the rights to host and play that audio publicly. Owning a song on Spotify or having it in your iTunes library is not a license to stream it from your own website. Safe sources include your own recordings, tracks from royalty-free libraries (e.g. Pixabay Music, Free Music Archive, Epidemic Sound) under their stated licenses, or anything you have an explicit license for.

## Verified browsers / viewports

Tested in Chrome at 1440×900 (desktop) and 390×844 (iPhone-class). Should work in any modern evergreen browser (Safari, Firefox, Chromium-based).

## Deploying

Any static host works: Vercel drop, Netlify drag-and-drop, GitHub Pages, Cloudflare Pages, S3, or your own server. Upload the directory; serve `index.html` at the root.
