const LB_KEY = 'ap_leaderboard';

export function loadLeaderboard() {
  try { return JSON.parse(localStorage.getItem(LB_KEY)) || { tests:[], matches:[], streaks:[] }; } catch { return { tests:[], matches:[], streaks:[] }; }
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
