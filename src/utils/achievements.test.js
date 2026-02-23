import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ACHIEVEMENT_DEFS, loadAchievements, saveAchievements, unlockAchievement } from '../utils/achievements';

beforeEach(() => {
  localStorage.clear();
});

describe('ACHIEVEMENT_DEFS', () => {
  it('has unique IDs', () => {
    const ids = ACHIEVEMENT_DEFS.map(a => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every achievement has required fields', () => {
    ACHIEVEMENT_DEFS.forEach(a => {
      expect(a.id).toBeTruthy();
      expect(a.icon).toBeTruthy();
      expect(a.title).toBeTruthy();
      expect(a.desc).toBeTruthy();
    });
  });

  it('has 21 achievements', () => {
    expect(ACHIEVEMENT_DEFS).toHaveLength(21);
  });
});

describe('loadAchievements / saveAchievements', () => {
  it('returns empty object when nothing saved', () => {
    expect(loadAchievements()).toEqual({});
  });

  it('round-trips achievements', () => {
    const data = { first_flip: 1000, ten_correct: 2000 };
    saveAchievements(data);
    expect(loadAchievements()).toEqual(data);
  });

  it('returns empty object on corrupt data', () => {
    localStorage.setItem('ap_achievements', '{bad json');
    expect(loadAchievements()).toEqual({});
  });
});

describe('unlockAchievement', () => {
  it('unlocks a new achievement', () => {
    const achievements = {};
    const setAchievements = vi.fn();
    const setToast = vi.fn();
    const result = unlockAchievement('first_flip', achievements, setAchievements, setToast);
    expect(result).toBe(true);
    expect(setAchievements).toHaveBeenCalledWith(expect.objectContaining({ first_flip: expect.any(Number) }));
    expect(setToast).toHaveBeenCalledWith(expect.objectContaining({ title: 'First Flip' }));
  });

  it('does not re-unlock an existing achievement', () => {
    const achievements = { first_flip: 1000 };
    const setAchievements = vi.fn();
    const result = unlockAchievement('first_flip', achievements, setAchievements, null);
    expect(result).toBe(false);
    expect(setAchievements).not.toHaveBeenCalled();
  });

  it('persists to localStorage', () => {
    unlockAchievement('streak_5', {}, vi.fn(), vi.fn());
    const saved = JSON.parse(localStorage.getItem('ap_achievements'));
    expect(saved).toHaveProperty('streak_5');
  });
});
