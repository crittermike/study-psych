import { useState, useEffect, useRef } from 'react';
import { TERMS } from '../data/terms';
import { shuffle, formatTime } from '../utils/helpers';
import { playMatch, playWrong } from '../utils/sound';

export default function Matching({ onAchievement, onMatchComplete }) {
  const [pairCount, setPairCount] = useState(4);
  const [tiles, setTiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [paired, setPaired] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [complete, setComplete] = useState(false);
  const timerRef = useRef(null);

  const init = (count) => {
    const c = count || pairCount;
    clearInterval(timerRef.current);
    const subset = shuffle([...TERMS]).slice(0, c);
    const items = [];
    subset.forEach((item, i) => {
      items.push({ id: `t${i}`, pairId: i, type: 'term', text: item.term, matched: false });
      items.push({ id: `d${i}`, pairId: i, type: 'def', text: item.def, matched: false });
    });
    setTiles(shuffle(items));
    setSelected(null); setPaired(0); setMistakes(0); setSeconds(0); setComplete(false);
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  useEffect(() => { init(); return () => clearInterval(timerRef.current); }, []);

  const changeDiff = (n) => { setPairCount(n); init(n); };

  const handleClick = (tile) => {
    if (tile.matched) return;
    if (!selected) { setSelected(tile); return; }
    if (selected.id === tile.id) return;
    if (selected.type === tile.type) { setSelected(tile); return; }

    if (selected.pairId === tile.pairId) {
      playMatch();
      const newPaired = paired + 1;
      setTiles(ts => ts.map(t =>
        t.pairId === tile.pairId ? { ...t, matched: true } : t
      ));
      setSelected(null);
      setPaired(newPaired);
      if (newPaired === (pairCount || 4)) {
        clearInterval(timerRef.current);
        if (seconds < 30) onAchievement('fast_match');
        if (seconds < 15) onAchievement('lightning_match');
        onMatchComplete(pairCount, seconds, mistakes);
        setComplete(true);
      }
    } else {
      playWrong();
      setMistakes(m => m + 1);
      // Brief red flash
      const wrongIds = [selected.id, tile.id];
      setTiles(ts => ts.map(t => wrongIds.includes(t.id) ? { ...t, wrong: true } : t));
      setSelected(null);
      setTimeout(() => {
        setTiles(ts => ts.map(t => ({ ...t, wrong: false })));
      }, 500);
    }
  };

  return (
    <div>
      <div className="difficulty-picker">
        {[4,6,8].map(n => (
          <button key={n} className={`diff-btn${pairCount === n ? ' active' : ''}`}
            onClick={() => changeDiff(n)}>
            {n === 4 ? 'Easy' : n === 6 ? 'Medium' : 'Hard'} ({n})
          </button>
        ))}
      </div>

      {!complete ? (
        <>
          <div className="match-header">
            <h2>Match terms ↔ definitions</h2>
            <div className="match-info">
              <span>Pairs: <strong>{paired}/{pairCount}</strong></span>
              <span>Mistakes: <strong>{mistakes}</strong></span>
              <span className="timer">{formatTime(seconds)}</span>
            </div>
          </div>
          <div className="match-grid">
            {tiles.map(tile => (
              <div key={tile.id}
                className={`match-tile${tile.matched ? ' matched' : ''}${selected?.id === tile.id ? ' selected' : ''}${tile.wrong ? ' wrong' : ''}`}
                onClick={() => handleClick(tile)}>
                <div>
                  <span className="tile-label">{tile.type === 'term' ? 'Term' : 'Definition'}</span>
                  {tile.text}
                </div>
              </div>
            ))}
          </div>
          <div className="match-controls">
            <button className="new-round-btn" onClick={() => init()}>🔄 New Round</button>
          </div>
        </>
      ) : (
        <div className="completed-msg">
          <div className="trophy">🏆</div>
          <h2>All Matched!</h2>
          <p>Completed in {formatTime(seconds)} with {mistakes} mistake{mistakes !== 1 ? 's' : ''}.</p>
          <button onClick={() => init()}>Play Again</button>
        </div>
      )}
    </div>
  );
}
