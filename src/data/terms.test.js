import { describe, it, expect } from 'vitest';
import { TERMS, CATEGORIES, CONFUSED_PAIRS } from '../data/terms';

describe('TERMS data integrity', () => {
  it('has terms', () => {
    expect(TERMS.length).toBeGreaterThan(100);
  });

  it('every term has all required fields', () => {
    TERMS.forEach((t, i) => {
      expect(t.term, `term[${i}].term`).toBeTruthy();
      expect(t.def, `term[${i}].def`).toBeTruthy();
      expect(t.cat, `term[${i}].cat`).toBeTruthy();
      expect(t.blank, `term[${i}].blank`).toBeTruthy();
      expect(t.example, `term[${i}].example`).toBeTruthy();
      expect(Array.isArray(t.accept), `term[${i}].accept should be array`).toBe(true);
    });
  });

  it('has no duplicate term names', () => {
    const names = TERMS.map(t => t.term);
    expect(new Set(names).size).toBe(names.length);
  });

  it('every term belongs to a known category', () => {
    TERMS.forEach(t => {
      expect(CATEGORIES).toContain(t.cat);
    });
  });
});

describe('CATEGORIES', () => {
  it('has categories', () => {
    expect(CATEGORIES.length).toBeGreaterThan(10);
  });

  it('has no duplicates', () => {
    expect(new Set(CATEGORIES).size).toBe(CATEGORIES.length);
  });

  it('every category has at least one term', () => {
    CATEGORIES.forEach(cat => {
      const count = TERMS.filter(t => t.cat === cat).length;
      expect(count, `category "${cat}" should have terms`).toBeGreaterThan(0);
    });
  });
});

describe('CONFUSED_PAIRS', () => {
  it('has pairs', () => {
    expect(CONFUSED_PAIRS.length).toBeGreaterThan(0);
  });

  it('every pair has exactly 2 elements', () => {
    CONFUSED_PAIRS.forEach((pair, i) => {
      expect(pair, `pair[${i}]`).toHaveLength(2);
    });
  });

  it('every pair references existing terms', () => {
    const termNames = new Set(TERMS.map(t => t.term));
    CONFUSED_PAIRS.forEach(([a, b], i) => {
      expect(termNames.has(a), `pair[${i}][0] "${a}" not in TERMS`).toBe(true);
      expect(termNames.has(b), `pair[${i}][1] "${b}" not in TERMS`).toBe(true);
    });
  });
});
