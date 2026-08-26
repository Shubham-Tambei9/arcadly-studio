import { REVIEWS, reviewsFor } from '../data/reviews.js';

function Stars({ n }) {
  return (
    <span className="stars" aria-label={`${n} out of 5 stars`}>
      {'★'.repeat(n)}
      <span className="stars-off">{'★'.repeat(5 - n)}</span>
    </span>
  );
}

export function ReviewList({ gameId, storeUrl, compact = false }) {
  const list = gameId ? reviewsFor(gameId) : REVIEWS;

  if (!list.length) {
    return (
      <div className={`reviews-empty ${compact ? 'reviews-empty-sm' : ''}`}>
        <p className="reviews-empty-title">No player reviews yet.</p>
        <p className="reviews-empty-body">
          {storeUrl
            ? 'Played it? Your review is the one that gets the next player to try it.'
            : 'Reviews will appear here once the title is live on Google Play.'}
        </p>
        {storeUrl && (
          <a className="btn btn-ghost" href={storeUrl} target="_blank" rel="noreferrer">
            Be the first to review
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="review-grid">
      {list.map((r, i) => (
        <figure className="review spot" key={`${r.author}-${i}`}>
          <Stars n={r.rating} />
          <blockquote className="review-body">{r.body}</blockquote>
          <figcaption className="review-meta">
            <span className="review-author">{r.author}</span>
            <span className="review-source">
              {r.source} · {r.date}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function ReviewsSection({ storeUrl }) {
  return (
    <section className="section" id="reviews">
      <div className="wrap">
        <span className="eyebrow">Players</span>
        <h2 className="section-title">What players say.</h2>
        <p className="section-sub">
          Reviews are pulled from the public Google Play listing — we only publish what players
          actually wrote.
        </p>
        <div style={{ marginTop: 44 }}>
          <ReviewList storeUrl={storeUrl} />
        </div>
      </div>
    </section>
  );
}
