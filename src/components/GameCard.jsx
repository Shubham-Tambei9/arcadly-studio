export default function GameCard({ game, href }) {
  return (
    <article className="game spot">
      <div className="game-head">
        <img className="game-icon" src={game.icon} alt={`${game.title} icon`} loading="lazy" />
        <div className="game-head-meta">
          <h3 className="game-name">{game.title}</h3>
          <span className="game-cat">{game.category}</span>
          <span className={`status status-${game.status}`}>
            {game.status === 'live' && <span className="dot" aria-hidden="true" />}
            {game.statusLabel}
          </span>
        </div>
      </div>

      <p className="game-tagline">{game.tagline}</p>
      <p className="game-desc">{game.description}</p>

      {typeof game.progress === 'number' && (
        <>
          <div className="progress-row">
            <span className="progress-phase">{game.phase}</span>
            <span className="progress-pct">{game.progress}%</span>
          </div>
          <div
            className="progress-track"
            role="img"
            aria-label={`${game.title} build progress: ${game.progress} percent, ${game.phase}`}
          >
            <div className="progress-fill" style={{ width: `${game.progress}%` }} />
          </div>
        </>
      )}

      {!!game.tags?.length && (
        <div className="game-tags">
          {game.tags.map((t) => (
            <span className="pill" key={t}>
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="game-actions">
        {href && (
          <a className="game-cta" href={href}>
            Learn more →
          </a>
        )}
        {game.playStoreUrl && (
          <a
            className="game-cta-alt"
            href={game.playStoreUrl}
            target="_blank"
            rel="noreferrer"
          >
            ▶ Google Play
          </a>
        )}
      </div>
    </article>
  );
}
