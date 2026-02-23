import { describe, it, expect } from 'vitest';
import { shuffle, formatTime, normText, isCorrectTerm, escapeRegex } from '../utils/helpers';

describe('shuffle', () => {
  it('returns an array of the same length', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffle(arr)).toHaveLength(5);
  });

  it('does not mutate the original array', () => {
    const arr = [1, 2, 3];
    shuffle(arr);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('contains the same elements', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffle(arr).sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('formatTime', () => {
  it('formats 0 seconds', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  it('formats seconds under a minute', () => {
    expect(formatTime(45)).toBe('0:45');
  });

  it('formats whole minutes', () => {
    expect(formatTime(120)).toBe('2:00');
  });

  it('formats minutes and seconds', () => {
    expect(formatTime(125)).toBe('2:05');
  });

  it('pads single-digit seconds', () => {
    expect(formatTime(61)).toBe('1:01');
  });
});

describe('normText', () => {
  it('lowercases text', () => {
    expect(normText('Hello World')).toBe('hello world');
  });

  it('removes special characters', () => {
    expect(normText("it's a test!")).toBe('its a test');
  });

  it('trims whitespace', () => {
    expect(normText('  hello  ')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(normText('')).toBe('');
  });
});

describe('escapeRegex', () => {
  it('escapes special regex characters', () => {
    expect(escapeRegex('a.b*c?d')).toBe('a\\.b\\*c\\?d');
  });

  it('leaves normal text unchanged', () => {
    expect(escapeRegex('hello world')).toBe('hello world');
  });
});

describe('isCorrectTerm', () => {
  const item = {
    term: 'Chunking',
    def: 'Organizing items into familiar, manageable units.',
    accept: ['chunking', 'memory chunking'],
    blank: 'manageable units',
  };

  it('matches the exact term (case-insensitive)', () => {
    expect(isCorrectTerm('chunking', item)).toBe(true);
    expect(isCorrectTerm('CHUNKING', item)).toBe(true);
  });

  it('matches accepted alternatives', () => {
    expect(isCorrectTerm('memory chunking', item)).toBe(true);
  });

  it('rejects wrong answers', () => {
    expect(isCorrectTerm('encoding', item)).toBe(false);
  });

  it('rejects empty input', () => {
    expect(isCorrectTerm('', item)).toBe(false);
    expect(isCorrectTerm('   ', item)).toBe(false);
  });

  it('matches term without parenthetical', () => {
    const itemWithParen = { term: 'Schema (plural: Schemata)', accept: [] };
    expect(isCorrectTerm('schema', itemWithParen)).toBe(true);
  });
});
