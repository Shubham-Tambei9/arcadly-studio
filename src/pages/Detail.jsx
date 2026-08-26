import { ReviewList } from '../components/Reviews.jsx';
import { getDemo } from '../components/play/registry.jsx';

export default function Detail({ item }) {
  if (!item) {
    return (
      <div className="wrap" style={{ padding: '120px 24px' }}>
        <h1 className="section-title">Not found.</h1>
        <p className="section-sub" style={{ marginBottom: 28 }}>
          That title isn&rsquo;t in the catalogue.
        </p>
        <a className="btn btn-primary" href="#/">
          Back to studio
        </a>
      </div>
    );
  }

  const isApp = item.kind === 'app';
  const demo = getDemo(item.id);
  const Demo = demo?.Component;

  return (
    <article className="detail">
      {/* HERO */}
      <section className="detail-hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap detail-hero-inner">
          <a className="back-link" href="#/">
            ← All {isApp ? 'apps' : 'games'}
          </a>

          <div className="detail-hero-top">
            <img className="detail-icon" src={item.icon} alt={`${item.title} icon`} />
            <div>
              <span className="detail-kicker">Developed by {item.meta.publisher}</span>
              <h1 className="detail-title">{item.heroTitle}</h1>
              {item.heroSub && <p className="detail-sub">{item.heroSub}</p>}
              <span className={`status status-${item.status}`}>
                {item.status === 'live' && <span className="dot" aria-hidden="true" />}
                {item.statusLabel}
              </span>
            </div>
          </div>

          <p className="detail-lede">{item.description}</p>

          <div className="hero-actions">
            {item.playStoreUrl ? (
              <a className="btn btn-primary" href={item.playStoreUrl} target="_blank" rel="noreferrer">
                ▶ Get it on Google Play
              </a>
            ) : (
              <span className="btn btn-ghost" style={{ cursor: 'default' }}>
                {item.statusLabel}
              </span>
            )}
            {Demo && (
              <a
                className="btn btn-ghost"
                href="#play"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('play')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Play in browser
              </a>
            )}
            {item.privacyUrl && (
              <a className="btn btn-ghost" href={item.privacyUrl} target="_blank" rel="noreferrer">
                Privacy policy
              </a>
            )}
          </div>

          {!!item.statTiles?.length && (
            <div className="stats-grid" style={{ marginTop: 48 }}>
              {item.statTiles.map((s) => (
                <div className="stat spot" key={s.label}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PLAYABLE DEMO */}
      {Demo && (
        <section className="section" id="play">
          <div className="wrap play-split">
            <div className="play-copy">
              <span className="eyebrow">Play it here</span>
              <h2 className="section-title">Try it in your browser.</h2>
              <p className="section-sub">{demo.blurb}</p>
              <p className="play-note">
                No install, no account — this runs entirely on your device.
              </p>
            </div>
            <div className="demo-wrap">
              <Demo />
            </div>
          </div>
        </section>
      )}

      {/* ABOUT */}
      {!!item.about?.length && (
        <section className="section">
          <div className="wrap">
            <span className="eyebrow">About the {isApp ? 'app' : 'game'}</span>
            <h2 className="section-title">{item.tagline}</h2>
            <div className="prose">
              {item.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURES */}
      {!!item.features?.length && (
        <section className="section">
          <div className="wrap">
            <span className="eyebrow">Features</span>
            <h2 className="section-title">What makes it different.</h2>
            <div className="pillar-grid">
              {item.features.map((f) => (
                <div className="pillar spot" key={f.title}>
                  <div className="pillar-title">
                    <span className="dot" aria-hidden="true" />
                    {f.title}
                  </div>
                  <p className="pillar-body">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW IT PLAYS / WORKS */}
      {!!item.howItPlays?.length && (
        <section className="section">
          <div className="wrap">
            <span className="eyebrow">{isApp ? 'How it works' : 'How it plays'}</span>
            <h2 className="section-title">
              {item.howItPlaysTitle || (isApp ? 'Three steps.' : 'Simple rules. Real depth.')}
            </h2>
            {item.howItPlaysSub && <p className="section-sub">{item.howItPlaysSub}</p>}
            <div className="steps">
              {item.howItPlays.map((s) => (
                <div className="step spot" key={s.n}>
                  <span className="step-n">{s.n}</span>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-body">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BUILD STATUS (apps) */}
      {item.buildStatus && (
        <section className="section">
          <div className="wrap">
            <span className="eyebrow">{item.buildStatus.eyebrow}</span>
            <h2 className="section-title">{item.buildStatus.title}</h2>
            <p className="section-sub">{item.buildStatus.sub}</p>
            <ul className="phases">
              {item.buildStatus.phases.map((p) => (
                <li className={`phase ${p.done ? 'phase-done' : 'phase-open'}`} key={p.label}>
                  <span className="phase-mark" aria-hidden="true">
                    {p.done ? '✓' : '!'}
                  </span>
                  <span className="phase-label">{p.label}</span>
                  {p.note && <span className="phase-note">{p.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* EXTRA SECTION */}
      {item.extra && (
        <section className="section">
          <div className="wrap">
            <span className="eyebrow">{item.extra.eyebrow}</span>
            <h2 className="section-title">{item.extra.title}</h2>
            {item.extra.sub && <p className="section-sub">{item.extra.sub}</p>}
            <div className="pillar-grid">
              {item.extra.items.map((it) => (
                <div className="pillar spot" key={it.label}>
                  <div className="extra-value">{it.value}</div>
                  <div className="extra-label">{it.label}</div>
                  <p className="pillar-body">{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ADS / STUCK SECTION */}
      {item.ads && (
        <section className="section">
          <div className="wrap">
            <span className="eyebrow">{item.ads.eyebrow}</span>
            <h2 className="section-title">{item.ads.title}</h2>
            <div className="pillar-grid">
              {item.ads.items.map((it) => (
                <div className="pillar spot" key={it.label}>
                  <div className="pillar-title">
                    <span className="dot" aria-hidden="true" />
                    {it.label}
                  </div>
                  <p className="pillar-body">{it.body}</p>
                </div>
              ))}
            </div>
            {item.ads.note && (
              <p className="section-sub" style={{ marginTop: 24 }}>
                {item.ads.note}
              </p>
            )}
          </div>
        </section>
      )}

      {/* STACK */}
      {!!item.stack?.length && (
        <section className="section">
          <div className="wrap">
            <span className="eyebrow">Built with</span>
            <h2 className="section-title">Under the hood.</h2>
            <div className="stack-row">
              {item.stack.map((s) => (
                <span className="stack-chip spot" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REVIEWS */}
      <section className="section">
        <div className="wrap">
          <span className="eyebrow">Players</span>
          <h2 className="section-title">Reviews.</h2>
          <div style={{ marginTop: 32 }}>
            <ReviewList gameId={item.id} storeUrl={item.playStoreUrl} compact />
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      {item.disclaimer && (
        <section className="section">
          <div className="wrap">
            <div className="disclaimer">
              <span className="disclaimer-tag">Please read</span>
              <p>{item.disclaimer}</p>
            </div>
          </div>
        </section>
      )}

      {/* META */}
      <section className="section">
        <div className="wrap">
          <div className="meta-grid">
            {Object.entries(item.meta).map(([k, v]) => (
              <div className="meta-item spot" key={k}>
                <span className="meta-label">{k.replace(/([A-Z])/g, ' $1')}</span>
                <span className="meta-value">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
