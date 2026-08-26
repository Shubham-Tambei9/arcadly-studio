import { DEVLOG } from '../data/devlog.js';
import { GAMES } from '../data/games.js';
import { Reveal } from '../components/Motion.jsx';

export default function Post({ post }) {
  if (!post) {
    return (
      <div className="wrap" style={{ padding: '160px 24px' }}>
        <h1 className="section-title">Post not found.</h1>
        <a className="btn btn-primary" href="#/#devlog">
          Back to the dev log
        </a>
      </div>
    );
  }

  const others = DEVLOG.filter((p) => p.id !== post.id).slice(0, 3);
  const game = post.relatedGame ? GAMES.find((g) => g.id === post.relatedGame) : null;

  return (
    <article className="detail">
      <section className="detail-hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap">
          <a className="back-link" href="#/#devlog">
            ← All dev log posts
          </a>

          <div className="post-meta">
            <span className="log-cat">{post.category}</span>
            <span className="log-date">{post.date}</span>
            <span className="log-date">· {post.readTime} read</span>
          </div>

          <h1 className="post-title">{post.title}</h1>
          <p className="detail-lede">{post.excerpt}</p>

          {game && (
            <a className="post-game" href={`#/game/${game.id}`}>
              <img src={game.icon} alt="" />
              <span>
                <span className="post-game-kicker">From the making of</span>
                <span className="post-game-name">{game.title}</span>
              </span>
              <span className="link-arrow">→</span>
            </a>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="post-body">
            <p className="post-greeting">{post.greeting}</p>

            {post.story.map((block, i) => (
              <Reveal key={block.heading} delay={i * 40}>
                <div className="post-block">
                  <h2 className="post-heading">
                    <span className="post-heading-idx">{String(i + 1).padStart(2, '0')}</span>
                    {block.heading}
                  </h2>
                  <p className="post-para">{block.body}</p>
                </div>
              </Reveal>
            ))}

            <div className="post-signoff">
              <span className="post-signoff-rule" aria-hidden="true" />
              <div>
                <span className="post-author">— {post.author}</span>
                <span className="post-studio">{post.studio}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!!others.length && (
        <section className="section">
          <div className="wrap">
            <span className="eyebrow">Keep reading</span>
            <h2 className="section-title">More from the lab.</h2>
            <div className="log-grid" style={{ marginTop: 40 }}>
              {others.map((o) => (
                <a className="log spot" href={`#/log/${o.id}`} key={o.id}>
                  <div className="log-meta">
                    <span className="log-cat">{o.category}</span>
                    <span className="log-date">{o.date}</span>
                  </div>
                  <h3 className="log-title">{o.title}</h3>
                  <p className="log-excerpt">{o.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
