import { toSnakecase, toCamelcase, formatNumberWithSign } from './stringUtil';

describe('toSnakecase tests', () => {
  test('toSnakecase', () => {
    expect(toSnakecase('fooBarCat')).toBe('foo_bar_cat');
  });
});

describe('toCamelcase tests', () => {
  test('toCamelcase', () => {
    expect(toCamelcase('foo_bar_cat')).toBe('fooBarCat');
  });
});

describe('formatNumberWithSign tests', () => {
  test('formatNumberWithSign', () => {
    expect(formatNumberWithSign(100.0, 0)).toBe('+100');
    expect(formatNumberWithSign(0.0, 0)).toBe('0');
    expect(formatNumberWithSign(-100.0, 0)).toBe('-100');
    expect(formatNumberWithSign(100.0, 1)).toBe('+100.0');
    expect(formatNumberWithSign(0.0, 1)).toBe('0.0');
    expect(formatNumberWithSign(-100.0, 1)).toBe('-100.0');
  });
});
