import { useState, useEffect } from 'react';
import { CONFUSED_PAIRS, getTermByName } from '../data/terms';
import { shuffle } from '../utils/helpers';
import { playCorrect, playWrong, playFlip } from '../utils/sound';

export default function CompareContrast({ recordAnswer, onAchievement }) {
  const [pairs] = useState(() => shuffle([...CONFUSED_PAIRS]));
  const [pairIdx, setPairIdx] = useState(0);
  const [phase, setPhase] = useState('study'); // study | quiz | feedback
  const [quizTerm, setQuizTerm] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [roundsDone, setRoundsDone] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const pair = pairs[pairIdx % pairs.length];
  const termA = getTermByName(pair[0]);
  const termB = getTermByName(pair[1]);

  const startQuiz = () => {
    // Random: show a def or example, ask which term
    const target = Math.random() < 0.5 ? termA : termB;
    const useExample = target.example && Math.random() < 0.5;
    setQuizTerm({ ...target, prompt: useExample ? target.example : target.def, isExample: useExample });
    setPhase('quiz');
    setChosen(null);
  };

  const answer = (term) => {
    if (chosen) return;
    setChosen(term);
    const correct = term === quizTerm.term;
    recordAnswer(quizTerm.term, correct);
    correct ? playCorrect() : playWrong();
    if (correct) setScore(s => s + 1);
    setTotal(t => t + 1);
    setPhase('feedback');
  };

  const nextPair = () => {
    const nextIdx = pairIdx + 1;
    const rd = roundsDone + 1;
    setRoundsDone(rd);
    if (rd >= 5) onAchievement('compare_5');
    if (rd >= 10) onAchievement('compare_10');
    setPairIdx(nextIdx);
    setPhase('study');
    setChosen(null);
    setQuizTerm(null);
  };

  if (!termA || !termB) return <p>Loading...</p>;

  return (
    <div className="compare-section">
      <div className="input-stats" style={{ marginBottom: '1rem' }}>
        <div className="stat"><div className="num">{score}</div><div className="label">Correct</div></div>
        <div className="stat"><div className="num">{total}</div><div className="label">Total</div></div>
        <div className="stat"><div className="num">{pairIdx % pairs.length + 1}/{pairs.length}</div><div className="label">Pair</div></div>
      </div>

      {phase === 'study' && (
        <>
          <h2 className="compare-title">🔍 Compare &amp; Contrast</h2>
          <p className="compare-subtitle">Study these commonly confused terms, then test yourself.</p>
          <div className="compare-cards">
            <div className="compare-card">
              <div className="cc-header">{termA.term}</div>
              <div className="cc-def">{termA.def}</div>
              {termA.example && <div className="cc-example">💡 {termA.example}</div>}
            </div>
            <div className="compare-vs">VS</div>
            <div className="compare-card">
              <div className="cc-header">{termB.term}</div>
              <div className="cc-def">{termB.def}</div>
              {termB.example && <div className="cc-example">💡 {termB.example}</div>}
            </div>
          </div>
          <button className="test-start-btn" style={{ marginTop: '1.5rem' }} onClick={startQuiz}>
            Ready — Quiz Me!
          </button>
        </>
      )}

      {(phase === 'quiz' || phase === 'feedback') && quizTerm && (
        <>
          <div className="test-q-card">
            <div className="q-label">{quizTerm.isExample ? 'Which term does this scenario describe?' : 'Which term matches this definition?'}</div>
            <div className="q-text">{quizTerm.prompt}</div>
          </div>
          <div className="compare-choices">
            {[termA, termB].map(t => {
              let cls = 'test-opt';
              if (chosen) {
                cls += ' disabled';
                if (t.term === quizTerm.term) cls += ' correct-opt';
                else if (t.term === chosen) cls += ' wrong-opt';
              }
              return (
                <div key={t.term} className={cls} onClick={() => answer(t.term)}>{t.term}</div>
              );
            })}
          </div>
          {phase === 'feedback' && (
            <button className="next-btn" style={{ marginTop: '1rem' }} onClick={nextPair}>
              Next Pair →
            </button>
          )}
        </>
      )}
    </div>
  );
}
