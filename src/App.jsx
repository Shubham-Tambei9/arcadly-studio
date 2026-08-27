import { useEffect, useRef, useState } from 'react';
import { STUDIO, STATS, PILLARS, STACK } from './data/studio.js';
import { GAMES, getGame } from './data/games.js';
import { APPS, getApp } from './data/apps.js';
import { DEVLOG } from './data/devlog.js';
import GameCard from './components/GameCard.jsx';
import Analytics from './components/Analytics.jsx';
import ReviewsSection from './components/Reviews.jsx';
import Detail from './pages/Detail.jsx';
import Backdrop from './components/Backdrop.jsx';
import ScrollRail from './components/ScrollRail.jsx';
import Nav from './components/Nav.jsx';
import FluidOrb from './components/FluidOrb.jsx';
import Developer from './pages/Developer.jsx';
import Pipeline from './components/Pipeline.jsx';
import Post from './pages/Post.jsx';
import Feedback from './components/Feedback.jsx';
import Approach from './components/Approach.jsx';
import { Reveal, Stagger, StaggerItem } from './components/Motion.jsx';

const NAV = [
  { id: 'games', label: 'Games' },
  { id: 'apps', label: 'Apps' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'devlog', label: 'Dev Log' },
];

const liveGame = GAMES.find((g) => g.playStoreUrl);
// Counted, not written out: the sentence under the games grid used to say
// "four in active development" and went stale the moment a game was added.
const LIVE_COUNT = GAMES.filter((g) => g.playStoreUrl).length;

const RAIL_SECTIONS = [
  { id: 'analytics', label: 'Analytics' },
  { id: 'approach', label: 'Approach' },
  { id: 'games', label: 'Games' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'apps', label: 'Apps' },
  { id: 'devlog', label: 'Dev Log' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'stack', label: 'Stack' },
];

/* Hash routing.
   The hash carries a route and, optionally, a section: "#/route#section".
   Splitting them means section links stay deep-linkable and shareable while the
   router still knows which page to render. Scroll behaviour is decided here in
   one place: jump to the section when there is one, otherwise go to the top. */
function parseHash(h) {
  const raw = (h || '#/').replace(/^#/, '');
  const [routeRaw, section] = raw.split('#');
  return { route: routeRaw || '/', section: section || null };
}

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');
  // Remembers which page we were on, so clearing a section never counts as
  // navigation and therefore never yanks the view back to the top.
  const prevRoute = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const onChange = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const { route, section } = parseHash(hash);

  useEffect(() => {
    // Let the new route paint before measuring the target's position.
    const id = requestAnimationFrame(() => {
      const routeChanged = prevRoute.current !== route;
      prevRoute.current = route;

      if (section) {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Drop the section so a later reload starts at the top again, and keep
          // React in step: replaceState fires no hashchange, so without this the
          // stored hash would stay stale and clicking the same link a second
          // time would produce no state change — and therefore no scroll.
          const clean = `#${route}`;
          window.history.replaceState(null, '', clean);
          setHash(clean);
          return;
        }
      }
      // Only reset on a real page change. Without this guard the cleanup above
      // re-enters here with section === null and cancels the scroll it just did.
      if (routeChanged) window.scrollTo({ top: 0, behavior: 'auto' });
    });
    return () => cancelAnimationFrame(id);
  }, [route, section]);

  return { hash, route, section };
}

function Shell({ children, isHome }) {
  return (
    <>
      <Backdrop />
      <Feedback />
      <ScrollRail sections={isHome ? RAIL_SECTIONS : []} />
      <Nav
        links={NAV}
        brand={{ name: STUDIO.name, logo: '/logo-tile.svg' }}
        cta={liveGame ? { href: liveGame.playStoreUrl, label: 'Play now' } : null}
        extra={{ href: '#/developer', label: 'Developer' }}
      />

      {children}

      <footer className="footer">
        <div className="wrap">
          <div className="footer-inner">
            <div className="footer-brand">
              <a className="brand" href="#/">
                <img src="/logo-tile.svg" alt="" />
                {STUDIO.name}
              </a>
              <p className="section-sub" style={{ fontSize: 13.5 }}>
                {STUDIO.tagline}
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-col">
                <span className="footer-col-title">Games</span>
                {GAMES.map((g) => (
                  <a key={g.id} href={`#/game/${g.id}`}>
                    {g.title}
                  </a>
                ))}
              </div>

              <div className="footer-col">
                <span className="footer-col-title">Apps</span>
                {APPS.map((a) => (
                  <a key={a.id} href={`#/app/${a.id}`}>
                    {a.title}
                  </a>
                ))}
              </div>

              <div className="footer-col">
                <span className="footer-col-title">Legal</span>
                {[...GAMES, ...APPS]
                  .filter((g) => g.privacyUrl)
                  .map((g) => (
                    <a key={g.id} href={g.privacyUrl} target="_blank" rel="noreferrer">
                      {g.title} Privacy
                    </a>
                  ))}
                <a href="#/developer">About the developer</a>
                <a href={STUDIO.playStoreDeveloper} target="_blank" rel="noreferrer">
                  Google Play developer
                </a>
              </div>
            </div>
          </div>

          <p className="footer-note">{STUDIO.copyright}</p>
        </div>
      </footer>
    </>
  );
}

function Home() {
  return (
    <main id="top">
      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap hero-inner">
          {liveGame && (
            <a className="hero-badge" href={liveGame.playStoreUrl} target="_blank" rel="noreferrer">
              <span className="dot" aria-hidden="true" />
              {liveGame.title} is live on Google Play
            </a>
          )}
          <span className="hero-kicker">{STUDIO.kicker}</span>
          <h1 className="hero-title">{STUDIO.name}</h1>
          <p className="hero-tagline">{STUDIO.tagline}</p>
          <p className="hero-blurb">{STUDIO.blurb}</p>
          <div className="hero-orb" aria-hidden="true">
            <FluidOrb size={340} />
          </div>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#/#games">
              Explore games
            </a>
            <a className="btn btn-ghost" href="#/#apps">
              See our apps
            </a>
          </div>
        </div>
      </section>

      {/* ANALYTICS */}
      <Analytics />

      {/* APPROACH */}
      <Approach />

      {/* GAMES */}
      <section className="section" id="games">
        <div className="wrap">
          <span className="eyebrow">The titles</span>
          <h2 className="section-title">
            More challenges
            <br />
            from our lab.
          </h2>
          <p className="section-sub">
            {GAMES.length} games in the catalogue — {LIVE_COUNT} live on Google Play,{' '}
            {GAMES.length - LIVE_COUNT} in active development.
          </p>
          <Stagger className="games-grid">
            {GAMES.map((g) => (
              <StaggerItem key={g.id}>
                <GameCard game={g} href={`#/game/${g.id}`} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PIPELINE */}
      <Pipeline />

      {/* APPS */}
      <section className="section" id="apps">
        <div className="wrap">
          <span className="eyebrow">Beyond games</span>
          <h2 className="section-title">Apps we build.</h2>
          <p className="section-sub">
            The studio isn&rsquo;t only arcade cabinets — we ship tools too.
          </p>
          <div className="games-grid">
            {APPS.map((a) => (
              <GameCard key={a.id} game={a} href={`#/app/${a.id}`} />
            ))}
          </div>
        </div>
      </section>

      {/* DEV LOG */}
      <section className="section" id="devlog">
        <div className="wrap">
          <span className="eyebrow">The dev log</span>
          <h2 className="section-title">
            Behind the scenes
            <br />
            at Arcadly.
          </h2>
          <p className="section-sub">
            Engineering notes, audio experiments, and build-pipeline war stories.
          </p>
          <Stagger className="log-grid">
            {DEVLOG.map((post) => (
              <StaggerItem key={post.id}>
                <a className="log spot log-link" href={`#/log/${post.id}`}>
                  <div className="log-meta">
                    <span className="log-cat">{post.category}</span>
                    <span className="log-date">{post.date}</span>
                  </div>
                  <h3 className="log-title">{post.title}</h3>
                  <p className="log-excerpt">{post.excerpt}</p>
                  <span className="log-foot">
                    <span className="log-parts">
                      {post.story.length}-part story · {post.readTime}
                    </span>
                    <span className="log-more">Read →</span>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewsSection storeUrl={liveGame?.playStoreUrl} />

      {/* STACK */}
      <section className="section" id="stack">
        <div className="wrap">
          <span className="eyebrow">The lab</span>
          <h2 className="section-title">Our power sources.</h2>
          <p className="section-sub">
            High-performance code and artistic precision, building the next generation of arcade
            classics.
          </p>
          <div className="stack-row">
            {STACK.map((s) => (
              <span className="stack-chip spot" key={s}>
                {s}
              </span>
            ))}
          </div>
          <p className="stats-source" style={{ marginTop: 32 }}>
            {STATS.source}
          </p>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const { route } = useHashRoute();
  const gameMatch = route.match(/^\/game\/([\w-]+)/);
  const appMatch = route.match(/^\/app\/([\w-]+)/);
  const logMatch = route.match(/^\/log\/([\w-]+)/);
  const isDeveloper = route.startsWith('/developer');

  let content;
  if (isDeveloper) content = <Developer />;
  else if (gameMatch) content = <Detail item={getGame(gameMatch[1])} />;
  else if (appMatch) content = <Detail item={getApp(appMatch[1])} />;
  else if (logMatch) content = <Post post={DEVLOG.find((d) => d.id === logMatch[1])} />;
  else content = <Home />;

  return (
    <Shell isHome={!gameMatch && !appMatch && !logMatch && !isDeveloper}>{content}</Shell>
  );
}
