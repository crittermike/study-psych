import { ACHIEVEMENT_DEFS } from '../utils/achievements';
import { formatTime } from '../utils/helpers';

export default function Leaderboard({ achievements, leaderboard }) {
  const earned = ACHIEVEMENT_DEFS.filter(a => achievements[a.id]);
  const unearned = ACHIEVEMENT_DEFS.filter(a => !achievements[a.id]);

  return (
    <div className="leaderboard-section">
      {/* Achievements */}
      <h2 className="lb-heading">🏅 Achievements</h2>
      <div className="achievement-grid">
        {earned.map(a => (
          <div key={a.id} className="achievement-card earned">
            <div className="ach-icon">{a.icon}</div>
            <div className="ach-title">{a.title}</div>
            <div className="ach-desc">{a.desc}</div>
          </div>
        ))}
        {unearned.map(a => (
          <div key={a.id} className="achievement-card locked">
            <div className="ach-icon">🔒</div>
            <div className="ach-title">{a.title}</div>
            <div className="ach-desc">{a.desc}</div>
          </div>
        ))}
      </div>

      {/* Test scores */}
      {leaderboard.tests.length > 0 && (
        <>
          <h2 className="lb-heading">📋 Best Test Scores</h2>
          <div className="lb-table">
            <div className="lb-row lb-header">
              <span>#</span><span>Score</span><span>Time</span><span>Date</span>
            </div>
            {leaderboard.tests.map((t, i) => (
              <div key={i} className="lb-row">
                <span>{i + 1}</span>
                <span className="accent-text">{t.pct}% ({t.score}/{t.total})</span>
                <span>{formatTime(t.time)}</span>
                <span>{new Date(t.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Match times */}
      {leaderboard.matches.length > 0 && (
        <>
          <h2 className="lb-heading">🧩 Best Match Times</h2>
          <div className="lb-table">
            <div className="lb-row lb-header">
              <span>#</span><span>Time</span><span>Pairs</span><span>Mistakes</span>
            </div>
            {leaderboard.matches.map((m, i) => (
              <div key={i} className="lb-row">
                <span>{i + 1}</span>
                <span className="accent-text">{formatTime(m.time)}</span>
                <span>{m.pairs}</span>
                <span>{m.mistakes}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Streaks */}
      {leaderboard.streaks.length > 0 && (
        <>
          <h2 className="lb-heading">⚡ Longest Streaks</h2>
          <div className="lb-table">
            <div className="lb-row lb-header">
              <span>#</span><span>Streak</span><span>Date</span>
            </div>
            {leaderboard.streaks.map((s, i) => (
              <div key={i} className="lb-row">
                <span>{i + 1}</span>
                <span className="accent-text">{s.streak} 🔥</span>
                <span>{new Date(s.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {leaderboard.tests.length === 0 && leaderboard.matches.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-dim)', marginTop: '1rem' }}>
          Complete tests and matches to see your scores here!
        </p>
      )}
    </div>
  );
}
