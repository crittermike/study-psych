import { useState, useEffect, useRef, useCallback } from 'react';
import { TERMS, CATEGORIES } from '../data/terms';
import CategoryFilter from './CategoryFilter';
import { shuffle, normText, escapeRegex } from '../utils/helpers';
import { playCorrect, playWrong } from '../utils/sound';

export default function FillBlank({ recordAnswer, onAchievement, onStreak }) {
  const [cat, setCat] = useState(null);
  const [deck, setDeck] = useState([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);
  const inputRef = useRef();

  const build = useCallback((category) => {
    const pool = category ? TERMS.filter(t => t.cat === category) : [...TERMS];
    setDeck(shuffle(pool));
    setIdx(0); setScore(0); setStreak(0); setInput(''); setFeedback(null); setDone(false);
  }, []);

  useEffect(() => { build(cat); }, []);
  const changeCat = (c) => { setCat(c); build(c); };

  const blankHtml = (item) => {
    const regex = new RegExp(escapeRegex(item.blank), 'i');
    return item.def.replace(regex, '<span class="blank-slot">' + item.blank + '</span>');
  };

  const check = () => {
    if (feedback) return;
    const item = deck[idx];
    const correct = normText(input) === normText(item.blank);
    recordAnswer(item.term, correct);
    if (correct) {
      playCorrect();
      setScore(s => s + 1);
      setStreak(s => {
        const ns = s + 1;
        if (ns >= 5) onAchievement('streak_5');
        if (ns >= 10) onAchievement('streak_10');
        if (ns >= 20) onAchievement('streak_20');
        onStreak(ns);
        return ns;
      });
    } else {
      playWrong();
      setStreak(s => { onStreak(s); return 0; });
    }
    setFeedback({ correct, answer: item.blank });
  };

  const next = () => {
    if (idx + 1 >= deck.length) { setDone(true); return; }
    setIdx(i => i + 1);
    setInput('');
    setFeedback(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  if (done) {
    return (
      <div>
        <CategoryFilter categories={CATEGORIES} selected={cat} onSelect={changeCat} />
        <div className="completed-msg">
          <div className="trophy">🎉</div><h2>All Done!</h2>
          <p>You got {score} out of {deck.length} correct.</p>
          <button onClick={() => build(cat)}>Go Again</button>
        </div>
      </div>
    );
  }

  const item = deck[idx];
  if (!item) return null;

  return (
    <div>
      <CategoryFilter categories={CATEGORIES} selected={cat} onSelect={changeCat} />
      <div className="input-mode">
        <div className="input-stats">
          <div className="stat"><div className="num">{score}</div><div className="label">Correct</div></div>
          <div className="stat"><div className="num">{idx}</div><div className="label">Total</div></div>
          <div className="stat"><div className="num">{streak}</div><div className="label">Streak</div></div>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${(idx / deck.length) * 100}%` }} />
        </div>
        <div className="prompt-card">
          <div className="prompt-label">{item.term}</div>
          <div className="prompt-cat">{item.cat}</div>
          <div className="prompt-text" dangerouslySetInnerHTML={{ __html: blankHtml(item) }} />
        </div>
        <div className="answer-row">
          <input ref={inputRef} className="answer-input" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') feedback ? next() : check(); }}
            placeholder="Type the missing word(s)..." disabled={!!feedback} autoFocus />
          {!feedback && <button className="submit-btn" onClick={check}>Check</button>}
        </div>
        {feedback && (
          <>
            <div className={`feedback ${feedback.correct ? 'correct' : 'wrong'}`}>
              {feedback.correct ? `✅ Correct! "${feedback.answer}"` : <>✗ Not quite<div className="correct-answer">Missing: <strong>{feedback.answer}</strong></div></>}
            </div>
            <button className="next-btn" onClick={next}>Next →</button>
          </>
        )}
      </div>
    </div>
  );
}
