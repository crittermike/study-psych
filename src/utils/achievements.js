const STORAGE_KEY = 'ap_achievements';

export const ACHIEVEMENT_DEFS = [
  { id:'first_flip', icon:'🃏', title:'First Flip', desc:'Flip your first flashcard' },
  { id:'ten_correct', icon:'🎯', title:'Sharpshooter', desc:'Get 10 answers correct' },
  { id:'fifty_correct', icon:'💯', title:'Centurion', desc:'Get 50 answers correct' },
  { id:'hundred_correct', icon:'🔥', title:'On Fire', desc:'Get 100 answers correct' },
  { id:'two_fifty_correct', icon:'🚀', title:'Rocket Scholar', desc:'Get 250 answers correct' },
  { id:'five_hundred_correct', icon:'👑', title:'Royalty', desc:'Get 500 answers correct' },
  { id:'streak_5', icon:'⚡', title:'Hot Streak', desc:'Get a 5-answer streak' },
  { id:'streak_10', icon:'🌟', title:'Unstoppable', desc:'Get a 10-answer streak' },
  { id:'streak_20', icon:'💎', title:'Diamond Streak', desc:'Get a 20-answer streak' },
  { id:'perfect_test', icon:'🏆', title:'Perfect Score', desc:'Get 100% on a practice test' },
  { id:'speed_test', icon:'⏱️', title:'Speed Runner', desc:'Complete a practice test in under 60 seconds' },
  { id:'fast_match', icon:'🏎️', title:'Speed Demon', desc:'Complete a match round in under 30 seconds' },
  { id:'lightning_match', icon:'⚡', title:'Lightning Fast', desc:'Complete a match round in under 15 seconds' },
  { id:'all_seen', icon:'📚', title:'Scholar', desc:'See every term at least once' },
  { id:'all_mastered', icon:'🎓', title:'Master Mind', desc:'Master all terms (Easy rating + 1d interval)' },
  { id:'category_clear', icon:'✅', title:'Category Pro', desc:'See every term in a single category' },
  { id:'compare_5', icon:'🔍', title:'Keen Eye', desc:'Complete 5 compare & contrast rounds' },
  { id:'compare_10', icon:'🔬', title:'Analyst', desc:'Complete 10 compare & contrast rounds' },
  { id:'mixed_complete', icon:'🧠', title:'Well Rounded', desc:'Complete a mixed practice test' },
  { id:'night_owl', icon:'🦉', title:'Night Owl', desc:'Study after 10 PM' },
  { id:'early_bird', icon:'🐦', title:'Early Bird', desc:'Study before 7 AM' },
];

export function loadAchievements() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}

export function saveAchievements(a) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
}

export function unlockAchievement(id, achievements, setAchievements, setToast) {
  if (achievements[id]) return false;
  const updated = { ...achievements, [id]: Date.now() };
  setAchievements(updated);
  saveAchievements(updated);
  const def = ACHIEVEMENT_DEFS.find(a => a.id === id);
  if (def && setToast) {
    setToast({ icon: def.icon, title: def.title, desc: def.desc });
    setTimeout(() => setToast(null), 3000);
  }
  return true;
}
