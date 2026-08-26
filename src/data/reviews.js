/* Player reviews.
 *
 * ⚠️  INTENTIONALLY EMPTY — DO NOT FILL WITH SAMPLE COPY.
 * Checked on Aug 26, 2026: the Google Play listing for com.srt.skyhopper shows
 * no ratings-and-reviews section at all, which means it has too few ratings for
 * Google to publish one. There are no real player reviews to display yet.
 *
 * Writing invented testimonials here would put fabricated quotes from
 * non-existent people on a public site — and anyone could disprove them in one
 * click on the store listing. So the section renders a "be the first" state
 * instead, which is honest and actually drives real reviews.
 *
 * When real reviews exist, add them in this shape (quote them verbatim, and
 * only use the reviewer name Google already shows publicly):
 *
 *   {
 *     gameId: 'sky-hopper',
 *     author: 'Name as shown on Google Play',
 *     rating: 5,
 *     date: 'Sep 2, 2026',
 *     body: 'Their words, unedited.',
 *     source: 'Google Play',
 *   }
 */
export const REVIEWS = [];

export const reviewsFor = (gameId) => REVIEWS.filter((r) => r.gameId === gameId);
