"""Generate three short, original sine-wave demo tones as WAV files.

Pure math output — no audio assets are referenced or downloaded. The tones are
placeholders so the player has something to play out-of-the-box; the owner of
the site is expected to swap them for their own rights-cleared music.
"""

import math
import os
import struct
import wave

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "audio")
os.makedirs(OUT_DIR, exist_ok=True)

SAMPLE_RATE = 44100
CHANNELS = 1
SAMPLE_WIDTH = 2  # 16-bit


def envelope(t: float, duration: float) -> float:
    """Soft fade-in and fade-out so the tones don't click on start/end."""
    fade = min(0.3, duration / 4)
    if t < fade:
        return t / fade
    if t > duration - fade:
        return max(0.0, (duration - t) / fade)
    return 1.0


def write_tone(path: str, freq_hz: float, duration_s: float, amplitude: float = 0.15) -> None:
    n_samples = int(SAMPLE_RATE * duration_s)
    with wave.open(path, "wb") as f:
        f.setnchannels(CHANNELS)
        f.setsampwidth(SAMPLE_WIDTH)
        f.setframerate(SAMPLE_RATE)
        frames = bytearray()
        for i in range(n_samples):
            t = i / SAMPLE_RATE
            env = envelope(t, duration_s)
            # Two-frequency add to make it less harsh than a pure sine
            sample = (
                amplitude * env * (
                    0.7 * math.sin(2 * math.pi * freq_hz * t)
                    + 0.3 * math.sin(2 * math.pi * freq_hz * 1.5 * t)
                )
            )
            value = int(max(-1.0, min(1.0, sample)) * 32767)
            frames.extend(struct.pack("<h", value))
        f.writeframes(bytes(frames))


tones = [
    ("track-01.wav", 220.0, 8.0),  # A3 — warm low
    ("track-02.wav", 330.0, 8.0),  # E4 — mid
    ("track-03.wav", 440.0, 8.0),  # A4 — bright
]

for name, freq, dur in tones:
    out_path = os.path.join(OUT_DIR, name)
    write_tone(out_path, freq, dur)
    print(f"wrote {out_path} ({freq:.0f} Hz, {dur:.1f}s)")
