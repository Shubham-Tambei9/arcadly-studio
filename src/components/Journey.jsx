import { useRef } from 'react';
import { useSequence, useRailGeometry, RailLine, RailNode, nodeState } from './Rail.jsx';
import { DEVELOPER as D } from '../data/developer.js';

/* Education and experience merged into one chronological rail, using the same
   travelling-packet animation as the shipping pipeline. Entries come straight
   from developer.js — nothing is invented to fill the timeline. */

function yearOf(period) {
  const m = String(period).match(/(\d{4})/);
  return m ? Number(m[1]) : 0;
}

const ITEMS = [
  ...D.education.map((e) => ({
    kind: 'Education',
    title: e.degree,
    org: e.institution,
    period: e.year,
    note: e.note,
  })),
  ...D.experience.map((e) => ({
    kind: 'Experience',
    title: e.role,
    org: e.company,
    period: e.period,
    note: e.current ? 'Current' : null,
    current: !!e.current,
    detail: e.detail || null,
    tech: e.tech || null,
  })),
].sort((a, b) => yearOf(a.period) - yearOf(b.period));

export default function Journey() {
  const ref = useRef(null);
  const railRef = useRef(null);
  const head = useSequence(ref, ITEMS.length, { dwell: 900 });
  const points = useRailGeometry(railRef, '.rl-node');

  return (
    <section className="section" ref={ref}>
      <div className="wrap">
        <span className="eyebrow">The route here</span>
        <h2 className="section-title">How I got to Arcadly.</h2>
        <p className="section-sub">
          Study and internships, in the order they happened.
        </p>

        <div className="journey" ref={railRef}>
          <RailLine head={head} points={points} orientation="vertical" />

          <ol className="journey-items">
            {ITEMS.map((it, i) => {
              const state = nodeState(i, head);
              return (
                <li className={`journey-item journey-item-${state}`} key={`${it.org}-${it.title}`}>
                  <RailNode state={state} />
                  <div className="journey-card spot">
                    <div className="journey-head">
                      <span className="journey-kind">{it.kind}</span>
                      <span className="journey-period">{it.period}</span>
                    </div>
                    <h3 className="journey-title">{it.title}</h3>
                    <span className="journey-org">{it.org}</span>
                    {it.note && (
                      <span className={`journey-note ${it.current ? 'journey-note-live' : ''}`}>
                        {it.current && <span className="dot" aria-hidden="true" />}
                        {it.note}
                      </span>
                    )}
                    {it.detail && <p className="journey-detail">{it.detail}</p>}
                    {it.tech && (
                      <div className="journey-tech">
                        {it.tech.map((t) => (
                          <span className="pill" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
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
