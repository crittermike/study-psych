import { useState, useEffect, useRef } from 'react';
import { TERMS } from '../data/terms';
import { shuffle, formatTime, isCorrectTerm, normText, escapeRegex } from '../utils/helpers';
import { playCorrect, playWrong } from '../utils/sound';

// Mixed test: multiple-choice, write-it, fill-blank, and scenario-based
function generateQuestions(count) {
  const pool = shuffle([...TERMS]);
  const n = Math.min(count, pool.length);
  const types = ['mc', 'write', 'blank', 'scenario'];
  return pool.slice(0, n).map((item, i) => {
    const type = types[i % types.length];
    if (type === 'mc') {
      const wrongs = shuffle(TERMS.filter(t => t.term !== item.term)).slice(0, 3);
      return { type, item, options: shuffle([item, ...wrongs]), answer: null };
    }
    return { type, item, answer: null };
  });
}

export default function MixedTest({ recordAnswer, onAchievement, onTestComplete }) {
  const [phase, setPhase] = useState('config');
  const [qLen, setQLen] = useState(12);
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const timerRef = useRef(null);
  const inputRef = useRef();

  const start = () => {
    clearInterval(timerRef.current);
    setQuestions(generateQuestions(qLen));
    setQIdx(0); setScore(0); setSeconds(0); setInput(''); setFeedback(null);
    setPhase('active');
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const advance = (correct) => {
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      const next = qIdx + 1;
      if (next >= questions.length) {
        clearInterval(timerRef.current);
        const fs = correct ? score + 1 : score;
        onAchievement('mixed_complete');
        if (fs === questions.length) onAchievement('perfect_test');
        if (seconds < 60) onAchievement('speed_test');
        onTestComplete(fs, questions.length, seconds);
        setPhase('results');
      } else {
        setQIdx(next);
        setInput('');
        setFeedback(null);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    }, 900);
  };

  // Multiple choice handler
  const handleMC = (opt) => {
    if (feedback) return;
    const q = questions[qIdx];
    const correct = opt.term === q.item.term;
    q.answer = opt.term;
    recordAnswer(q.item.term, correct);
    correct ? playCorrect() : playWrong();
    setFeedback({ correct, chosen: opt.term, answer: q.item.term });
    advance(correct);
  };

  // Text input handler (write, blank, scenario)
  const handleSubmit = () => {
    if (feedback) return;
    const q = questions[qIdx];
    let correct = false;
    if (q.type === 'write' || q.type === 'scenario') {
      correct = isCorrectTerm(input, q.item);
      q.answer = input;
    } else if (q.type === 'blank') {
      correct = normText(input) === normText(q.item.blank);
      q.answer = input;
    }
    recordAnswer(q.item.term, correct);
    correct ? playCorrect() : playWrong();
    setFeedback({ correct, answer: q.type === 'blank' ? q.item.blank : q.item.term });
    advance(correct);
  };

  if (phase === 'config') {
    return (
      <div className="test-config">
        <h2>🧠 Mixed Practice Test</h2>
        <p>Multiple-choice, write-it, fill-blank, and scenario questions combined.</p>
        <div className="test-length-picker">
          {[8, 12, 20].map(n => (
            <button key={n} className={`diff-btn${qLen === n ? ' active' : ''}`}
              onClick={() => setQLen(n)}>{n} Qs</button>
          ))}
        </div>
        <button className="test-start-btn" onClick={start}>Start Test</button>
      </div>
    );
  }

  if (phase === 'results') {
    const wrong = questions.filter(q => {
      if (q.type === 'mc') return q.answer !== q.item.term;
      if (q.type === 'blank') return normText(q.answer || '') !== normText(q.item.blank);
      return !isCorrectTerm(q.answer || '', q.item);
    });
    const pct = Math.round(score / questions.length * 100);
    return (
      <div className="test-results">
        <div className="trophy">{pct >= 90 ? '🏆' : pct >= 70 ? '👍' : '📚'}</div>
        <h2>Mixed Test Complete!</h2>
        <div className="score-line">{score} / {questions.length} ({pct}%)</div>
        <p>Completed in {formatTime(seconds)}</p>
        <div className="test-controls">
          <button className="new-round-btn" onClick={start}>Retake</button>
        </div>
        {wrong.length > 0 && (
          <div className="test-review">
            <h3>Review Missed ({wrong.length})</h3>
            {wrong.map((q, i) => (
              <div key={i} className="review-item">
                <div className="ri-term">{q.item.term}</div>
                <div className="ri-def">{q.item.def}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const q = questions[qIdx];
  const typeLabel = { mc: 'Multiple Choice', write: 'Write the Term', blank: 'Fill in the Blank', scenario: 'Identify from Scenario' }[q.type];

  return (
    <div className="test-question">
      <div className="test-q-header">
        <span className="q-num">Q{qIdx + 1}/{questions.length}</span>
        <span className="q-type-badge">{typeLabel}</span>
        <span className="test-timer">{formatTime(seconds)}</span>
      </div>

      {q.type === 'mc' && (
        <>
          <div className="test-q-card">
            <div className="q-label">Which term matches this definition?</div>
            <div className="q-text">{q.item.def}</div>
          </div>
          <div className="test-options">
            {q.options.map((opt, i) => {
              let cls = 'test-opt';
              if (feedback) {
                cls += ' disabled';
                if (opt.term === q.item.term) cls += ' correct-opt';
                else if (opt.term === feedback.chosen) cls += ' wrong-opt';
              }
              return <div key={i} className={cls} onClick={() => handleMC(opt)}>{opt.term}</div>;
            })}
          </div>
        </>
      )}

      {q.type === 'write' && (
        <>
          <div className="test-q-card">
            <div className="q-label">Type the term for this definition</div>
            <div className="q-text">{q.item.def}</div>
          </div>
          <div className="answer-row">
            <input ref={inputRef} className="answer-input" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
              placeholder="Type the term..." disabled={!!feedback} autoFocus />
            {!feedback && <button className="submit-btn" onClick={handleSubmit}>Check</button>}
          </div>
          {feedback && <div className={`feedback ${feedback.correct ? 'correct' : 'wrong'}`}>
            {feedback.correct ? '✅ Correct!' : <>✗ Answer: <strong>{feedback.answer}</strong></>}
          </div>}
        </>
      )}

      {q.type === 'blank' && (
        <>
          <div className="test-q-card">
            <div className="q-label">{q.item.term} — fill in the missing word(s)</div>
            <div className="q-text" dangerouslySetInnerHTML={{
              __html: q.item.def.replace(new RegExp(escapeRegex(q.item.blank), 'i'),
                '<span class="blank-slot">' + q.item.blank + '</span>')
            }} />
          </div>
          <div className="answer-row">
            <input ref={inputRef} className="answer-input" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
              placeholder="Type the missing word(s)..." disabled={!!feedback} autoFocus />
            {!feedback && <button className="submit-btn" onClick={handleSubmit}>Check</button>}
          </div>
          {feedback && <div className={`feedback ${feedback.correct ? 'correct' : 'wrong'}`}>
            {feedback.correct ? '✅ Correct!' : <>✗ Answer: <strong>{feedback.answer}</strong></>}
          </div>}
        </>
      )}

      {q.type === 'scenario' && (
        <>
          <div className="test-q-card">
            <div className="q-label">What concept does this scenario illustrate?</div>
            <div className="q-text scenario-text">💡 {q.item.example || q.item.def}</div>
          </div>
          <div className="answer-row">
            <input ref={inputRef} className="answer-input" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
              placeholder="Type the term..." disabled={!!feedback} autoFocus />
            {!feedback && <button className="submit-btn" onClick={handleSubmit}>Check</button>}
          </div>
          {feedback && <div className={`feedback ${feedback.correct ? 'correct' : 'wrong'}`}>
            {feedback.correct ? '✅ Correct!' : <>✗ Answer: <strong>{feedback.answer}</strong></>}
          </div>}
        </>
      )}
    </div>
  );
}
