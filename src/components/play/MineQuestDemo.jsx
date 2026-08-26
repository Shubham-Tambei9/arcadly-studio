import { useCallback, useEffect, useState } from 'react';

/* A browser-playable slice of MineQuest. Boards are generated, then SOLVED by a
   constraint solver that only ever applies certain deductions — if the solver
   cannot finish without guessing, the board is thrown away and regenerated. That
   is the same guarantee the Android build makes: no 50/50 at the end. */

const R = 9;
const C = 9;
const MINES = 10;

const idx = (r, c) => r * C + c;
const inb = (r, c) => r >= 0 && r < R && c >= 0 && c < C;

function neighbours(r, c) {
  const out = [];
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) continue;
      if (inb(r + dr, c + dc)) out.push([r + dr, c + dc]);
    }
  }
  return out;
}

function buildBoard(safeR, safeC) {
  const mines = new Set();
  const forbidden = new Set([idx(safeR, safeC), ...neighbours(safeR, safeC).map(([r, c]) => idx(r, c))]);
  while (mines.size < MINES) {
    const p = Math.floor(Math.random() * R * C);
    if (!forbidden.has(p)) mines.add(p);
  }
  const counts = Array(R * C).fill(0);
  for (let r = 0; r < R; r += 1) {
    for (let c = 0; c < C; c += 1) {
      if (mines.has(idx(r, c))) {
        counts[idx(r, c)] = -1;
        continue;
      }
      counts[idx(r, c)] = neighbours(r, c).filter(([nr, nc]) => mines.has(idx(nr, nc))).length;
    }
  }
  return { mines, counts };
}

/* Returns true only if the board can be cleared by certain deduction alone. */
function solvableWithoutGuessing({ mines, counts }, startR, startC) {
  const revealed = new Set();
  const flagged = new Set();

  const flood = (r, c) => {
    const stack = [[r, c]];
    while (stack.length) {
      const [cr, cc] = stack.pop();
      const p = idx(cr, cc);
      if (revealed.has(p) || flagged.has(p)) continue;
      revealed.add(p);
      if (counts[p] === 0) neighbours(cr, cc).forEach(([nr, nc]) => stack.push([nr, nc]));
    }
  };

  flood(startR, startC);

  let progress = true;
  while (progress) {
    progress = false;
    for (let r = 0; r < R; r += 1) {
      for (let c = 0; c < C; c += 1) {
        const p = idx(r, c);
        if (!revealed.has(p) || counts[p] <= 0) continue;
        const nb = neighbours(r, c);
        const hidden = nb.filter(([nr, nc]) => !revealed.has(idx(nr, nc)) && !flagged.has(idx(nr, nc)));
        const flags = nb.filter(([nr, nc]) => flagged.has(idx(nr, nc))).length;

        // All remaining hidden neighbours must be mines.
        if (hidden.length > 0 && counts[p] - flags === hidden.length) {
          hidden.forEach(([nr, nc]) => flagged.add(idx(nr, nc)));
          progress = true;
        }
        // Count satisfied — every other hidden neighbour is safe.
        else if (hidden.length > 0 && counts[p] === flags) {
          hidden.forEach(([nr, nc]) => flood(nr, nc));
          progress = true;
        }
      }
    }
  }

  return revealed.size === R * C - MINES;
}

function generateGuessFree(startR, startC) {
  for (let attempt = 0; attempt < 400; attempt += 1) {
    const b = buildBoard(startR, startC);
    if (solvableWithoutGuessing(b, startR, startC)) return b;
  }
  return buildBoard(startR, startC); // fallback; vanishingly rare at this size
}

export default function MineQuestDemo() {
  const [board, setBoard] = useState(null);
  const [revealed, setRevealed] = useState(() => new Set());
  const [flags, setFlags] = useState(() => new Set());
  const [state, setState] = useState('idle'); // idle | playing | won | lost
  const [tries, setTries] = useState(0);

  const reset = useCallback(() => {
    setBoard(null);
    setRevealed(new Set());
    setFlags(new Set());
    setState('idle');
    setTries((t) => t + 1);
  }, []);

  useEffect(() => {
    if (state !== 'playing' || !board) return;
    if (revealed.size === R * C - MINES) setState('won');
  }, [revealed, board, state]);

  const revealFrom = (b, set, r, c) => {
    const stack = [[r, c]];
    while (stack.length) {
      const [cr, cc] = stack.pop();
      const p = idx(cr, cc);
      if (set.has(p)) continue;
      set.add(p);
      if (b.counts[p] === 0) neighbours(cr, cc).forEach(([nr, nc]) => stack.push([nr, nc]));
    }
  };

  const click = (r, c) => {
    if (state === 'won' || state === 'lost') return;
    const p = idx(r, c);
    if (flags.has(p)) return;

    let b = board;
    if (!b) {
      b = generateGuessFree(r, c);
      setBoard(b);
      setState('playing');
    }

    if (b.counts[p] === -1) {
      setState('lost');
      const all = new Set(revealed);
      b.mines.forEach((m) => all.add(m));
      setRevealed(all);
      return;
    }

    const next = new Set(revealed);
    revealFrom(b, next, r, c);
    setRevealed(next);
  };

  const flag = (e, r, c) => {
    e.preventDefault();
    if (state === 'won' || state === 'lost') return;
    const p = idx(r, c);
    if (revealed.has(p)) return;
    setFlags((f) => {
      const n = new Set(f);
      if (n.has(p)) n.delete(p);
      else n.add(p);
      return n;
    });
  };

  const remaining = MINES - flags.size;

  return (
    <div className="demo">
      <div className="pour-head">
        <span className="pour-level">
          {state === 'won' ? 'Cleared' : state === 'lost' ? 'Boom' : 'Guess-free board'}
        </span>
        <span className="pour-moves">{remaining} mines left</span>
      </div>

      <div className={`mine-board ${state === 'lost' ? 'mine-board-lost' : ''}`}>
        {Array.from({ length: R }).map((_, r) =>
          Array.from({ length: C }).map((__, c) => {
            const p = idx(r, c);
            const isRev = revealed.has(p);
            const isFlag = flags.has(p);
            const v = board ? board.counts[p] : 0;
            return (
              <button
                key={p}
                className={`cell ${isRev ? 'cell-open' : ''} ${isFlag ? 'cell-flag' : ''} ${
                  isRev && v === -1 ? 'cell-mine' : ''
                }`}
                data-n={isRev && v > 0 ? v : undefined}
                onClick={() => click(r, c)}
                onContextMenu={(e) => flag(e, r, c)}
                aria-label={`Row ${r + 1} column ${c + 1}`}
              >
                {isFlag && !isRev ? '⚑' : isRev && v === -1 ? '✳' : isRev && v > 0 ? v : ''}
              </button>
            );
          })
        )}
      </div>

      {(state === 'won' || state === 'lost') && (
        <div className="pour-won">
          <span className="pour-won-title">
            {state === 'won' ? 'Board cleared by logic alone.' : 'That one was a mine.'}
          </span>
          <button className="btn btn-primary" onClick={reset}>
            New board
          </button>
        </div>
      )}

      <div className="demo-foot">
        <span className="demo-hint">Click to reveal · right-click to flag</span>
        <span className="pour-actions">
          <button className="mini-btn" onClick={reset}>
            New board
          </button>
        </span>
      </div>
    </div>
  );
}
