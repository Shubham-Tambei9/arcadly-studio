import { useRef } from 'react';
import { useSequence, useRailGeometry, RailLine, nodeState } from './Rail.jsx';
import { GAMES } from '../data/games.js';
import { APPS } from '../data/apps.js';

/* How a title moves from idea to store, with the real catalogue placed on it.
   Stage assignment is derived from each title's own `progress` figure — the same
   number shown on its card — so this diagram cannot drift from the rest of the site.

   The animation is a packet travelling the rail: it advances stage by stage once
   the section is in view, pausing at each node. Purely decorative; the stage
   contents are readable with no motion at all. */

const STAGES = [
  { id: 'proto', label: 'Prototype', note: 'Core loop in Unity or Flutter', min: 0 },
  { id: 'build', label: 'Build', note: 'Systems, generators, solvers', min: 50 },
  { id: 'test', label: 'Test', note: 'Every level verified solvable', min: 75 },
  { id: 'store', label: 'Store prep', note: 'Listing, policy, ad config', min: 88 },
  { id: 'live', label: 'Live', note: 'Shipped on Google Play', min: 100 },
];

const CATALOGUE = [...GAMES, ...APPS].filter((t) => typeof t.progress === 'number');

function stageFor(progress) {
  let idx = 0;
  STAGES.forEach((s, i) => {
    if (progress >= s.min) idx = i;
  });
  return idx;
}

export default function Pipeline() {
  const ref = useRef(null);
  const railRef = useRef(null);
  const head = useSequence(ref, STAGES.length);
  const points = useRailGeometry(railRef, '.pipe-node');

  return (
    <section className="section" id="pipeline" ref={ref}>
      <div className="wrap">
        <span className="eyebrow">How a title ships</span>
        <h2 className="section-title">
          Idea to store,
          <br />
          one rail.
        </h2>
        <p className="section-sub">
          Every title in the catalogue sits somewhere on this rail. Positions come from the same
          build figures shown on each card — nothing here is a mock-up.
        </p>

        <div className="pipe" ref={railRef}>
          <RailLine head={head} points={points} />

          <ol className="pipe-stages">
            {STAGES.map((s, i) => {
              const here = CATALOGUE.filter((t) => stageFor(t.progress) === i);
              return (
                <li
                  key={s.id}
                  className={`pipe-stage pipe-stage-${nodeState(i, head)}`}
                >
                  <div className="pipe-node" aria-hidden="true">
                    <span className="pipe-node-core" />
                  </div>

                  <div className="pipe-stage-inner">
                  <span className="pipe-stage-idx">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="pipe-stage-label">{s.label}</h3>
                  <p className="pipe-stage-note">{s.note}</p>

                  <div className="pipe-titles">
                    {here.length ? (
                      here.map((t) => (
                        <a
                          key={t.id}
                          className="pipe-chip"
                          href={`#/${t.kind === 'app' ? 'app' : 'game'}/${t.id}`}
                        >
                          <img src={t.icon} alt="" loading="lazy" />
                          <span className="pipe-chip-name">{t.title}</span>
                          <span className="pipe-chip-pct">{t.progress}%</span>
                        </a>
                      ))
                    ) : (
                      <span className="pipe-empty">—</span>
                    )}
                  </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
