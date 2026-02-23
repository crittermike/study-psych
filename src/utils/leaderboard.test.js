import { describe, it, expect, beforeEach } from 'vitest';
import { loadLeaderboard, saveLeaderboard, addTestScore, addMatchTime, addStreak } from '../utils/leaderboard';

beforeEach(() => {
  localStorage.clear();
});

describe('loadLeaderboard', () => {
  it('returns default structure when empty', () => {
    expect(loadLeaderboard()).toEqual({ tests: [], matches: [], streaks: [] });
  });

  it('round-trips data', () => {
    const data = { tests: [{ score: 10 }], matches: [], streaks: [] };
    saveLeaderboard(data);
    expect(loadLeaderboard()).toEqual(data);
  });

  it('returns default on corrupt data', () => {
    localStorage.setItem('ap_leaderboard', 'bad');
    expect(loadLeaderboard()).toEqual({ tests: [], matches: [], streaks: [] });
  });
});

describe('addTestScore', () => {
  it('adds a test score and sorts by percentage desc', () => {
    const lb = { tests: [], matches: [], streaks: [] };
    const result = addTestScore(lb, 8, 10, 45);
    expect(result.tests).toHaveLength(1);
    expect(result.tests[0].pct).toBe(80);
  });

  it('caps at 10 entries', () => {
    const lb = { tests: [], matches: [], streaks: [] };
    for (let i = 0; i < 12; i++) {
      addTestScore(lb, i, 12, 30);
    }
    expect(lb.tests).toHaveLength(10);
  });

  it('sorts higher percentages first', () => {
    const lb = { tests: [], matches: [], streaks: [] };
    addTestScore(lb, 5, 10, 30);
    addTestScore(lb, 9, 10, 30);
    expect(lb.tests[0].pct).toBe(90);
    expect(lb.tests[1].pct).toBe(50);
  });
});

describe('addMatchTime', () => {
  it('adds a match time and sorts ascending', () => {
    const lb = { tests: [], matches: [], streaks: [] };
    addMatchTime(lb, 4, 25, 0);
    addMatchTime(lb, 4, 15, 1);
    expect(lb.matches[0].time).toBe(15);
    expect(lb.matches[1].time).toBe(25);
  });

  it('caps at 10 entries', () => {
    const lb = { tests: [], matches: [], streaks: [] };
    for (let i = 0; i < 12; i++) {
      addMatchTime(lb, 4, i * 10, 0);
    }
    expect(lb.matches).toHaveLength(10);
  });
});

describe('addStreak', () => {
  it('adds a streak and sorts descending', () => {
    const lb = { tests: [], matches: [], streaks: [] };
    addStreak(lb, 5);
    addStreak(lb, 10);
    expect(lb.streaks[0].streak).toBe(10);
    expect(lb.streaks[1].streak).toBe(5);
  });

  it('caps at 10 entries', () => {
    const lb = { tests: [], matches: [], streaks: [] };
    for (let i = 0; i < 12; i++) {
      addStreak(lb, i);
    }
    expect(lb.streaks).toHaveLength(10);
  });
});
