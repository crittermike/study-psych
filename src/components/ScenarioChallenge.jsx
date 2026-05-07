import { useState, useEffect } from 'react';
import { useUnit } from '../context/UnitContext';
import { shuffle } from '../utils/helpers';
import { playCorrect, playWrong } from '../utils/sound';

function buildRound(pool) {
  if (pool.length < 4) return null;
  const target = pool[Math.floor(Math.random() * pool.length)];
  const wrongs = shuffle(pool.filter(t => t.term !== target.term)).slice(0, 3);
  return { target, options: shuffle([target, ...wrongs]) };
}

export default function ScenarioChallenge({ recordAnswer, onAchievement }) {
  const { terms, unit } = useUnit();
  const eligible = terms.filter(t => t.example);
  const [round, setRound] = useState(() => buildRound(eligible));
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);

  // Rebuild when unit changes
  useEffect(() => {
    setRound(buildRound(terms.filter(t => t.example)));
    setChosen(null);
    setScore(0);
    setTotal(0);
    setStreak(0);
  }, [unit, terms]);

  if (!round) {
    return (
      <div className="hardest-empty">
        <div className="icon">🎯</div>
        <p>Need at least 4 terms with examples in this unit before scenarios can run.</p>
      </div>
    );
  }

  const answer = (term) => {
    if (chosen) return;
    setChosen(term);
    const correct = term === round.target.term;
    recordAnswer(round.target.term, correct);
    correct ? playCorrect() : playWrong();
    if (correct) {
      setScore(s => s + 1);
      setStreak(s => {
        const ns = s + 1;
        if (ns >= 5) onAchievement?.('scenario_streak_5');
        if (ns >= 10) onAchievement?.('scenario_streak_10');
        return ns;
      });
    } else {
      setStreak(0);
    }
    setTotal(t => t + 1);
  };

  const next = () => {
    setRound(buildRound(eligible));
    setChosen(null);
  };

  return (
    <div className="scenario-section">
      <div className="input-stats" style={{ marginBottom: '1rem' }}>
        <div className="stat"><div className="num">{score}</div><div className="label">Correct</div></div>
        <div className="stat"><div className="num">{total}</div><div className="label">Total</div></div>
        <div className="stat"><div className="num">{streak}</div><div className="label">Streak</div></div>
      </div>
      <h2 className="compare-title">🎯 Scenario Challenge</h2>
      <p className="compare-subtitle">Read the situation. Pick the matching term.</p>
      <div className="test-q-card">
        <div className="q-label">Scenario</div>
        <div className="q-text scenario-text">{round.target.example}</div>
      </div>
      <div className="test-options">
        {round.options.map(opt => {
          let cls = 'test-opt';
          if (chosen) {
            cls += ' disabled';
            if (opt.term === round.target.term) cls += ' correct-opt';
            else if (opt.term === chosen) cls += ' wrong-opt';
          }
          return (
            <div key={opt.term} className={cls} onClick={() => answer(opt.term)}>
              {opt.term}
            </div>
          );
        })}
      </div>
      {chosen && (
        <>
          <div className={`feedback ${chosen === round.target.term ? 'correct' : 'wrong'}`} style={{ marginTop: '1rem' }}>
            {chosen === round.target.term
              ? '✅ Nailed it.'
              : <>✗ Right answer: <strong>{round.target.term}</strong>. {round.target.def}</>}
          </div>
          <button className="next-btn" style={{ marginTop: '1rem' }} onClick={next}>Next Scenario →</button>
        </>
      )}
    </div>
  );
}
