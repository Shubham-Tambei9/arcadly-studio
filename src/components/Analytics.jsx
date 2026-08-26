import { GAMES } from '../data/games.js';
import { APPS } from '../data/apps.js';
import { STATS } from '../data/studio.js';
import { Reveal, GrowBar } from './Motion.jsx';

/* Derived from the catalogue itself, so these can never drift from the cards
   below. "50+" is Google Play's own public bucket for com.srt.skyhopper. */
const KPIS = [
  { value: String(GAMES.length), label: 'Games in catalogue' },
  { value: String(APPS.length), label: 'Apps in catalogue' },
  { value: String(GAMES.filter((g) => g.playStoreUrl).length), label: 'Live on Google Play' },
  { value: '50+', label: 'Total installs' },
];

/* Every figure plotted here is derived from data already on this site:
   per-game build progress, catalogue status counts, and dev-log post dates.
   Nothing is estimated or projected. */

const STATUS_ORDER = [
  { key: 'live', label: 'Live on Play', className: 'seg-live' },
  { key: 'dev', label: 'In development', className: 'seg-dev' },
  { key: 'soon', label: 'Coming soon', className: 'seg-soon' },
];

function statusCounts() {
  return STATUS_ORDER.map((s) => ({
    ...s,
    count: GAMES.filter((g) => g.status === s.key).length,
  })).filter((s) => s.count > 0);
}

export default function Analytics() {
  const statuses = statusCounts();
  const total = GAMES.length;
  const byProgress = [...GAMES].sort((a, b) => b.progress - a.progress);

  return (
    <section className="section" id="analytics">
      <div className="wrap">
        <span className="eyebrow">Studio analytics</span>
        <h2 className="section-title">The numbers,<br />not the pitch.</h2>
        <p className="section-sub">
          Build status across the catalogue. Install figures come straight from the public
          Google Play listing.
        </p>

        {/* KPI ROW */}
        <div className="stats-head" style={{ marginTop: 44 }}>
          <span className="stats-label">At a glance</span>
          <span className="stats-asof">as of {STATS.asOf}</span>
        </div>
        <div className="stats-grid">
          {KPIS.map((s) => (
            <div className="stat spot" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <Reveal className="chart-grid">
          {/* CHART 1 — build progress per title */}
          <figure className="chart-card spot">
            <figcaption className="chart-head">
              <span className="chart-title">Build progress by title</span>
              <span className="chart-note">Studio build status</span>
            </figcaption>
            <div className="bars">
              {byProgress.map((g) => (
                <div className="bar-row" key={g.id}>
                  <span className="bar-label">{g.title}</span>
                  <div className="bar-track">
                    <GrowBar className="bar-fill" pct={g.progress} />
                  </div>
                  <span className="bar-value">{g.progress}%</span>
                </div>
              ))}
            </div>
          </figure>

          {/* CHART 2 — catalogue composition */}
          <figure className="chart-card spot">
            <figcaption className="chart-head">
              <span className="chart-title">Catalogue status</span>
              <span className="chart-note">{total} titles</span>
            </figcaption>

            <div
              className="stack"
              role="img"
              aria-label={statuses.map((s) => `${s.label}: ${s.count} of ${total}`).join('; ')}
            >
              {statuses.map((s) => (
                <GrowBar
                  key={s.key}
                  className={`stack-seg ${s.className}`}
                  pct={(s.count / total) * 100}
                />
              ))}
            </div>

            <ul className="legend">
              {statuses.map((s) => (
                <li key={s.key}>
                  <span className={`legend-key ${s.className}`} aria-hidden="true" />
                  <span className="legend-label">{s.label}</span>
                  <span className="legend-value">{s.count}</span>
                </li>
              ))}
            </ul>
          </figure>

        </Reveal>

        <p className="stats-source">{STATS.source}</p>
      </div>
    </section>
  );
}
