import { useEffect, useRef, useState } from 'react';
import { useUnit } from '../context/UnitContext';
import { shuffle, isCorrectTerm } from '../utils/helpers';
import { playCorrect, playWrong } from '../utils/sound';

const ROUND_LENGTHS = [30, 60, 120];

export default function SpeedRound({ recordAnswer, onAchievement, onSpeedComplete }) {
  const { terms, unit } = useUnit();
  const [phase, setPhase] = useState('config');
  const [length, setLength] = useState(60);
  const [deck, setDeck] = useState([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef();
  const timerRef = useRef();

  const start = () => {
    if (terms.length < 4) return;
    clearInterval(timerRef.current);
    setDeck(shuffle(terms));
    setIdx(0);
    setScore(0);
    setMisses(0);
    setSeconds(length);
    setInput('');
    setFeedback(null);
    setPhase('active');
    timerRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  useEffect(() => {
    if (phase === 'active' && seconds === 0) {
      setPhase('results');
      onSpeedComplete?.({ score, misses, length, unit });
      if (score >= 10) onAchievement?.('speed_round_10');
      if (score >= 25) onAchievement?.('speed_round_25');
    }
  }, [seconds, phase, score, misses, length, unit, onSpeedComplete, onAchievement]);

  const submit = () => {
    if (phase !== 'active' || !input.trim()) return;
    const item = deck[idx % deck.length];
    const correct = isCorrectTerm(input, item);
    recordAnswer(item.term, correct);
    if (correct) {
      playCorrect();
      setScore(s => s + 1);
      setFeedback({ correct: true });
    } else {
      playWrong();
      setMisses(m => m + 1);
      setFeedback({ correct: false, answer: item.term });
    }
    setInput('');
    setIdx(i => i + 1);
    setTimeout(() => setFeedback(null), 600);
  };

  const skip = () => {
    if (phase !== 'active') return;
    const item = deck[idx % deck.length];
    setMisses(m => m + 1);
    setFeedback({ correct: false, answer: item.term });
    setInput('');
    setIdx(i => i + 1);
    setTimeout(() => setFeedback(null), 600);
  };

  if (phase === 'config') {
    return (
      <div className="test-config speed-config">
        <h2>⚡ Speed Round</h2>
        <p>Type the term that matches each definition. As many as you can before the buzzer.</p>
        <div className="test-length-picker">
          {ROUND_LENGTHS.map(n => (
            <button key={n} className={`diff-btn${length === n ? ' active' : ''}`} onClick={() => setLength(n)}>
              {n}s
            </button>
          ))}
        </div>
        <button className="test-start-btn" onClick={start} disabled={terms.length < 4}>
          {terms.length < 4 ? 'Need 4+ terms' : 'Start Speed Round'}
        </button>
        <p className="speed-hint">Tip: hit Enter to submit, Tab to skip.</p>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div className="test-results">
        <div className="trophy">{score >= 25 ? '🚀' : score >= 10 ? '⚡' : '⏱️'}</div>
        <h2>Time!</h2>
        <div className="score-line">{score} correct</div>
        <p>{misses} miss{misses === 1 ? '' : 'es'} · {length}s round</p>
        <div className="test-controls">
          <button className="new-round-btn" onClick={start}>Run It Back</button>
          <button className="secondary-btn" onClick={() => setPhase('config')}>Back</button>
        </div>
      </div>
    );
  }

  const item = deck[idx % deck.length];
  if (!item) return null;
  const timeFrac = seconds / length;
  const timerColor = timeFrac > 0.5 ? 'var(--accent)' : timeFrac > 0.25 ? 'var(--orange)' : 'var(--red)';

  return (
    <div className="speed-round">
      <div className="speed-header">
        <span className="speed-timer" style={{ color: timerColor }}>⏱ {seconds}s</span>
        <span className="speed-stat speed-correct">✅ {score}</span>
        <span className="speed-stat speed-wrong">❌ {misses}</span>
      </div>
      <div className="speed-bar">
        <div className="speed-bar-fill" style={{ width: `${timeFrac * 100}%`, background: timerColor }} />
      </div>
      <div className="prompt-card">
        <div className="prompt-label">Definition</div>
        <div className="prompt-cat">{item.cat}</div>
        <div className="prompt-text">{item.def}</div>
      </div>
      <div className="answer-row">
        <input
          ref={inputRef}
          className="answer-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') submit();
            else if (e.key === 'Tab') { e.preventDefault(); skip(); }
          }}
          placeholder="Type the term... (Tab to skip)"
          autoFocus
        />
        <button className="submit-btn" onClick={submit}>Go</button>
      </div>
      {feedback && (
        <div className={`feedback ${feedback.correct ? 'correct' : 'wrong'}`}>
          {feedback.correct ? '✅ +1' : <>✗ {feedback.answer}</>}
        </div>
      )}
    </div>
  );
}
