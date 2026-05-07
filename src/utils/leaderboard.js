const LB_KEY = 'ap_leaderboard';

const DEFAULT_LB = { tests:[], matches:[], streaks:[], speed:[] };

export function loadLeaderboard() {
  try {
    const stored = JSON.parse(localStorage.getItem(LB_KEY)) || DEFAULT_LB;
    // Ensure all keys exist for backwards compatibility
    return { ...DEFAULT_LB, ...stored };
  } catch { return { ...DEFAULT_LB }; }
}

export function saveLeaderboard(lb) {
  localStorage.setItem(LB_KEY, JSON.stringify(lb));
}

export function addTestScore(lb, score, total, time) {
  lb.tests.push({ score, total, pct: Math.round(score/total*100), time, date: Date.now() });
  lb.tests.sort((a,b) => b.pct - a.pct || a.time - b.time);
  lb.tests = lb.tests.slice(0, 10);
  saveLeaderboard(lb);
  return lb;
}

export function addMatchTime(lb, pairs, time, mistakes) {
  lb.matches.push({ pairs, time, mistakes, date: Date.now() });
  lb.matches.sort((a,b) => a.time - b.time);
  lb.matches = lb.matches.slice(0, 10);
  saveLeaderboard(lb);
  return lb;
}

export function addStreak(lb, streak) {
  lb.streaks.push({ streak, date: Date.now() });
  lb.streaks.sort((a,b) => b.streak - a.streak);
  lb.streaks = lb.streaks.slice(0, 10);
  saveLeaderboard(lb);
  return lb;
}

export function addSpeedScore(lb, score, length, unit) {
  if (!lb.speed) lb.speed = [];
  lb.speed.push({ score, length, unit, date: Date.now() });
  lb.speed.sort((a,b) => b.score - a.score || a.length - b.length);
  lb.speed = lb.speed.slice(0, 10);
  saveLeaderboard(lb);
  return lb;
}
