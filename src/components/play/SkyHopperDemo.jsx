import { useEffect, useRef, useState } from 'react';

/* A browser-playable slice of Sky Hopper's core loop: one-tap flight through
   procedurally generated gaps. Same mechanic as the Android build, not the same
   codebase — this is a demo, not a port. */

const W = 340;
const H = 480;
const GRAVITY = 0.42;
const FLAP = -7.2;
const PIPE_W = 54;
const GAP = 148;
const SPEED = 2.3;
const BIRD_X = 96;
const BIRD_R = 12;

export default function SkyHopperDemo() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(0);

  const [phase, setPhase] = useState('idle'); // idle | playing | dead
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try {
      return Number(localStorage.getItem('arcadly_skyhopper_best') || 0);
    } catch {
      return 0;
    }
  });

  const reset = () => {
    stateRef.current = {
      y: H / 2,
      v: 0,
      pipes: [],
      t: 0,
      score: 0,
      dead: false,
    };
    setScore(0);
  };

  const start = () => {
    reset();
    setPhase('playing');
  };

  const flap = () => {
    if (phase === 'idle') {
      start();
      return;
    }
    if (phase === 'dead') {
      start();
      return;
    }
    const s = stateRef.current;
    if (s && !s.dead) s.v = FLAP;
  };

  // Keyboard: space / arrow-up, but only while the canvas area has focus.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        flap();
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    if (!stateRef.current) reset();

    const spawn = (s) => {
      const margin = 62;
      const top = margin + Math.random() * (H - GAP - margin * 2);
      s.pipes.push({ x: W + PIPE_W, top, passed: false });
    };

    const draw = () => {
      const s = stateRef.current;

      ctx.fillStyle = '#0e0f11';
      ctx.fillRect(0, 0, W, H);

      // recessive grid, matches the site's texture
      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 34) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 34) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(W, y + 0.5);
        ctx.stroke();
      }

      // pipes
      s.pipes.forEach((p) => {
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(p.x, 0, PIPE_W, p.top);
        ctx.fillRect(p.x, p.top + GAP, PIPE_W, H - p.top - GAP);
        ctx.fillStyle = 'rgba(255,255,255,0.16)';
        ctx.fillRect(p.x, p.top - 9, PIPE_W, 9);
        ctx.fillRect(p.x, p.top + GAP, PIPE_W, 9);
      });

      // bird
      const tilt = Math.max(-0.5, Math.min(1.1, s.v / 11));
      ctx.save();
      ctx.translate(BIRD_X, s.y);
      ctx.rotate(tilt);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, BIRD_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0e0f11';
      ctx.beginPath();
      ctx.arc(4.5, -3.5, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.moveTo(-3, 1);
      ctx.lineTo(-13, 5);
      ctx.lineTo(-3, 8);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ground line
      ctx.strokeStyle = 'rgba(34,197,94,0.5)';
      ctx.beginPath();
      ctx.moveTo(0, H - 1);
      ctx.lineTo(W, H - 1);
      ctx.stroke();
    };

    const step = () => {
      const s = stateRef.current;

      if (phase === 'playing' && !s.dead) {
        s.t += 1;
        s.v += GRAVITY;
        s.y += s.v;

        if (s.t % 92 === 0 || s.pipes.length === 0) spawn(s);

        s.pipes.forEach((p) => {
          p.x -= SPEED;
          if (!p.passed && p.x + PIPE_W < BIRD_X - BIRD_R) {
            p.passed = true;
            s.score += 1;
            setScore(s.score);
          }
        });
        s.pipes = s.pipes.filter((p) => p.x + PIPE_W > -10);

        // collisions
        const hitFloor = s.y + BIRD_R >= H || s.y - BIRD_R <= 0;
        const hitPipe = s.pipes.some(
          (p) =>
            BIRD_X + BIRD_R > p.x &&
            BIRD_X - BIRD_R < p.x + PIPE_W &&
            (s.y - BIRD_R < p.top || s.y + BIRD_R > p.top + GAP)
        );

        if (hitFloor || hitPipe) {
          s.dead = true;
          setPhase('dead');
          setBest((b) => {
            const nb = Math.max(b, s.score);
            try {
              localStorage.setItem('arcadly_skyhopper_best', String(nb));
            } catch {
              /* private mode — best score just won't persist */
            }
            return nb;
          });
        }
      }

      draw();
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  return (
    <div className="demo">
      <div className="demo-stage">
        <canvas
          ref={canvasRef}
          className="demo-canvas"
          style={{ width: W, height: H }}
          tabIndex={0}
          role="application"
          aria-label="Sky Hopper playable demo. Press space or tap to flap."
          onPointerDown={(e) => {
            e.preventDefault();
            canvasRef.current?.focus();
            flap();
          }}
        />

        {phase !== 'playing' && (
          <div className="demo-overlay">
            {phase === 'idle' ? (
              <>
                <span className="demo-overlay-title">Sky Hopper</span>
                <p className="demo-overlay-body">Tap, click, or press space to flap.</p>
                <button className="btn btn-primary" onClick={start}>
                  Play
                </button>
              </>
            ) : (
              <>
                <span className="demo-overlay-title">{score}</span>
                <p className="demo-overlay-body">
                  {score > 0 && score >= best ? 'New best!' : `Best ${best}`}
                </p>
                <button className="btn btn-primary" onClick={start}>
                  Play again
                </button>
              </>
            )}
          </div>
        )}

        {phase === 'playing' && <span className="demo-score">{score}</span>}
      </div>

      <div className="demo-foot">
        <span className="demo-hint">Space / tap to flap</span>
        <span className="demo-best">Best {best}</span>
      </div>
    </div>
  );
}
