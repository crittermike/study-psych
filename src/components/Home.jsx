import { useUnit } from '../context/UnitContext';

export default function Home({ setMode, progress }) {
  const { terms, categories, unit, isAllUnits } = useUnit();

  let mastered = 0, totalSeen = 0, totalCorrect = 0, due = 0;
  terms.forEach(t => {
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
  const ringPct = terms.length > 0 ? (mastered / terms.length) * 327 : 0;

  const cards = [
    { mode:'concepts', icon:'🔥', title:'Key Concepts', desc:'High-yield must-knows for the final.' },
    { mode:'flashcards', icon:'🃏', title:'Flashcards', desc:'SRS-powered spaced repetition. Due cards first.' },
    { mode:'write', icon:'✍️', title:'Write It', desc:'See the definition, type the term.' },
    { mode:'blanks', icon:'📝', title:'Fill Blank', desc:'Key words removed — fill them in.' },
    { mode:'matching', icon:'🧩', title:'Match', desc:'Pair terms with definitions vs. the clock.' },
    { mode:'speed', icon:'⚡', title:'Speed Round', desc:'Type as many right answers as you can before the buzzer.' },
    { mode:'scenario', icon:'🎯', title:'Scenario', desc:'Pick the term that matches the situation.' },
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
              strokeDasharray={`${ringPct} 327`}
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
            <span className="hsi-num">{terms.length}</span>
            <span className="hsi-label">{isAllUnits ? 'Total Terms' : 'Unit Terms'}</span>
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
        <strong>{isAllUnits ? '🎓 Final Exam Mix' : `📖 ${unit}`}:</strong>{' '}
        {isAllUnits
          ? `All ${terms.length} year-long terms across every AP Psych unit. Switch units in the picker above to drill one section at a time.`
          : `${terms.length} terms in this unit. Pick "All Units" above for the full final-exam mix.`}
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
        <h3>Progress by Category {isAllUnits ? '(all units)' : `· ${unit}`}</h3>
        {categories.map(cat => {
          const catTerms = terms.filter(t => t.cat === cat);
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
