// Query Apple's iTunes Search API to find each song and grab its official
// 30-second previewUrl. Apple makes these previews freely available for
// exactly this kind of embedding — no auth, no key, no licensing fees.

const songs = [
  { q: "Crosby Stills Nash Young Almost Cut My Hair" },
  { q: "Dick Dale Misirlou" },
  { q: "The Atlantics Bombora" },
  { q: "The Sonics Have Love Will Travel" },
  { q: "Kavinsky Nightcall" },
  { q: "Iron Maiden The Number of the Beast" },
  { q: "Pink Floyd Breathe" },
  { q: "Cream White Room" },
  { q: "Pink Floyd Time" },
  { q: "Hubert von Goisern Kokain Blues" },
  { q: "Canned Heat Going up the Country" },
  { q: "Shocking Blue Venus" },
  { q: "Link Wray Rumble" },
  { q: "Paul Kalkbrenner Altes Kamuffel" },
  { q: "Bachman Turner Overdrive You Ain't Seen Nothing Yet" },
  { q: "Deep Purple Child in Time" },
  { q: "The Doors L.A. Woman" },
  { q: "The Trashmen Surfin' Bird" },
  { q: "Black Rebel Motorcycle Club Ain't No Easy Way" },
];

const results = [];

for (const song of songs) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(song.q)}&entity=song&limit=5`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    // Pick the first result with a previewUrl
    const hit = (data.results || []).find((r) => r.previewUrl);
    if (!hit) {
      console.error(`NO MATCH: ${song.q}`);
      results.push({ query: song.q, match: null });
      continue;
    }
    results.push({
      query: song.q,
      title: hit.trackName,
      artist: hit.artistName,
      previewUrl: hit.previewUrl,
    });
    console.error(`OK: ${hit.artistName} — ${hit.trackName}`);
  } catch (e) {
    console.error(`ERROR for "${song.q}":`, e.message);
    results.push({ query: song.q, match: null });
  }
  // Polite delay to stay well under iTunes rate limits
  await new Promise((r) => setTimeout(r, 250));
}

console.log(JSON.stringify(results, null, 2));
