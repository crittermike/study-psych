import { describe, it, expect } from 'vitest';
import { humanInterval } from '../hooks/useProgress';

describe('humanInterval', () => {
  it('returns <1m for sub-minute intervals', () => {
    expect(humanInterval(30000)).toBe('<1m');
    expect(humanInterval(0)).toBe('<1m');
  });

  it('returns minutes for < 1 hour', () => {
    expect(humanInterval(60000)).toBe('1m');
    expect(humanInterval(300000)).toBe('5m');
    expect(humanInterval(600000)).toBe('10m');
  });

  it('returns hours for < 1 day', () => {
    expect(humanInterval(3600000)).toBe('1h');
    expect(humanInterval(7200000)).toBe('2h');
  });

  it('returns days for >= 1 day', () => {
    expect(humanInterval(86400000)).toBe('1d');
    expect(humanInterval(172800000)).toBe('2d');
    expect(humanInterval(604800000)).toBe('7d');
  });
});
