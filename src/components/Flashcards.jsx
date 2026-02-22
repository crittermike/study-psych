import { useState, useEffect, useCallback } from 'react';
import { TERMS, CATEGORIES } from '../data/terms';
import CategoryFilter from './CategoryFilter';
import { shuffle } from '../utils/helpers';
import { humanInterval } from '../hooks/useProgress';
import { playFlip } from '../utils/sound';

export default function Flashcards({ progress, srsRate, isDue, previewInterval, onAchievement }) {
  const [cat, setCat] = useState(null);
  const [deck, setDeck] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const buildDeck = useCallback((category) => {
    let pool = category ? TERMS.filter(t => t.cat === category) : [...TERMS];
    pool.sort((a, b) => {
      const aDue = isDue(a.term) ? 0 : 1;
      const bDue = isDue(b.term) ? 0 : 1;
      if (aDue !== bDue) return aDue - bDue;
      const aNext = progress[a.term]?.nextReview || 0;
      const bNext = progress[b.term]?.nextReview || 0;
      return aNext - bNext;
    });
    setDeck(pool);
    setIdx(0);
    setFlipped(false);
    setComplete(false);
    setShowExample(false);
  }, [isDue, progress]);

  useEffect(() => { buildDeck(cat); }, []);

  const changeCat = (c) => { setCat(c); buildDeck(c); };

  const flip = () => {
    if (complete) return;
    setFlipped(f => !f);
    setShowExample(false);
    playFlip();
  };

  const rate = (conf) => {
    srsRate(deck[idx].term, conf);
    onAchievement('first_flip');
    const next = idx + 1;
    if (next >= deck.length) {
      setComplete(true);
    } else {
      setIdx(next);
      setFlipped(false);
      setShowExample(false);
    }
  };

  const doShuffle = () => {
    const pool = cat ? TERMS.filter(t => t.cat === cat) : [...TERMS];
    setDeck(shuffle(pool));
    setIdx(0);
    setFlipped(false);
    setComplete(false);
    setShowExample(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.code === 'Space') { e.preventDefault(); flip(); }
      if (flipped && e.key >= '1' && e.key <= '4') rate(parseInt(e.key));
      if (e.code === 'KeyE' && flipped) setShowExample(s => !s);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const dueCount = deck.filter(t => isDue(t.term)).length;
  const card = deck[idx];

  if (complete) {
    return (
      <div>
        <CategoryFilter categories={CATEGORIES} selected={cat} onSelect={changeCat} />
        <div className="completed-msg">
          <div className="trophy">🎉</div>
          <h2>Round Complete!</h2>
          <p>Reviewed all {deck.length} cards in this set.</p>
          <button onClick={() => buildDeck(cat)}>Go Again</button>
        </div>
      </div>
    );
  }

  if (!card) return null;

  return (
    <div>
      <CategoryFilter categories={CATEGORIES} selected={cat} onSelect={changeCat} />
      <div className="flashcard-area">
        <div className="fc-due-badge">
          {dueCount > 0 ? `⏰ ${dueCount} card${dueCount > 1 ? 's' : ''} due` : '✅ All caught up!'}
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${(idx / deck.length) * 100}%` }} />
        </div>
        <div className="card-container" onClick={flip}>
          <div className={`card-inner${flipped ? ' flipped' : ''}`}>
            <div className="card-face card-front">
              <span className="card-label">Term</span>
              <span className="card-cat">{card.cat}</span>
              <div className="term">{card.term}</div>
              <span className="hint">tap to flip · space</span>
            </div>
            <div className="card-face card-back">
              <span className="card-label">Definition</span>
              <div className="definition">{card.def}</div>
              {card.example && (
                <button className="example-toggle" onClick={(e) => { e.stopPropagation(); setShowExample(s => !s); }}>
                  {showExample ? '▾ Hide' : '▸ Example'} (E)
                </button>
              )}
              {showExample && <div className="example-text">💡 {card.example}</div>}
            </div>
          </div>
        </div>
        {flipped && (
          <div className="conf-btns">
            {[1,2,3,4].map(c => (
              <button key={c} className={`conf-btn c${c}`} onClick={() => rate(c)}>
                {['','Again','Hard','Good','Easy'][c]}
                <span className="next-time">{humanInterval(previewInterval(card.term, c))}</span>
              </button>
            ))}
          </div>
        )}
        <div className="counter">{idx + 1} / {deck.length}</div>
        <button className="shuffle-btn" onClick={doShuffle}>🔀 Shuffle &amp; Restart</button>
      </div>
    </div>
  );
}
