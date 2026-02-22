import { useState, useCallback } from 'react';
import { TERMS } from '../data/terms';
import { humanInterval } from '../hooks/useProgress';
import { playFlip } from '../utils/sound';

export default function HardestTerms({ progress, srsRate, onAchievement }) {
  const [deck, setDeck] = useState(() => buildDeck(progress));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [complete, setComplete] = useState(false);

  function buildDeck(prog) {
    const seen = TERMS.filter(t => prog[t.term]?.seen > 0);
    if (seen.length < 3) return [];
    seen.sort((a, b) => {
      const pa = prog[a.term], pb = prog[b.term];
      const accA = pa.correct / pa.seen, accB = pb.correct / pb.seen;
      if (accA !== accB) return accA - accB;
      return (pa.conf || 0) - (pb.conf || 0);
    });
    return seen.slice(0, Math.min(10, seen.length));
  }

  const restart = () => {
    setDeck(buildDeck(progress));
    setIdx(0); setFlipped(false); setComplete(false);
  };

  const flip = () => { setFlipped(f => !f); playFlip(); };

  const rate = (conf) => {
    srsRate(deck[idx].term, conf);
    if (idx + 1 >= deck.length) {
      setComplete(true);
    } else {
      setIdx(i => i + 1);
      setFlipped(false);
    }
  };

  if (deck.length === 0) {
    return (
      <div className="hardest-empty">
        <div className="icon">📊</div>
        <p>Study some terms first before your hardest ones can be identified.<br />Try Flashcards or Write It first!</p>
      </div>
    );
  }

  if (complete) {
    return (
      <div className="completed-msg">
        <div className="trophy">💪</div>
        <h2>Hardest Terms Reviewed!</h2>
        <p>Reviewed {deck.length} of your toughest terms. Keep it up!</p>
        <button onClick={restart}>Go Again</button>
      </div>
    );
  }

  const card = deck[idx];

  return (
    <div className="flashcard-area">
      <p className="fc-due-badge" style={{ color: 'var(--orange)' }}>🔥 Your {deck.length} hardest terms</p>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${(idx / deck.length) * 100}%` }} />
      </div>
      <div className="card-container" onClick={flip}>
        <div className={`card-inner${flipped ? ' flipped' : ''}`}>
          <div className="card-face card-front">
            <span className="card-label">Term</span>
            <span className="card-cat">{card.cat}</span>
            <div className="term">{card.term}</div>
            <span className="hint">tap to flip</span>
          </div>
          <div className="card-face card-back">
            <span className="card-label">Definition</span>
            <div className="definition">{card.def}</div>
            {card.example && <div className="example-text" style={{ marginTop: '.6rem', fontSize: '.82rem', color: 'var(--text-dim)' }}>💡 {card.example}</div>}
          </div>
        </div>
      </div>
      {flipped && (
        <div className="conf-btns">
          {[1,2,3,4].map(c => (
            <button key={c} className={`conf-btn c${c}`} onClick={() => rate(c)}>
              {['','Again','Hard','Good','Easy'][c]}
            </button>
          ))}
        </div>
      )}
      <div className="counter">{idx + 1} / {deck.length}</div>
    </div>
  );
}
