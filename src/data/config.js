/* Feedback delivery.
 *
 * This site is static — there is no server to POST to. So the widget has two
 * modes, and it tells the visitor which one it is using:
 *
 *   1. ENDPOINT set  -> the message is POSTed as JSON and never leaves the page.
 *   2. ENDPOINT empty -> the visitor's mail client opens, pre-filled. Nothing is
 *      sent until they press send in their own client.
 *
 * Mode 2 is the default because it works with zero setup and cannot silently
 * swallow a message. To upgrade to mode 1, sign up for a form backend that
 * accepts a plain JSON POST — Formspree, Web3Forms and Formspark all do — and
 * paste the endpoint URL below. No other change is needed.
 *
 *   FEEDBACK_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
 */
export const FEEDBACK_ENDPOINT = '';

export const FEEDBACK_EMAIL = 'tambeshubham2004@gmail.com';

export const FEEDBACK_COPY = {
  launch: 'Feedback',
  title: 'Tell us what you think',
  sub: 'Found a bug, beat a level, or think something could be better? It goes straight to the developer.',
  cta: 'Send feedback',
  ratingLabel: 'How is it so far?',
  messageLabel: 'Your message',
  placeholder: 'What happened, what you expected, or what you would change…',
};

export const FEEDBACK_TOPICS = [
  { id: 'bug', label: 'Something is broken' },
  { id: 'game', label: 'Feedback on a game' },
  { id: 'idea', label: 'Idea or request' },
  { id: 'other', label: 'Something else' },
];
