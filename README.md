# Arcadly — Studio Site

Site for Arcadly, an indie studio building arcade and puzzle games for Android.
React + Vite, dark theme, no UI framework.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  data/         all content lives here — edit these, not the components
    studio.js       studio identity, principles, stack
    games.js        5 titles, incl. build status used by the pipeline
    apps.js         non-game apps (PassChat)
    devlog.js       posts, each a 4-part story
    developer.js    who builds it
    reviews.js      player reviews (see note below)
    config.js       feedback delivery
  components/
    play/         browser-playable slices of Sky Hopper, Pour, MineQuest
    Rail.jsx      shared travelling-packet animation (pipeline, approach, journey)
    Nav, ScrollRail, Backdrop, Analytics, Pipeline, Feedback, FluidOrb …
  pages/        Detail (games + apps), Post (dev log)
  styles.css    one stylesheet, CSS custom properties for the palette
```

## Playable demos

Each is a real implementation, not a video:

- **Sky Hopper** — canvas game loop, gravity, procedural obstacles, best score in `localStorage`
- **Pour** — boards are generated then beaten by a DFS solver before being shown, mirroring the real game's guarantee
- **MineQuest** — boards are generated then solved by a deduction-only solver; anything needing a guess is discarded

## Data honesty

Figures on this site are traceable:

- `progress` / `phase` per title are the studio's own build numbers, and the
  pipeline diagram derives each title's stage from them — the diagram cannot
  drift from the cards.
- Install counts come from the public Google Play listing, in Google's own
  bucket form (`50+`). There is no public analytics API, so nothing beyond the
  listing is shown.
- `reviews.js` is intentionally empty. The Play Store listing has too few
  ratings to publish any, so the section shows a "be the first" state rather
  than invented testimonials.

## Brand

`public/logo.svg` (mark), `logo-tile.svg` (tile / favicon / nav),
`logo-wordmark.svg` (lockup), `og.png` (1200×630 social card).
Palette: `#08090A` background, `#22c55e` accent.

## Feedback widget

With no backend, the widget opens the visitor's mail client pre-filled and says
so. To switch to a real POST, put a JSON form endpoint into
`FEEDBACK_ENDPOINT` in `src/data/config.js`.

## Deploy

Static build. On Vercel the framework is auto-detected; `vercel.json` sets asset
caching and security headers. Routing is hash-based, so no rewrites are needed.
