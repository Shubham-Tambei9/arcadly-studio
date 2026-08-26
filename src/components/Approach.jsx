import { useRef } from 'react';
import { useSequence, useRailGeometry, RailLine, nodeState } from './Rail.jsx';
import { PILLARS } from '../data/studio.js';

/* The four build principles, sequenced along the same rail as the pipeline so
   the two sections read as one visual language. */
export default function Approach() {
  const ref = useRef(null);
  const railRef = useRef(null);
  const head = useSequence(ref, PILLARS.length, { dwell: 1000 });
  const points = useRailGeometry(railRef, '.pipe-node');

  return (
    <section className="section" id="approach" ref={ref}>
      <div className="wrap">
        <span className="eyebrow">How we build</span>
        <h2 className="section-title">
          Easy to pick up.
          <br />
          Hard to put down.
        </h2>
        <p className="section-sub">Four principles behind everything we ship.</p>

        <div className="pipe" ref={railRef}>
          <RailLine head={head} points={points} />

          <ol className="pipe-stages approach-stages">
            {PILLARS.map((p, i) => (
              <li key={p.title} className={`pipe-stage pipe-stage-${nodeState(i, head)}`}>
                <div className="pipe-node" aria-hidden="true">
                  <span className="pipe-node-core" />
                </div>
                <div className="pipe-stage-inner">
                  <span className="pipe-stage-idx">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="pipe-stage-label">{p.title}</h3>
                  <p className="pipe-stage-note approach-note">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
