/* The person behind Arcadly.
 *
 * Pulled from the personal portfolio (Portfolio.jsx PROFILE / EDUCATION_ITEMS /
 * EXPERIENCE / SKILLS). Deliberately trimmed to what belongs on a studio site —
 * who builds the games, what they build with, how to reach them. Research
 * papers, LeetCode/typing stats and the full project catalogue stay on the
 * personal portfolio; they are not studio context.
 *
 * Phone number intentionally omitted — it is on the personal portfolio, but a
 * studio site reaches a wider audience and email covers the same need.
 */
export const DEVELOPER = {
  name: 'Shubham Rajendra Tambe',
  role: 'Founder & Solo Developer, Arcadly · AI Research Contractor at Handshake AI',
  location: 'Pune, India',
  avatar: '/logo-tile.svg',

  intro:
    'Arcadly is one person. I design, build, ship and maintain every title in the catalogue — the gameplay, the generators and solvers, the store listings, and this site.',

  bio: [
    'I am a final-year B.Tech Information Technology student at Vishwakarma Institute of Technology, Pune, with foundations in software development, machine learning, data science, IoT and web development.',
    'Arcadly started as a way to ship real software to real users rather than leaving projects in a repo. Sky Hopper went live on Google Play; four more titles and one app are in the pipeline behind it.',
    'The thing I care most about is the part players never see: the generators and solvers that guarantee a level is fair before anyone plays it. A puzzle that needs a lucky guess is a bug, not a difficulty setting.',
    'Alongside the studio I work as an AI Research Contractor at Handshake AI, building containerized environments that benchmark autonomous coding agents. It is the same instinct as the solvers in Pour and MineQuest — deciding what counts as a correct result, and proving it automatically rather than trusting it.',
  ],

  /* Verifiable facts only — no invented totals. */
  facts: [
    { label: 'Studio', value: 'Arcadly' },
    { label: 'Based in', value: 'Pune, India' },
    { label: 'Shipped on Play', value: '1 title' },
    { label: 'Also working as', value: 'AI Research Contractor' },
  ],

  /* The subset actually used to build Arcadly's catalogue. */
  stack: [
    { group: 'Game & app', items: ['Unity', 'C#', 'Flutter', 'Dart'] },
    { group: 'Web', items: ['React', 'JavaScript', 'Node.js', 'HTML5', 'CSS3'] },
    { group: 'Data & ML', items: ['Python', 'Pandas', 'NumPy', 'Machine Learning'] },
    { group: 'Storage', items: ['SQLite', 'MongoDB', 'MySQL'] },
    { group: 'Platform', items: ['Android', 'AdMob', 'Git', 'Figma'] },
  ],

  education: [
    {
      institution: 'Vishwakarma Institute of Technology, Pune',
      degree: 'B.Tech, Information Technology',
      year: '2022 — 2026',
      note: 'Final year',
    },
    {
      institution: 'Shramik Junior College, Sangamner',
      degree: 'Higher Secondary (Science)',
      year: '2020 — 2022',
      note: null,
    },
  ],

  experience: [
    {
      company: 'Handshake AI',
      role: 'AI Research Contractor',
      period: 'July 2026 — Present',
      current: true,
      detail:
        'Building containerized evaluation environments to benchmark autonomous AI coding agents on Project Dynamo. Developing task submissions across data science/reporting and security/DFIR domains, working through the full pipeline from proposal to automated review — Pass@2, rubric scoring, and human review layers.',
      tech: ['Python', 'Docker', 'PyTest', 'Bash', 'Linux CLI'],
    },
    {
      company: 'AICTE Edunet Foundation — Green Skills',
      role: 'Data Analyst Intern',
      period: '2023 — 2024',
    },
    {
      company: 'AICTE Edunet Foundation — TechSaksham',
      role: 'Data Analyst Intern',
      period: '2023 — 2024',
    },
  ],

  links: [
    { label: 'GitHub', href: 'https://github.com/Shubham-Tambei9', handle: '@Shubham-Tambei9' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/shubham-tambe-i9', handle: 'shubham-tambe-i9' },
    { label: 'X', href: 'https://x.com/Shubham_Techi9', handle: '@Shubham_Techi9' },
    { label: 'Figma', href: 'https://www.figma.com/@Shubham_Techi9', handle: '@Shubham_Techi9' },
  ],

  email: 'tambeshubham2004@gmail.com',
};
