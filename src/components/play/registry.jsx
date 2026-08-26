import SkyHopperDemo from './SkyHopperDemo.jsx';
import PourDemo from './PourDemo.jsx';
import MineQuestDemo from './MineQuestDemo.jsx';

/* Which titles have a browser-playable slice, and the one-line honest framing
   that sits above it on the detail page. */
export const DEMOS = {
  'sky-hopper': {
    Component: SkyHopperDemo,
    blurb:
      'The core loop, playable right here: one tap to flap, procedurally generated gaps, and the run ends the moment you touch anything.',
  },
  pour: {
    Component: PourDemo,
    blurb:
      'Every board below is generated, then beaten by a solver before it is shown to you — the same guarantee the Android build makes. If the solver cannot finish it, you never see it.',
  },
  'mine-quest': {
    Component: MineQuestDemo,
    blurb:
      'Boards are generated, then solved by a deduction-only solver. Anything that would need a guess is thrown away and regenerated, so this board is winnable by logic alone.',
  },
};

export const getDemo = (id) => DEMOS[id] || null;
