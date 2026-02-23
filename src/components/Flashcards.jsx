import { useState, useEffect, useCallback } from 'react';
import { TERMS, CATEGORIES } from '../data/terms';
import CategoryFilter from './CategoryFilter';
import { shuffle } from '../utils/helpers';
import { humanInterval } from '../hooks/useProgress';
import { playFlip } from '../utils/sound';

const DISCARDED_KEY = 'fc_discarded';

function loadDiscarded() {
  try { return new Set(JSON.parse(localStorage.getItem(DISCARDED_KEY)) || []); } catch { return new Set(); }
}

function saveDiscarded(set) {
  localStorage.setItem(DISCARDED_KEY, JSON.stringify([...set]));
}

export default function Flashcards({ progress, srsRate, isDue, previewInterval, onAchievement }) {
  const [cat, setCat] = useState(null);
  const [deck, setDeck] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [startSide, setStartSide] = useState(() => localStorage.getItem('fc_start_side') || 'term');
  const [studyMode, setStudyMode] = useState(() => localStorage.getItem('fc_study_mode') || 'session');
  const [discardedSet, setDiscardedSet] = useState(loadDiscarded);

  const discarded = discardedSet.size;

  const changeStartSide = (side) => {
    setStartSide(side);
    localStorage.setItem('fc_start_side', side);
  };

  const changeStudyMode = (mode) => {
    setStudyMode(mode);
    localStorage.setItem('fc_study_mode', mode);
    if (mode === 'srs') {
      buildDeck(cat, new Set());
    } else {
      buildDeck(cat, discardedSet);
    }
  };

  const buildDeck = useCallback((category, discSet) => {
    const ds = discSet !== undefined ? discSet : discardedSet;
    let pool = category ? TERMS.filter(t => t.cat === category) : [...TERMS];
    // In session mode, filter out discarded terms
    const currentMode = localStorage.getItem('fc_study_mode') || 'session';
    if (currentMode === 'session') {
      pool = pool.filter(t => !ds.has(t.term));
    }
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
    setComplete(pool.length === 0);
    setShowExample(false);
  }, [isDue, progress, discardedSet]);

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

  const sessionRate = (action) => {
    onAchievement('first_flip');
    if (action === 'easy') {
      // Discard card from deck and persist
      const termName = deck[idx].term;
      const newDiscarded = new Set(discardedSet);
      newDiscarded.add(termName);
      setDiscardedSet(newDiscarded);
      saveDiscarded(newDiscarded);
      const newDeck = [...deck.slice(0, idx), ...deck.slice(idx + 1)];
      if (newDeck.length === 0) {
        setDeck(newDeck);
        setComplete(true);
      } else {
        setDeck(newDeck);
        setIdx(idx >= newDeck.length ? 0 : idx);
        setFlipped(false);
        setShowExample(false);
      }
    } else {
      // Put card at back of deck
      const card = deck[idx];
      const newDeck = [...deck.slice(0, idx), ...deck.slice(idx + 1), card];
      setDeck(newDeck);
      setIdx(idx >= newDeck.length - 1 ? 0 : idx);
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
    setDiscardedSet(new Set());
    saveDiscarded(new Set());
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.code === 'Space') { e.preventDefault(); flip(); }
      if (flipped && studyMode === 'srs' && e.key >= '1' && e.key <= '4') rate(parseInt(e.key));
      if (flipped && studyMode === 'session' && e.key === '1') sessionRate('hard');
      if (flipped && studyMode === 'session' && e.key === '2') sessionRate('easy');
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
          <p>Reviewed all {studyMode === 'session' ? discarded : deck.length} cards in this set.</p>
          <button onClick={() => { setDiscardedSet(new Set()); saveDiscarded(new Set()); buildDeck(cat, new Set()); }}>Go Again</button>
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
          {studyMode === 'srs'
            ? (dueCount > 0 ? `⏰ ${dueCount} card${dueCount > 1 ? 's' : ''} due` : '✅ All caught up!')
            : `📋 ${deck.length} card${deck.length !== 1 ? 's' : ''} left · ${discarded} done`}
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${studyMode === 'srs' ? (idx / deck.length) * 100 : (discarded / (deck.length + discarded)) * 100}%` }} />
        </div>
        <div className="fc-toggles">
          <div className="fc-side-toggle">
            <button className={startSide === 'term' ? 'active' : ''} onClick={() => changeStartSide('term')}>Term → Definition</button>
            <button className={startSide === 'def' ? 'active' : ''} onClick={() => changeStartSide('def')}>Definition → Term</button>
          </div>
          <div className="fc-mode-toggle">
            <button className={`fc-mode-btn${studyMode === 'session' ? ' active' : ''}`} onClick={() => changeStudyMode('session')}>
              <span className="fc-mode-label">🗂️ Keep / Discard</span>
              <span className="fc-mode-desc">Hard cards go back in the deck, easy cards are removed</span>
            </button>
            <button className={`fc-mode-btn${studyMode === 'srs' ? ' active' : ''}`} onClick={() => changeStudyMode('srs')}>
              <span className="fc-mode-label">📅 Spaced Review</span>
              <span className="fc-mode-desc">Rate difficulty to schedule when you'll see each card again</span>
            </button>
          </div>
        </div>
        <div className="card-container" onClick={flip}>
          <div className={`card-inner${flipped ? ' flipped' : ''}`}>
            <div className="card-face card-front">
              <span className="card-label">{startSide === 'term' ? 'Term' : 'Definition'}</span>
              <span className="card-cat">{card.cat}</span>
              <div className={startSide === 'term' ? 'term' : 'definition'}>{startSide === 'term' ? card.term : card.def}</div>
              <span className="hint">tap to flip · space</span>
            </div>
            <div className="card-face card-back">
              <span className="card-label">{startSide === 'term' ? 'Definition' : 'Term'}</span>
              {startSide === 'term' ? (
                <>
                  <div className="definition">{card.def}</div>
                  {card.example && (
                    <button className="example-toggle" onClick={(e) => { e.stopPropagation(); setShowExample(s => !s); }}>
                      {showExample ? '▾ Hide' : '▸ Example'} (E)
                    </button>
                  )}
                  {showExample && <div className="example-text">💡 {card.example}</div>}
                </>
              ) : (
                <>
                  <div className="term">{card.term}</div>
                  {card.example && (
                    <button className="example-toggle" onClick={(e) => { e.stopPropagation(); setShowExample(s => !s); }}>
                      {showExample ? '▾ Hide' : '▸ Example'} (E)
                    </button>
                  )}
                  {showExample && <div className="example-text">💡 {card.example}</div>}
                </>
              )}
            </div>
          </div>
        </div>
        {flipped && studyMode === 'srs' && (
          <div className="conf-btns">
            {[1,2,3,4].map(c => (
              <button key={c} className={`conf-btn c${c}`} onClick={() => rate(c)}>
                {['','Again','Hard','Good','Easy'][c]}
                <span className="next-time">{humanInterval(previewInterval(card.term, c))}</span>
              </button>
            ))}
          </div>
        )}
        {flipped && studyMode === 'session' && (
          <div className="conf-btns session-btns">
            <button className="conf-btn c2" onClick={() => sessionRate('hard')}>
              Hard
              <span className="next-time">back of deck</span>
            </button>
            <button className="conf-btn c4" onClick={() => sessionRate('easy')}>
              Easy
              <span className="next-time">remove</span>
            </button>
          </div>
        )}
        <div className="counter">{studyMode === 'srs' ? `${idx + 1} / ${deck.length}` : `${discarded + 1} / ${deck.length + discarded}`}</div>
        <button className="shuffle-btn" onClick={doShuffle}>🔀 Shuffle &amp; Restart</button>
      </div>
    </div>
  );
}
