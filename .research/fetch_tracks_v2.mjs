// Second batch of tracks — same approach: query Apple's iTunes Search API,
// grab the publicly-provided 30-second previewUrl for each track.

const songs = [
  { q: "Kaleo Way Down We Go", display: { title: "way down we go", artist: "kaleo" } },
  { q: "Manu Chao Me gustas tu", display: { title: "me gustas tú", artist: "manu chao" } },
  { q: "Chimango Afrika", display: { title: "afrika", artist: "chimango" } },
  { q: "Eagles of Death Metal Wannabe in LA", display: { title: "wannabe in l.a.", artist: "eagles of death metal" } },
  { q: "Tocotronic Aber hier leben nein danke", display: { title: "aber hier leben, nein danke", artist: "tocotronic" } },
  { q: "Neil Young Hey Hey My My", display: { title: "hey hey, my my", artist: "neil young" } },
  { q: "America A Horse with No Name", display: { title: "a horse with no name", artist: "america" } },
  { q: "Kula Shaker Govinda", display: { title: "govinda", artist: "kula shaker" } },
  { q: "The Black Keys Lonely Boy", display: { title: "lonely boy", artist: "the black keys" } },
  { q: "The Who Pinball Wizard", display: { title: "pinball wizard", artist: "the who" } },
  { q: "Roger Waters 4:41 AM", display: { title: "4:41 am", artist: "roger waters" } },
  { q: "Kiss Detroit Rock City", display: { title: "detroit rock city", artist: "kiss" } },
  { q: "Led Zeppelin Achilles Last Stand", display: { title: "achilles last stand", artist: "led zeppelin" } },
  { q: "Dio Rainbow in the Dark", display: { title: "rainbow in the dark", artist: "dio" } },
  { q: "Patrice Soulstorm", display: { title: "soulstorm", artist: "patrice" } },
  { q: "Herman's Hermits No Milk Today", display: { title: "no milk today", artist: "herman's hermits" } },
  { q: "Eagles Hotel California", display: { title: "hotel california", artist: "eagles" } },
  { q: "Pink Floyd Shine On You Crazy Diamond", display: { title: "shine on you crazy diamond", artist: "pink floyd" } },
  { q: "AC/DC Hells Bells", display: { title: "hells bells", artist: "ac/dc" } },
  { q: "Jimi Hendrix Voodoo Child Live Woodstock", display: { title: "voodoo child (live at woodstock)", artist: "jimi hendrix" } },
  { q: "JJ Cale Call Me the Breeze", display: { title: "call me the breeze", artist: "jj cale" } },
  { q: "Eric Clapton Cocaine", display: { title: "cocaine", artist: "eric clapton" } },
];

const results = [];

for (const song of songs) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(song.q)}&entity=song&limit=5`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const hit = (data.results || []).find((r) => r.previewUrl);
    if (!hit) {
      console.error(`NO MATCH: ${song.q}`);
      results.push({ ...song, match: null });
      continue;
    }
    results.push({
      query: song.q,
      display: song.display,
      apiTitle: hit.trackName,
      apiArtist: hit.artistName,
      previewUrl: hit.previewUrl,
    });
    console.error(`OK: ${hit.artistName} — ${hit.trackName}`);
  } catch (e) {
    console.error(`ERROR for "${song.q}":`, e.message);
    results.push({ ...song, match: null });
  }
  await new Promise((r) => setTimeout(r, 250));
}

// Print the tracks array entries ready to paste
console.log("\n=== READY-TO-PASTE TRACK ENTRIES ===\n");
for (const r of results) {
  if (!r.previewUrl) {
    console.log(`      // NOT FOUND: ${r.q}`);
    continue;
  }
  const title = r.display.title.replace(/"/g, '\\"');
  const artist = r.display.artist.replace(/"/g, '\\"');
  console.log(`      { title: "${title}", artist: "${artist}", src: "${r.previewUrl}" },`);
}
