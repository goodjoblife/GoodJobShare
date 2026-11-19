import { wordCount } from './utils';

describe('wordCount', () => {
  test('counts characters', () => {
    expect(wordCount('公司很好')).toBe(4);
  });

  test('ignores newlines', () => {
    expect(wordCount('公司\n很好')).toBe(4);
  });

  test('ignores leading and trailing whitespace', () => {
    expect(wordCount(' \t　公司很好\n ')).toBe(4);
  });

  test('counts spaces between words', () => {
    expect(wordCount('good job')).toBe(8);
  });

  test('counts spaces but ignores newlines in English paragraphs', () => {
    expect(wordCount('  good job\n\nnice team  \n')).toBe(17);
  });

  test('returns 0 for whitespace-only text', () => {
    expect(wordCount(' '.repeat(30))).toBe(0);
  });
});
