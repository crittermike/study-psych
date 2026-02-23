import { useState, useEffect, useRef } from 'react';
import { TERMS } from '../data/terms';
import { shuffle, formatTime } from '../utils/helpers';
import { playCorrect, playWrong } from '../utils/sound';

export default function PracticeTest({ recordAnswer, onAchievement, onTestComplete }) {
  const [phase, setPhase] = useState('config'); // config | active | results
  const [qLen, setQLen] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [chosen, setChosen] = useState(null);
  const timerRef = useRef(null);

  const start = () => {
    clearInterval(timerRef.current);
    const pool = shuffle([...TERMS]);
    const count = Math.min(qLen, pool.length);
    const qs = pool.slice(0, count).map(item => {
      const wrongs = shuffle(TERMS.filter(t => t.term !== item.term)).slice(0, 3);
      return { item, options: shuffle([item, ...wrongs]), chosen: null };
    });
    setQuestions(qs);
    setQIdx(0); setScore(0); setSeconds(0); setChosen(null);
    setPhase('active');
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const answer = (opt) => {
    if (chosen) return;
    const q = questions[qIdx];
    const correct = opt.term === q.item.term;
    q.chosen = opt.term;
    setChosen(opt.term);
    recordAnswer(q.item.term, correct);
    if (correct) { playCorrect(); setScore(s => s + 1); } else playWrong();

    setTimeout(() => {
      const next = qIdx + 1;
      if (next >= questions.length) {
        clearInterval(timerRef.current);
        const finalScore = correct ? score + 1 : score;
        if (finalScore === questions.length) onAchievement('perfect_test');
        if (seconds < 60) onAchievement('speed_test');
        onTestComplete(finalScore, questions.length, seconds);
        setPhase('results');
      } else {
        setQIdx(next);
        setChosen(null);
      }
    }, 800);
  };

  if (phase === 'config') {
    return (
      <div className="test-config">
        <h2>📋 Practice Test</h2>
        <p>Timed multiple-choice. Pick your length:</p>
        <div className="test-length-picker">
          {[10, 20, TERMS.length].map(n => (
            <button key={n} className={`diff-btn${qLen === n ? ' active' : ''}`}
              onClick={() => setQLen(n)}>
              {n === TERMS.length ? 'All' : `${n} Qs`}
            </button>
          ))}
        </div>
        <button className="test-start-btn" onClick={start}>Start Test</button>
      </div>
    );
  }

  if (phase === 'results') {
    const wrong = questions.filter(q => q.chosen !== q.item.term);
    const pct = Math.round(score / questions.length * 100);
    return (
      <div className="test-results">
        <div className="trophy">{pct >= 90 ? '🏆' : pct >= 70 ? '👍' : '📚'}</div>
        <h2>Test Complete!</h2>
        <div className="score-line">{score} / {questions.length} ({pct}%)</div>
        <p>Completed in {formatTime(seconds)}</p>
        <div className="test-controls">
          <button className="new-round-btn" onClick={start}>Retake</button>
          <button className="secondary-btn" onClick={() => setPhase('config')}>New Test</button>
        </div>
        {wrong.length > 0 && (
          <div className="test-review">
            <h3>Review Missed ({wrong.length})</h3>
            {wrong.map((q, i) => (
              <div key={i} className="review-item">
                <div className="ri-term">{q.item.term}</div>
                <div className="ri-def">{q.item.def}</div>
                <div className="ri-your">Your answer: {q.chosen}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const q = questions[qIdx];
  return (
    <div className="test-question">
      <div className="test-q-header">
        <span className="q-num">Question {qIdx + 1} / {questions.length}</span>
        <span className="test-timer">{formatTime(seconds)}</span>
      </div>
      <div className="test-q-card">
        <div className="q-label">Which term matches this definition?</div>
        <div className="q-text">{q.item.def}</div>
      </div>
      <div className="test-options">
        {q.options.map((opt, i) => {
          let cls = 'test-opt';
          if (chosen) {
            cls += ' disabled';
            if (opt.term === q.item.term) cls += ' correct-opt';
            else if (opt.term === chosen) cls += ' wrong-opt';
          }
          return (
            <div key={i} className={cls} onClick={() => answer(opt)}>{opt.term}</div>
          );
        })}
      </div>
    </div>
  );
}
