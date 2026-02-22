import { useState, useCallback } from 'react';

const STORAGE_KEY = 'ap_progress';
const MIN = 60000;

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}

export function useProgress() {
  const [progress, setProgress] = useState(load);

  const getP = useCallback((term) => {
    return progress[term] || { conf:0, seen:0, correct:0, interval:0, ease:2.5, nextReview:0, lastReview:0 };
  }, [progress]);

  const srsRate = useCallback((termName, conf) => {
    setProgress(prev => {
      const p = { ...(prev[termName] || { conf:0, seen:0, correct:0, interval:0, ease:2.5, nextReview:0, lastReview:0 }) };
      p.seen++;
      if (conf >= 3) p.correct++;
      p.conf = conf;
      p.lastReview = Date.now();

      if (p.interval === 0) {
        p.interval = [0, MIN, 5*MIN, 10*MIN, 24*60*MIN][conf];
      } else {
        switch(conf) {
          case 1: p.interval = MIN; p.ease = Math.max(1.3, p.ease - 0.2); break;
          case 2: p.interval = Math.max(5*MIN, p.interval * 1.2); p.ease = Math.max(1.3, p.ease - 0.15); break;
          case 3: p.interval = Math.max(10*MIN, p.interval * p.ease); break;
          case 4: p.interval = Math.max(10*MIN, p.interval * p.ease * 1.3); p.ease += 0.15; break;
        }
      }
      p.interval = Math.min(p.interval, 7*24*60*MIN);
      p.nextReview = p.lastReview + p.interval;

      const next = { ...prev, [termName]: p };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const recordAnswer = useCallback((termName, correct) => {
    setProgress(prev => {
      const p = { ...(prev[termName] || { conf:0, seen:0, correct:0, interval:0, ease:2.5, nextReview:0, lastReview:0 }) };
      p.seen++;
      if (correct) p.correct++;
      const next = { ...prev, [termName]: p };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isDue = useCallback((termName) => {
    const p = progress[termName];
    if (!p || p.seen === 0) return true;
    return Date.now() >= p.nextReview;
  }, [progress]);

  const previewInterval = useCallback((termName, conf) => {
    const p = progress[termName] || { interval:0, ease:2.5 };
    if (p.interval === 0) return [0, MIN, 5*MIN, 10*MIN, 24*60*MIN][conf];
    switch(conf) {
      case 1: return MIN;
      case 2: return Math.max(5*MIN, p.interval * 1.2);
      case 3: return Math.max(10*MIN, p.interval * p.ease);
      case 4: return Math.max(10*MIN, p.interval * p.ease * 1.3);
    }
  }, [progress]);

  return { progress, getP, srsRate, recordAnswer, isDue, previewInterval };
}

export function humanInterval(ms) {
  if (ms < 60000) return '<1m';
  if (ms < 3600000) return Math.round(ms / 60000) + 'm';
  if (ms < 86400000) return Math.round(ms / 3600000) + 'h';
  return Math.round(ms / 86400000) + 'd';
}
