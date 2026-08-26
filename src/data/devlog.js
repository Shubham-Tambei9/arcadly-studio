/* Dev log.
 *
 * Each entry is written as a short story: a greeting, the problem we hit, how we
 * solved it, and what we took away — signed off by the developer and studio.
 *
 * The engineering facts (guess-free generation, solver-verified levels, true par,
 * synthesised audio, split ad/no-ad builds) all come from the existing Arcadly
 * site and the per-game pages. The narrative framing around them is written for
 * this site; it does not add new technical claims.
 */
const SIGNOFF = { author: 'Shubham Tambe', studio: 'Arcadly' };

export const DEVLOG = [
  {
    id: 'pour-solvable',
    relatedGame: 'pour',
    category: 'Engineering',
    date: 'August 20, 2026',
    readTime: '3 min',
    title: 'Every Level in Pour Is Provably Solvable',
    excerpt:
      'Most ball sort games shuffle the board and hope. We refuse to show you a level until a solver has actually beaten it.',
    greeting: 'Hey — Shubham here.',
    story: [
      {
        heading: 'The problem',
        body: 'We had endless level generation working in Pour within a week. Shuffle the balls, deal them into tubes, done. Then we actually played it. Somewhere around level 30 we hit a board that simply could not be finished — not hard, not clever, just impossible. Every colour was buried under a colour it needed to move first, and no legal pour existed.',
      },
      {
        heading: 'Why it mattered',
        body: 'A player who hits that board does not think "bad shuffle". They think they are bad at the game. That is the worst possible outcome for a puzzle: losing to something that was never winnable, with nothing to learn from it. Most of the genre ships this way and hopes you do not notice.',
      },
      {
        heading: 'How we solved it',
        body: 'We stopped generating boards and started generating solutions. A board is now scrambled, then handed to a solver that searches the state space for a path back to sorted. If the solver cannot finish it, the board is thrown away and regenerated. Nothing reaches a player until a machine has already beaten it.',
      },
      {
        heading: 'What we took away',
        body: 'Generation and verification are two different jobs, and skipping the second one is how you ship frustration. It also gave us something unexpected: because the solver knows the shortest path, we could show a par that is real rather than estimated — which turned into its own post.',
      },
    ],
    ...SIGNOFF,
  },

  {
    id: 'par-was-lying',
    relatedGame: 'pour',
    category: 'Engineering',
    date: 'August 18, 2026',
    readTime: '3 min',
    title: 'Par Was Lying to You',
    excerpt:
      'Level 1 said par was 14. The true shortest solution is 10. Here is how we found out — and what it cost to fix.',
    greeting: 'Hello again from the lab.',
    story: [
      {
        heading: 'The problem',
        body: 'Once the solver existed, we pointed it at our own par numbers out of curiosity. Level 1 claimed par was 14 moves. The solver finished it in 10. Every three-star rating in the game was being measured against a number we had guessed.',
      },
      {
        heading: 'Why it mattered',
        body: 'A star rating is a promise. If we tell a player three stars means an optimal run, and they earn three stars on a sloppy 14-move solve, the rating means nothing. Worse, a player who genuinely finds the 10-move line gets the same reward as someone who stumbled through.',
      },
      {
        heading: 'How we solved it',
        body: 'Par is now whatever the solver proves is the shortest path — computed per board at generation time and stored with it. No estimates, no heuristics, no hand-tuned tables. It cost us generation speed, because finding the shortest solution is meaningfully harder than finding any solution.',
      },
      {
        heading: 'What we took away',
        body: 'We had shipped a number nobody had checked, in a place where it looked authoritative. Now the rule is simple: if a figure appears on screen as fact, something has to be able to prove it. That rule ended up shaping this entire website too.',
      },
    ],
    ...SIGNOFF,
  },

  {
    id: 'zero-audio-files',
    relatedGame: 'pour',
    category: 'Audio',
    date: 'August 15, 2026',
    readTime: '2 min',
    title: 'An Entire Soundtrack, Zero Audio Files',
    excerpt:
      'Every sound in Pour is generated on your phone from oscillators and noise. No samples, no licensing, no download.',
    greeting: 'Hey, quick one from the audio side.',
    story: [
      {
        heading: 'The problem',
        body: 'Pour needed sound. The obvious route is bundling audio files, but that meant three things we did not want: a bigger download, a licensing trail for every sample, and a small but real delay between a tap and the sound it makes.',
      },
      {
        heading: 'Why it mattered',
        body: 'Pour is a game people open for two minutes while waiting for something. If the install is heavy or a tap feels a beat behind the sound, that two-minute session stops happening.',
      },
      {
        heading: 'How we solved it',
        body: 'Every sound is synthesised on the device from oscillators and shaped noise — no files at all. Pours, taps, level completions and the ambient bed are all generated at runtime. The audio adds nothing to the download and there is nothing to load before it can play.',
      },
      {
        heading: 'What we took away',
        body: 'Constraints picked the better solution for us. We went synth-only to dodge licensing and size, and got lower latency as a side effect. It also means we can retune a sound by changing a number instead of re-exporting a file.',
      },
    ],
    ...SIGNOFF,
  },

  {
    id: 'two-builds',
    category: 'Workflow',
    date: 'August 12, 2026',
    readTime: '2 min',
    title: 'Two Builds, One Codebase',
    excerpt:
      'A single forgotten constant can ship a release that earns nothing, or get an ads account suspended. So we stopped using constants.',
    greeting: 'Hi — a process one today.',
    story: [
      {
        heading: 'The problem',
        body: 'We keep a no-ads build for testing and a live build for the store. For a while the difference between them was a boolean at the top of a file, flipped by hand before every release.',
      },
      {
        heading: 'Why it mattered',
        body: 'Flip it the wrong way in one direction and you ship a release that shows no ads and earns nothing. Flip it the wrong way in the other and you push test ad traffic into production — which is the kind of thing that gets an ads account suspended. Both failures are one distracted evening away.',
      },
      {
        heading: 'How we solved it',
        body: 'The flag is gone. Build configuration decides which variant is produced, and the two builds carry different identifiers so they cannot be confused after the fact. There is no longer a line anyone can forget to change.',
      },
      {
        heading: 'What we took away',
        body: 'If a release depends on remembering something, it will eventually go wrong. The fix was not more discipline — it was removing the thing that needed remembering.',
      },
    ],
    ...SIGNOFF,
  },

  {
    id: 'orbit-mechanics',
    relatedGame: 'orbit-rush',
    category: 'Update',
    date: 'April 11, 2026',
    readTime: '2 min',
    title: 'Orbit Rush: Refining the Mechanics',
    excerpt:
      'Working on the new orbit trajectory systems to make the gameplay feel as smooth as silk. New themes coming soon.',
    greeting: 'Hey — progress report from prototyping.',
    story: [
      {
        heading: 'The problem',
        body: 'Orbit Rush is built on gravity rather than a fixed track: you latch onto a body, circle it, and release at the right moment to fling yourself onward. The physics were correct early on. They just did not feel good — releases felt slightly arbitrary, and the difference between a great jump and a bad one was hard to read.',
      },
      {
        heading: 'Why it mattered',
        body: 'In a skill game, players have to believe a failure was theirs. If the mechanics are technically accurate but unreadable, every death feels unfair, and the run-again loop dies with it.',
      },
      {
        heading: 'How we solved it',
        body: 'We are rebuilding the trajectory system so intent is visible before commitment — the path you are about to take reads clearly while you are still in orbit. This is still in progress; Orbit Rush sits at the prototype end of our pipeline and the number on its card moves as this lands.',
      },
      {
        heading: 'What we took away',
        body: 'Correct physics and good physics are not the same target. The prototype stage exists precisely to find that gap before art and content get built on top of it.',
      },
    ],
    ...SIGNOFF,
  },

  {
    id: 'skin-systems',
    relatedGame: 'sky-hopper',
    category: 'Preview',
    date: 'April 08, 2026',
    readTime: '2 min',
    title: 'Skin Systems Are Live',
    excerpt:
      'A modular skinning system that lets us drop in new bird designs in seconds. Customization is king.',
    greeting: 'Hello — a small win worth sharing.',
    story: [
      {
        heading: 'The problem',
        body: 'Adding a new bird to Sky Hopper used to mean touching several places at once: the asset, the animation setup, and the code that knew which bird was which. Every new design was a small refactor, so we simply added fewer of them.',
      },
      {
        heading: 'Why it mattered',
        body: 'Sky Hopper is a high-score chaser. The score is the reason to play, but a character you picked yourself is a reason to come back. If shipping a new one is expensive, that whole layer never gets built.',
      },
      {
        heading: 'How we solved it',
        body: 'Skins are now modular and data-driven. Adding one means dropping in a definition rather than editing the game. What used to be a chunk of an afternoon is now a matter of seconds.',
      },
      {
        heading: 'What we took away',
        body: 'When a task is tedious, you do not do it less well — you do it less often. Making it cheap was the only way that content was ever going to exist.',
      },
    ],
    ...SIGNOFF,
  },
];
