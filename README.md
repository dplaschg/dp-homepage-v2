# Daniel Plaschg — Homepage

Single-file personal site. No build step, no dependencies.

## Preview locally

```bash
python3 -m http.server 4242
# then open http://localhost:4242/index.html
```

## Customize

### Social URLs

The Instagram and LinkedIn anchors live inside the `<p class="microcopy">` paragraph in `index.html`. Replace the `href` values to point elsewhere.

### Music tracks

The player streams 30-second song previews from Apple's iTunes catalogue. Apple publishes these `previewUrl` endpoints for free public embedding — no key, no auth, no licensing fees on your end.

To add, remove, or replace a track:

1. Find the track on the iTunes Search API:
   `https://itunes.apple.com/search?term=<artist+title>&entity=song&limit=5`
2. Copy any result's `previewUrl`, `trackName`, and `artistName`.
3. Edit the `tracks` array at the top of the `<script>` block in `index.html`. Each entry: `{ title, artist, src }`.

If you'd rather host your own audio files (full-length or otherwise), drop them into `audio/`, set `src: "audio/your-file.mp3"`, and make sure you have the rights to stream them publicly. Owning a song on Spotify or having it in your iTunes library is not a license to host it on your own site.

## Verified browsers / viewports

Tested in Chrome at 1440×900 (desktop) and 390×844 (iPhone-class). Should work in any modern evergreen browser (Safari, Firefox, Chromium-based).

## Deploying

Currently deployed on Vercel at `https://dp-homepage-v2.vercel.app`. Any other static host works too: Netlify drag-and-drop, GitHub Pages, Cloudflare Pages, S3, or your own server. Upload the directory; serve `index.html` at the root.
