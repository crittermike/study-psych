import { useState } from 'react';
import { getTermByName } from '../data/terms';
import { useUnit } from '../context/UnitContext';

export default function KeyConcepts({ setMode }) {
  const { keyConcepts, unit, isAllUnits } = useUnit();
  const [open, setOpen] = useState({});

  const visible = keyConcepts
    .map(c => ({ concept: c, term: getTermByName(c.term) }))
    .filter(x => x.term);

  if (visible.length === 0) {
    return (
      <div className="key-concepts">
        <h2 className="kc-title">🔥 Most Important Concepts</h2>
        <p className="kc-subtitle">High-yield must-knows for the final.</p>
        <div className="hardest-empty">
          <div className="icon">📥</div>
          <p>No key concepts curated for <strong>{unit}</strong> yet — they get added with each unit's terms.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="key-concepts">
      <h2 className="kc-title">🔥 Most Important Concepts</h2>
      <p className="kc-subtitle">
        High-yield must-knows for {isAllUnits ? 'the entire final' : unit}. Tap any card to expand.
      </p>
      <ul className="kc-list">
        {visible.map(({ concept, term }, i) => {
          const isOpen = !!open[i];
          return (
            <li key={i} className={`kc-item${isOpen ? ' open' : ''}`}>
              <button className="kc-row" onClick={() => setOpen(o => ({ ...o, [i]: !o[i] }))}>
                {isAllUnits && <span className="kc-unit-tag">{term.unit}</span>}
                <span className="kc-term">{term.term}</span>
                <span className="kc-toggle">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="kc-detail">
                  <div className="kc-cat">{term.cat}</div>
                  <div className="kc-def">{term.def}</div>
                  <div className="kc-why"><strong>Why it matters:</strong> {concept.why}</div>
                  {term.example && <div className="kc-example">💡 {term.example}</div>}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {setMode && (
        <div className="kc-cta">
          <button className="test-start-btn" onClick={() => setMode('flashcards')}>Drill these in Flashcards →</button>
        </div>
      )}
    </div>
  );
}
