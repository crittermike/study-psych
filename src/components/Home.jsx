import { TERMS, CATEGORIES } from '../data/terms';

export default function Home({ setMode, progress }) {
  let mastered = 0, totalSeen = 0, totalCorrect = 0, due = 0;
  TERMS.forEach(t => {
    const p = progress[t.term];
    if (p) {
      if (p.conf >= 4 && p.interval >= 86400000) mastered++;
      totalSeen += p.seen;
      totalCorrect += p.correct;
    }
    const isDue = !p || p.seen === 0 || Date.now() >= p.nextReview;
    if (isDue) due++;
  });
  const accuracy = totalSeen > 0 ? Math.round(totalCorrect / totalSeen * 100) + '%' : '—';

  const cards = [
    { mode:'flashcards', icon:'🃏', title:'Flashcards', desc:'SRS-powered spaced repetition. Due cards first.' },
    { mode:'write', icon:'✍️', title:'Write It', desc:'See the definition, type the term.' },
    { mode:'blanks', icon:'📝', title:'Fill Blank', desc:'Key words removed — fill them in.' },
    { mode:'matching', icon:'🧩', title:'Match', desc:'Pair terms with definitions vs. the clock.' },
    { mode:'test', icon:'📋', title:'Practice Test', desc:'Timed multiple-choice quiz.' },
    { mode:'mixed', icon:'🧠', title:'Mixed Test', desc:'All question types combined.' },
    { mode:'compare', icon:'🔍', title:'Compare', desc:'Commonly confused term pairs.' },
    { mode:'hardest', icon:'🔥', title:'Hardest', desc:'Focus on your weakest terms.' },
    { mode:'leaderboard', icon:'🏅', title:'Leaderboard', desc:'Personal bests & achievements.' },
  ];

  return (
    <div className="home-section">
      {/* Hero stats */}
      <div className="hero-stats">
        <div className="hero-stat-ring">
          <svg viewBox="0 0 120 120" className="ring-svg">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--surface2)" strokeWidth="8" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="url(#grad)" strokeWidth="8"
              strokeDasharray={`${(mastered / TERMS.length) * 327} 327`}
              strokeLinecap="round" transform="rotate(-90 60 60)" />
            <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent2)" />
            </linearGradient></defs>
          </svg>
          <div className="ring-inner">
            <div className="ring-num">{mastered}</div>
            <div className="ring-label">Mastered</div>
          </div>
        </div>
        <div className="hero-stat-list">
          <div className="hero-stat-item">
            <span className="hsi-num">{TERMS.length}</span>
            <span className="hsi-label">Total Terms</span>
          </div>
          <div className="hero-stat-item">
            <span className="hsi-num accent-text">{due}</span>
            <span className="hsi-label">Due Now</span>
          </div>
          <div className="hero-stat-item">
            <span className="hsi-num">{accuracy}</span>
            <span className="hsi-label">Accuracy</span>
          </div>
        </div>
      </div>

      <div className="update-panel">
        <strong>Updated unit set:</strong> Health Psychology + Clinical Psychology terminology from the newest review screenshots.
      </div>

      {/* Activity cards */}
      <div className="home-grid">
        {cards.map(c => (
          <button key={c.mode} className="home-card" onClick={() => setMode(c.mode)}>
            <div className="icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </button>
        ))}
      </div>

      {/* Category progress */}
      <div className="cat-progress-section">
        <h3>Progress by Category</h3>
        {CATEGORIES.map(cat => {
          const catTerms = TERMS.filter(t => t.cat === cat);
          let cc = 0, cs = 0;
          catTerms.forEach(t => { const p = progress[t.term]; if (p) { cc += p.correct; cs += p.seen; } });
          const pct = cs > 0 ? Math.round(cc / cs * 100) : 0;
          return (
            <div key={cat} className="cat-progress-row">
              <span className="cat-name">{cat}</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: pct + '%' }} /></div>
              <span className="bar-pct">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
