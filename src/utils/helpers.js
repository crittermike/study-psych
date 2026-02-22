export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function formatTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function normText(s) {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
}

export function isCorrectTerm(answer, item) {
  const a = normText(answer);
  if (!a) return false;
  if (a === normText(item.term)) return true;
  if (item.accept && item.accept.some(acc => normText(acc) === a)) return true;
  const termBase = normText(item.term.replace(/\(.*?\)/g, ''));
  if (a === termBase) return true;
  return false;
}
