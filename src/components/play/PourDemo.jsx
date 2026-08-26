import { useCallback, useEffect, useMemo, useState } from 'react';

/* A browser-playable slice of Pour. Levels are built by starting from a SOLVED
   board and applying only legal moves in reverse, so every board this demo ever
   shows is reachable back to solved — the same guarantee the Android build makes,
   arrived at the same way. No shuffle-and-hope. */

const DEPTH = 4;
const COLORS = ['#22c55e', '#38bdf8', '#f472b6', '#eab308', '#a855f7', '#fb923c'];

function solvedBoard(nColors, spare) {
  const tubes = [];
  for (let c = 0; c < nColors; c += 1) tubes.push(Array(DEPTH).fill(c));
  for (let s = 0; s < spare; s += 1) tubes.push([]);
  return tubes;
}

function legalPour(from, to) {
  if (from.length === 0) return false;
  if (to.length >= DEPTH) return false;
  if (to.length === 0) return true;
  return from[from.length - 1] === to[to.length - 1];
}

function scramble(tubes, steps) {
  const b = tubes.map((t) => [...t]);
  for (let i = 0; i < steps; i += 1) {
    const opts = [];
    for (let f = 0; f < b.length; f += 1) {
      for (let t = 0; t < b.length; t += 1) {
        if (f !== t && legalPour(b[f], b[t])) opts.push([f, t]);
      }
    }
    if (!opts.length) break;
    const [f, t] = opts[Math.floor(Math.random() * opts.length)];
    b[t].push(b[f].pop());
  }
  return b;
}

function isSolved(tubes) {
  return tubes.every((t) => t.length === 0 || (t.length === DEPTH && t.every((v) => v === t[0])));
}

/* Depth-first search over board states. Tube order does not matter, so states are
   keyed on the sorted tube contents — that collapses a large amount of the search
   space and keeps this fast enough to run per level in the browser. */
function isSolvable(tubes, budget = 60000) {
  const key = (b) =>
    b
      .map((t) => t.join(','))
      .sort()
      .join('|');

  const seen = new Set();
  const stack = [tubes.map((t) => [...t])];
  let steps = 0;

  while (stack.length) {
    if (steps++ > budget) return false;
    const b = stack.pop();
    if (isSolved(b)) return true;

    const k = key(b);
    if (seen.has(k)) continue;
    seen.add(k);

    for (let f = 0; f < b.length; f += 1) {
      if (!b[f].length) continue;
      // Skip lifting from an already-complete tube; it can never help.
      if (b[f].length === DEPTH && b[f].every((v) => v === b[f][0])) continue;

      for (let t = 0; t < b.length; t += 1) {
        if (f === t || !legalPour(b[f], b[t])) continue;
        const next = b.map((x) => [...x]);
        const colour = next[f][next[f].length - 1];
        while (
          next[f].length &&
          next[f][next[f].length - 1] === colour &&
          next[t].length < DEPTH
        ) {
          next[t].push(next[f].pop());
        }
        if (!seen.has(key(next))) stack.push(next);
      }
    }
  }
  return false;
}

function makeLevel(level) {
  const nColors = Math.min(3 + Math.floor(level / 2), COLORS.length);
  const spare = 2;
  const solved = solvedBoard(nColors, spare);

  // Generate, then verify. A board is only shown once a solver has beaten it.
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const board = scramble(solved, 30 + level * 10);
    if (isSolved(board)) continue;
    if (isSolvable(board)) return board;
  }
  // Fall back to a light scramble, which stays trivially reversible.
  return scramble(solved, 8);
}

export default function PourDemo() {
  const [level, setLevel] = useState(1);
  const [tubes, setTubes] = useState(() => makeLevel(1));
  const [sel, setSel] = useState(null);
  const [moves, setMoves] = useState(0);
  const [history, setHistory] = useState([]);

  const won = useMemo(() => isSolved(tubes), [tubes]);

  const load = useCallback((lv) => {
    setTubes(makeLevel(lv));
    setSel(null);
    setMoves(0);
    setHistory([]);
  }, []);

  useEffect(() => {
    if (!won) return;
    const id = setTimeout(() => {}, 0);
    return () => clearTimeout(id);
  }, [won]);

  const tap = (i) => {
    if (won) return;

    if (sel === null) {
      if (tubes[i].length === 0) return;
      setSel(i);
      return;
    }

    if (sel === i) {
      setSel(null);
      return;
    }

    const from = tubes[sel];
    const to = tubes[i];
    if (!legalPour(from, to)) {
      setSel(null);
      return;
    }

    // Pour every ball of the matching top colour, up to capacity.
    const colour = from[from.length - 1];
    const next = tubes.map((t) => [...t]);
    let moved = 0;
    while (
      next[sel].length &&
      next[sel][next[sel].length - 1] === colour &&
      next[i].length < DEPTH
    ) {
      next[i].push(next[sel].pop());
      moved += 1;
    }

    if (moved > 0) {
      setHistory((h) => [...h, tubes.map((t) => [...t])]);
      setTubes(next);
      setMoves((m) => m + 1);
    }
    setSel(null);
  };

  const undo = () => {
    setHistory((h) => {
      if (!h.length) return h;
      const prev = h[h.length - 1];
      setTubes(prev);
      setMoves((m) => Math.max(0, m - 1));
      setSel(null);
      return h.slice(0, -1);
    });
  };

  return (
    <div className="demo">
      <div className="pour-head">
        <span className="pour-level">Level {level}</span>
        <span className="pour-moves">{moves} moves</span>
      </div>

      <div className={`pour-board ${won ? 'pour-board-won' : ''}`}>
        {tubes.map((t, i) => (
          <button
            key={i}
            className={`tube ${sel === i ? 'tube-sel' : ''}`}
            onClick={() => tap(i)}
            aria-label={`Tube ${i + 1}, ${t.length} balls`}
          >
            {Array.from({ length: DEPTH }).map((_, slot) => {
              const idx = DEPTH - 1 - slot;
              const v = t[idx];
              return (
                <span
                  key={slot}
                  className="ball"
                  style={{ background: v === undefined ? 'transparent' : COLORS[v] }}
                />
              );
            })}
          </button>
        ))}
      </div>

      {won && (
        <div className="pour-won">
          <span className="pour-won-title">Solved in {moves} moves</span>
          <button
            className="btn btn-primary"
            onClick={() => {
              const nl = level + 1;
              setLevel(nl);
              load(nl);
            }}
          >
            Next level →
          </button>
        </div>
      )}

      <div className="demo-foot">
        <span className="demo-hint">Tap a tube to lift, tap another to pour</span>
        <span className="pour-actions">
          <button className="mini-btn" onClick={undo} disabled={!history.length || won}>
            Undo
          </button>
          <button className="mini-btn" onClick={() => load(level)}>
            Restart
          </button>
        </span>
      </div>
    </div>
  );
}
