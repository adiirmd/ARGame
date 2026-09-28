# AR Game

Portal game browser gratis. Semua game bisa langsung dimainkan tanpa install, tanpa akun, tanpa iklan.

Live di https://game.adiirmd.my.id

## Isi katalog

30 game saat ini, campuran dari original dan open source dengan lisensi yang jelas.

Original, dibikin buat proyek ini (MIT):

- Snake Arena
- Mind Tiles
- Reflex Rush

Open source, di-vendor dari repo upstream:

- 2048 (MIT, gabrielecirulli/2048)
- Hill Climb Racing (MIT, vibeopsde/vibeClimbRacing)
- Fish Eater (MIT, duckbrain/fish-eater)
- HTML5 Tower Defense (MIT, awalnya oldj/html5-tower-defense)
- Pimenta Sky Defender (MIT, izag8216/pimenta)
- Flappy Bird (MIT, vedantmerc/flappy-bird)
- Endless Runner (GPL-3.0, Zazilicious/endless_runner)
- HexGL (MIT, BKcore/HexGL)
- Hextris (GPL-3.0, Hextris/hextris)
- Astray (Unlicense, wwwtyro/Astray)
- Block Drop (MIT, llop/classic-tetris-js)
- Blockrain (MIT, Aerolab/blockrain.js)
- Bomber Blast (MIT, MattSkala/html5-bombergirl)
- Pac Chase (GPL-3.0, masonicGIT/pacman)
- Crossy Dash (MIT, GeekBoySupreme/crossy-road)
- Pixel Platformer (MIT, ZeroDayArcade/HTML5_Platformer)
- Chess AI (MIT, zeyu2001/chess-ai)
- Reversi (MIT, alex-berson/reversi)
- Gem Match (MIT, bazhanius/match-3-game)
- Bubble Shooter (MIT, rembound/Bubble-Shooter-HTML5)
- Evade and Destroy (MIT, mikkun/evade-and-destroy)
- Retro Racer (MIT, lrq3000/javascript-racer)
- Sokoban (MIT, klevze/sokoban)
- Connect Four (MIT, kenrick95/c4)
- Mahjong Solitaire (GPL-3.0, guhoffmann/simple-mahjong-solitaire)
- Sky Troops (MIT, dagnelies/skytroops)
- Billiards (GPL-3.0, tailuge/billiards)

Setiap game punya info sumber dan lisensi di halaman detailnya sendiri, plus file LICENSE upstream di dalam foldernya masing-masing. Nggak ada game yang diambil dari Friv, Poki, CrazyGames, games.co.id, atau situs sejenis tanpa izin.

### Catatan soal game yang di-vendor

- Nama merek dagang dihindari. Judul yang tampil ke pengguna dinetralkan (misalnya jadi Pac Chase, Bomber Blast, Block Drop), walaupun kode upstream-nya sendiri tetap utuh.
- Iklan dan tracker dibuang dari game yang bawaannya ada, yaitu Google AdSense dan Google Analytics di Hextris, HexGL, dan Blockrain.
- Library pihak ketiga di-vendor lokal (`public/games/<slug>/vendor/`) karena CSP situs ini pakai `default-src 'self'`, jadi resource dari CDN luar bakal diblokir browser.
- Game GPL-3.0 disajikan sebagai file statis di dalam iframe, terpisah dari kode aplikasi Next.js.

## Jalanin di lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Sebelum push

```bash
npm run typecheck
npm run lint
npm run test
npm run validate-games
```

Kalau semua lolos, baru build:

```bash
PUBLIC_SITE_URL=https://game.adiirmd.my.id npm run build
```

## Struktur singkat

- `src/data/games.ts` daftar semua game dan metadatanya
- `public/games/` file game asli (HTML/JS), disajikan langsung sebagai static file
- `src/middleware.ts` setup CSP dengan nonce, biar hydration Next.js tetap jalan tanpa perlu unsafe-inline
- `src/components/GamePlayer.tsx` player iframe yang dipakai semua halaman game

## Deploy

Server jalan di Debian, Next.js dijalankan lewat systemd (`ar-game.service`) dan diakses lewat reverse proxy Apache2. Domain publik dilewatkan Cloudflare Tunnel.
