import { DEVELOPER as D } from '../data/developer.js';
import GitHubActivity from '../components/GitHubActivity.jsx';
import FluidOrb from '../components/FluidOrb.jsx';
import { Reveal, Stagger, StaggerItem } from '../components/Motion.jsx';
import Journey from '../components/Journey.jsx';

const ghUser = 'Shubham-Tambei9';

export default function Developer() {
  return (
    <article className="detail">
      <section className="detail-hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap">
          <a className="back-link" href="#/">
            ← Back to studio
          </a>

          <div className="dev-hero">
            <div className="dev-hero-copy">
              <span className="eyebrow">Who builds this</span>
              <h1 className="dev-name">{D.name}</h1>
              <p className="dev-role">{D.role}</p>
              <p className="detail-lede">{D.intro}</p>

              <div className="hero-actions">
                <a className="btn btn-primary" href={`mailto:${D.email}`}>
                  Get in touch
                </a>
                <a className="btn btn-ghost" href={D.links[0].href} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>

            <div className="dev-orb">
              <FluidOrb size={280} />
            </div>
          </div>

          <div className="stats-grid" style={{ marginTop: 48 }}>
            {D.facts.map((f) => (
              <div className="stat spot" key={f.label}>
                <span className="stat-value" style={{ fontSize: 'clamp(20px, 2.4vw, 28px)' }}>
                  {f.value}
                </span>
                <span className="stat-label">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIO */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Background</span>
            <h2 className="section-title">One person, end to end.</h2>
            <div className="prose">
              {D.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* GITHUB */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Activity</span>
            <h2 className="section-title">Still shipping.</h2>
            <p className="section-sub">
              Pulled live from GitHub — this is whatever the graph says today, not a screenshot.
            </p>
            <div style={{ marginTop: 36 }}>
              <GitHubActivity user={ghUser} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* STACK */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Toolkit</span>
            <h2 className="section-title">What Arcadly is built with.</h2>
            <p className="section-sub">
              The subset actually used to ship this catalogue.
            </p>
          </Reveal>
          <Stagger className="stack-groups">
            {D.stack.map((g) => (
              <StaggerItem className="stack-group spot" key={g.group}>
                <span className="stack-group-title">{g.group}</span>
                <div className="stack-row" style={{ marginTop: 14 }}>
                  {g.items.map((i) => (
                    <span className="stack-chip" key={i}>
                      {i}
                    </span>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Journey />

      {/* CONTACT */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Elsewhere</span>
            <h2 className="section-title">Find me.</h2>
          </Reveal>
          <Stagger className="link-grid">
            {D.links.map((l) => (
              <StaggerItem key={l.label}>
                <a className="link-card spot" href={l.href} target="_blank" rel="noreferrer">
                  <span className="link-label">{l.label}</span>
                  <span className="link-handle">{l.handle}</span>
                  <span className="link-arrow">↗</span>
                </a>
              </StaggerItem>
            ))}
            <StaggerItem>
              <a className="link-card spot" href={`mailto:${D.email}`}>
                <span className="link-label">Email</span>
                <span className="link-handle">{D.email}</span>
                <span className="link-arrow">↗</span>
              </a>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </article>
  );
}
