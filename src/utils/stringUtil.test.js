import { toSnakecase, toCamelcase } from './stringUtil';

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
