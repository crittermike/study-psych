import { useState, useCallback } from 'react';
import { useProgress } from './hooks/useProgress';
import { loadAchievements, saveAchievements, unlockAchievement, ACHIEVEMENT_DEFS } from './utils/achievements';
import { loadLeaderboard, addTestScore, addMatchTime, addStreak } from './utils/leaderboard';
import { playAchievement } from './utils/sound';
import { TERMS } from './data/terms';
import Home from './components/Home';
import Flashcards from './components/Flashcards';
import WriteIt from './components/WriteIt';
import FillBlank from './components/FillBlank';
import Matching from './components/Matching';
import PracticeTest from './components/PracticeTest';
import MixedTest from './components/MixedTest';
import CompareContrast from './components/CompareContrast';
import HardestTerms from './components/HardestTerms';
import Leaderboard from './components/Leaderboard';
import './App.css';

const MODES = [
  { id:'home', icon:'🏠', label:'Home' },
  { id:'flashcards', icon:'🃏', label:'Cards' },
  { id:'write', icon:'✍️', label:'Write' },
  { id:'blanks', icon:'📝', label:'Blanks' },
  { id:'matching', icon:'🧩', label:'Match' },
  { id:'test', icon:'📋', label:'Test' },
  { id:'mixed', icon:'🧠', label:'Mixed' },
  { id:'compare', icon:'🔍', label:'Compare' },
  { id:'hardest', icon:'🔥', label:'Hard' },
  { id:'leaderboard', icon:'🏅', label:'Scores' },
];

export default function App() {
  const [mode, setMode] = useState('home');
  const { progress, getP, srsRate, recordAnswer, isDue, previewInterval } = useProgress();
  const [achievements, setAchievements] = useState(loadAchievements);
  const [leaderboard, setLeaderboard] = useState(loadLeaderboard);
  const [toast, setToast] = useState(null);

  const onAchievement = useCallback((id) => {
    if (achievements[id]) return;
    playAchievement();
    unlockAchievement(id, achievements, setAchievements, setToast);
  }, [achievements]);

  // Check global achievements
  const checkGlobalAchievements = useCallback(() => {
    let totalCorrect = 0;
    let allSeen = true;
    let allMastered = true;
    const catSeen = {};
    TERMS.forEach(t => {
      const p = progress[t.term];
      if (!catSeen[t.cat]) catSeen[t.cat] = true;
      if (p) {
        totalCorrect += p.correct;
        if (p.seen === 0) { allSeen = false; catSeen[t.cat] = false; }
        if (!(p.conf >= 4 && p.interval >= 86400000)) allMastered = false;
      } else {
        allSeen = false;
        allMastered = false;
        catSeen[t.cat] = false;
      }
    });
    if (totalCorrect >= 10) onAchievement('ten_correct');
    if (totalCorrect >= 50) onAchievement('fifty_correct');
    if (totalCorrect >= 100) onAchievement('hundred_correct');
    if (totalCorrect >= 250) onAchievement('two_fifty_correct');
    if (totalCorrect >= 500) onAchievement('five_hundred_correct');
    if (allSeen) onAchievement('all_seen');
    if (allMastered) onAchievement('all_mastered');
    if (Object.values(catSeen).some(v => v)) onAchievement('category_clear');
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 4) onAchievement('night_owl');
    if (hour >= 4 && hour < 7) onAchievement('early_bird');
  }, [progress, onAchievement]);

  const handleTestComplete = useCallback((score, total, time) => {
    setLeaderboard(lb => addTestScore({ ...lb }, score, total, time));
    checkGlobalAchievements();
  }, [checkGlobalAchievements]);

  const handleMatchComplete = useCallback((pairs, time, mistakes) => {
    setLeaderboard(lb => addMatchTime({ ...lb }, pairs, time, mistakes));
    checkGlobalAchievements();
  }, [checkGlobalAchievements]);

  const handleStreak = useCallback((streak) => {
    if (streak > 0) {
      setLeaderboard(lb => addStreak({ ...lb }, streak));
    }
    checkGlobalAchievements();
  }, [checkGlobalAchievements]);

  return (
    <div className="app">
      {/* Toast notification for achievements */}
      {toast && (
        <div className="toast">
          <span className="toast-icon">{toast.icon}</span>
          <div>
            <div className="toast-title">🏆 {toast.title}</div>
            <div className="toast-desc">{toast.desc}</div>
          </div>
        </div>
      )}

      <header>
        <h1>AP Psychology</h1>
        <p>Social Psychology, Motivation &amp; Personality — Study Tools</p>
      </header>

      <nav className="modes">
        {MODES.map(m => (
          <button key={m.id}
            className={`mode-btn${mode === m.id ? ' active' : ''}`}
            onClick={() => setMode(m.id)}>
            {m.icon} {m.label}
          </button>
        ))}
      </nav>

      <main>
        {mode === 'home' && <Home setMode={setMode} progress={progress} />}
        {mode === 'flashcards' && <Flashcards progress={progress} srsRate={srsRate} isDue={isDue} previewInterval={previewInterval} onAchievement={onAchievement} />}
        {mode === 'write' && <WriteIt recordAnswer={recordAnswer} onAchievement={onAchievement} onStreak={handleStreak} />}
        {mode === 'blanks' && <FillBlank recordAnswer={recordAnswer} onAchievement={onAchievement} onStreak={handleStreak} />}
        {mode === 'matching' && <Matching onAchievement={onAchievement} onMatchComplete={handleMatchComplete} />}
        {mode === 'test' && <PracticeTest recordAnswer={recordAnswer} onAchievement={onAchievement} onTestComplete={handleTestComplete} />}
        {mode === 'mixed' && <MixedTest recordAnswer={recordAnswer} onAchievement={onAchievement} onTestComplete={handleTestComplete} />}
        {mode === 'compare' && <CompareContrast recordAnswer={recordAnswer} onAchievement={onAchievement} />}
        {mode === 'hardest' && <HardestTerms progress={progress} srsRate={srsRate} onAchievement={onAchievement} />}
        {mode === 'leaderboard' && <Leaderboard achievements={achievements} leaderboard={leaderboard} />}
      </main>
    </div>
  );
}
