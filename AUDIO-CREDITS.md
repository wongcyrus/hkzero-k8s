# Recorded sound assets

Retrieved 2026-09-13 (M4A1 shot and city ambience added 2026-09-26). The six recorded sounds in this section are CC0 1.0:
https://creativecommons.org/publicdomain/zero/1.0/

- `shot.mp3`: The Free Firearm Sound Library, Ben Jaszczak, Brian Nelson, Kevin Heras, Matthew Nanney. AK-47/C_28P.wav, first single shot (0.605–1.705 s).
- `m4a1-shot.mp3`: same library, AR-15/D_32P.wav ("AR-15, M4, rifle, carbine, … 5.56x45, gunshot, near distance"; sha256 `acee9d2106b68fe5956225a19d7aedf943d97793817f9bda9d486a2b74b0a812`), first single shot (0.698–1.798 s), the same take distance and trim as `shot.mp3`. The player's M4A1 in Mong Kok single-player. Output sha256 `46a7454acd62bac61326eeb734f97e00f32a1dcc36056672c190539b2c1a21bc`.
- `enemy.mp3`: same library, 1911/A_34P.wav (1.535–3.035 s).
  Source: https://opengameart.org/content/the-free-firearm-sound-library
  Archive: https://opengameart.org/sites/default/files/Prepared%20SFX%20Library.7z (kept as `source/firearms.7z`, sha256 `cc1ab5a99a0a365105c7c5dd783f4b0b1fe90938114d3ceec53856bfe005f7d6`)
- `reload.mp3`: SpringySpringo, Gun reload sounds, assaultriflereload1_0.wav. Recorded airsoft-gun Foley, not an authentic AK reload recording.
  https://opengameart.org/content/gun-reload-sounds
- `hit.mp3`: Iwan 'qubodup' Gabovitch, Impact, qubodupImpactMeat01.flac. Used for hit and lower-pitched damage feedback.
  https://opengameart.org/content/impact
- `city-night.mp3`: softwalls, XY_City hum_Night_River_ambience.wav (Freesound 385104; "A quiet night city ambiance. Distant traffic hum.", Moscow, 2017, ZOOM H6 XY). Field recording from Moscow, not Hong Kong; the low city hum under gameplay.
  https://freesound.org/people/softwalls/sounds/385104/
  Downloaded 2026-09-26 as Freesound's public HQ preview (`https://cdn.freesound.org/previews/385/385104_6070740-hq.mp3`, 4,906,944 bytes, sha256 `9ae6192cd592bac3760178d74449afacf3699a623c8ced66bcd8881d0bfeb5c1`), kept outside the repository in `~/Projects/From Zero-assets/audio/ambience-2026-09-26/`.

Adaptations: trim, mono downmix, MP3 encoding, gunshot tail fades (`m4a1-shot.mp3`: `atrim=0.698:1.798, pan mono 0.5/0.5, aresample=44100, afade out st=0.22 d=0.26, volume +0.3 dB`, LAME 96 kb/s mono; −25.8 LUFS, peak −0.3 dBFS against `shot.mp3` −25.1 LUFS, −3.1 dBFS); `city-night.mp3`: 119.2–145.2 s, mono downmix, 7 kHz low-pass, the last 2 s cross-faded (equal power) into the start for a seamless 24 s loop, normalised to −30 LUFS, LAME 48 kb/s; runtime volume mixing and damage playback-rate adjustment (src/audio-mix.mjs). Original downloads remain in source/ (or outside the repository, as noted) for provenance and are not distributed with the game. These six MP3s and the three music cues below are embedded in desktop/mobile JavaScript, so file:// playback does not depend on external requests. No oscillator/noise-generated replacement sounds.

## Menu music

`nocturnal-pressure-v1.mp3`: **Nocturnal Pressure**, generated with Suno and supplied/selected by Arthur on 2026-09-19. Derived from the user-provided WAV: stereo 48 kHz, 160 kbps MP3, short edge fades. This music is separate from the CC0 sound effects above and is fetched on demand, not embedded in JavaScript. See `docs/audio/menu-music.md` in the source repository for processing details.

In-game music cues, cut on bar lines (126 BPM) from the same Suno original WAV, loudness-normalised to −16 LUFS, 48 kHz stereo 96 kb/s MP3; Suno's metadata comment is kept:

- `cue-boss.mp3` (boss entrance): 97.62–103.33 s, 30 ms fade-in, 1.1 s fade-out.
- `cue-victory.mp3` (level won): 114.76 s to the end, 30 ms fade-in, the track's own ending.
- `cue-defeat.mp3` (level lost): 0–6.19 s, 1.5 kHz low-pass, 2 s fade-out.

## Button sounds

Retrieved 2026-09-25. CC0 1.0 (https://creativecommons.org/publicdomain/zero/1.0/), by Kenney (www.kenney.nl); credit is not required but is given here.

- Hover: `click_004.ogg` from **Interface Sounds** — https://kenney.nl/assets/interface-sounds
- Press: `click1.ogg` from **UI Audio** — https://kenney.nl/assets/ui-audio
- Confirm: `switch1.ogg` from **UI Audio** — https://kenney.nl/assets/ui-audio

Adaptations: mono downmix, 48 kbps MP3 encoding, base64-embedded in `src/ui-sounds.mjs` (no separate file is shipped); leading encoder silence is skipped at playback. Original packs are kept outside the repository in `~/Projects/From Zero-assets/audio/kenney-ui-2026-09-25/`.
