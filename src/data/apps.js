/* Non-game apps published under Arcadly.
   PassChat content is taken from the project's own README (D:\PassChat), including
   its build status and its stated limitations — the README explicitly asks that it
   be treated as a portfolio project rather than something to rely on, so the
   caveat is carried through to this page rather than dropped. */
export const APPS = [
  {
    id: 'passchat',
    title: 'PassChat',
    heroTitle: 'PASSCHAT',
    heroSub: 'Chat With No Account',
    category: 'Communication',
    genre: 'Communication',
    kind: 'app',
    status: 'dev',
    statusLabel: 'In development',
    phase: 'Feature complete · BLE untested',
    progress: 90,
    icon: '/logo-tile.svg',
    accent: '#22c55e',
    tagline: 'Create a room, share a passcode, talk.',
    description:
      'Passcode-based peer-to-peer chat over Wi-Fi and Bluetooth. No phone number, no email, no account — and nothing crosses the network unencrypted.',
    tags: ['Peer-to-peer', 'Encrypted', 'Offline-first'],
    statTiles: [
      { value: '0', label: 'Accounts needed' },
      { value: 'E2E', label: 'Encrypted links' },
      { value: '5', label: 'Mesh relay hops' },
      { value: '32MB', label: 'Max file size' },
    ],
    about: [
      'PassChat is peer-to-peer chat with no sign-up of any kind. One device creates a room and gets a passcode; anyone who has that passcode — typed or scanned from a QR code — joins and starts talking. There is no phone number, no email, and no account anywhere in the flow.',
      'Phones find each other over Wi-Fi and Bluetooth. Devices announce themselves on UDP every five seconds and drop off the list after twenty seconds of silence, so a phone that just opened the app shows up immediately. Chat itself runs over TCP.',
      'The passcode never goes on the wire. The joiner sends only a hint — a hash used to work out which room is meant — the host replies with that room\u2019s salt and a one-time nonce, and the joiner answers with an HMAC proof derived through Argon2id. The proof is bound to the nonce and to both devices\u2019 identity keys, so it cannot be replayed or relayed. Only then does the host hand over the room key.',
      'Messages are sealed under a room key separately from the link encryption, so a device relaying traffic handles an envelope it cannot open. Undelivered packets are spooled to disk and handed over when the next device appears.',
    ],
    features: [
      {
        title: 'No Account, Ever',
        body: 'No phone number, no email, no sign-up. A passcode is the entire identity model.',
      },
      {
        title: 'Encrypted End To End',
        body: 'A throwaway X25519 keypair per connection, signed by a long-term Ed25519 identity key, with traffic sealed under ChaCha20-Poly1305.',
      },
      {
        title: 'Works Without Internet',
        body: 'Wi-Fi and Bluetooth discovery on the local network. No server sits between two phones in the same room.',
      },
      {
        title: 'Mesh Relay',
        body: 'Devices pass on packets for rooms they are not in, with a TTL, id deduplication, and a disk-backed spool for anything undelivered.',
      },
      {
        title: 'Files Too',
        body: 'Files travel the same path as messages — 16 KB chunks, each sealed and position-bound, verified against a SHA-256 digest before anything is written.',
      },
      {
        title: 'QR Invitations',
        body: 'A scannable link rather than a bare code, so a stray six-digit number means nothing to any other scanner.',
      },
    ],
    howItPlays: [
      { n: '01', title: 'Create a chat', body: 'One device opens a room and gets a passcode.' },
      { n: '02', title: 'Share the passcode', body: 'Read it out, or let the other phone scan the QR invitation.' },
      { n: '03', title: 'Talk', body: 'The chat mirrors across. Send messages or attach a file with +.' },
    ],
    buildStatus: {
      eyebrow: 'Where the build stands',
      title: 'Feature complete, with one honest gap.',
      sub: 'Every screen is wired to real behaviour — nothing in the UI is stubbed. The test suite covers everything below except where noted.',
      phases: [
        { label: 'UI shell', done: true },
        { label: 'Local chat + persistence', done: true },
        { label: 'TCP transport', done: true },
        { label: 'UDP discovery', done: true },
        { label: 'Passcode handshake', done: true },
        { label: 'Encryption (identity keypair, KDF, session keys)', done: true },
        { label: 'Bluetooth LE', done: false, note: 'Written, untested on hardware' },
        { label: 'Mesh relay (TTL, dedupe, acks)', done: true },
        { label: 'Store-and-forward', done: true },
        { label: 'Files and media', done: true },
      ],
    },
    disclaimer:
      'PassChat has not been security-reviewed by anyone other than its author. It is a portfolio project, not something to rely on for sensitive communication. Known limits: identity keys are trusted on first use, the local database is not encrypted at rest, and packet headers name the room and sender in the clear.',
    stack: ['Flutter', 'Dart', 'SQLite', 'Riverpod', 'X25519 / Ed25519', 'ChaCha20-Poly1305', 'Argon2id'],
    meta: { publisher: 'Arcadly', releaseDate: 'TBA', platform: 'Android · Windows', genre: 'Communication' },
    playStoreUrl: null,
    privacyUrl: null,
  },
];

export const getApp = (id) => APPS.find((a) => a.id === id);
