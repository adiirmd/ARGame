# AR Game

Portal game browser gratis. Semua game bisa langsung dimainkan tanpa install, tanpa akun, tanpa iklan.

Live di https://game.adiirmd.my.id

## Isi katalog

10 game saat ini, campuran dari original dan open source dengan lisensi yang jelas:

- 2048 (MIT, gabrielecirulli/2048)
- Snake Arena (original)
- Mind Tiles (original)
- Reflex Rush (original)
- Hill Climb Racing (MIT, vibeopsde/vibeClimbRacing)
- Fish Eater (MIT, duckbrain/fish-eater)
- HTML5 Tower Defense (MIT, awalnya oldj/html5-tower-defense)
- Pimenta Sky Defender (MIT, izag8216/pimenta)
- Flappy Bird (MIT, vedantmerc/flappy-bird)
- Endless Runner (GPL-3.0, Zazilicious/endless_runner)

Setiap game punya info sumber dan lisensi di halaman detailnya sendiri. Nggak ada game yang diambil dari Friv, Poki, CrazyGames, atau situs sejenis tanpa izin.

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
