import {
  gteLength,
  gtLength,
  lteLength,
  ltLength,
  eqLength,
  notStrEmpty,
  notArrayEmpty,
  notNullOrUndefined,
} from './dataCheckUtil';

describe('gteLength tests', () => {
  const func = gteLength(3);
  test('greater length should pass', () => {
    expect(func([1, 2, 3, 4])).toBe(true);
    expect(func('fooo')).toBe(true);
  });

  test('equal length should pass', () => {
    expect(func([1, 2, 3])).toBe(true);
    expect(func('bar')).toBe(true);
  });

  test('less should no pass', () => {
    expect(func([1, 2])).toBe(false);
    expect(func('fo')).toBe(false);
  });
});

describe('gtLength tests', () => {
  const func = gtLength(3);
  test('greater length should pass', () => {
    expect(func([1, 2, 3, 4])).toBe(true);
    expect(func('fooo')).toBe(true);
  });

  test('equal length should not pass', () => {
    expect(func([1, 2, 3])).toBe(false);
    expect(func('bar')).toBe(false);
  });

  test('less should not pass', () => {
    expect(func([1, 2])).toBe(false);
    expect(func('fo')).toBe(false);
  });
});

describe('lteLength tests', () => {
  const func = lteLength(3);
  test('greater length should not pass', () => {
    expect(func([1, 2, 3, 4])).toBe(false);
    expect(func('fooo')).toBe(false);
  });

  test('equal length should pass', () => {
    expect(func([1, 2, 3])).toBe(true);
    expect(func('bar')).toBe(true);
  });

  test('less should pass', () => {
    expect(func([1, 2])).toBe(true);
    expect(func('fo')).toBe(true);
  });
});

describe('ltLength tests', () => {
  const func = ltLength(3);
  test('greater length should not pass', () => {
    expect(func([1, 2, 3, 4])).toBe(false);
    expect(func('fooo')).toBe(false);
  });

  test('equal length should not pass', () => {
    expect(func([1, 2, 3])).toBe(false);
    expect(func('bar')).toBe(false);
  });

  test('less should pass', () => {
    expect(func([1, 2])).toBe(true);
    expect(func('fo')).toBe(true);
  });
});

describe('eqLength tests', () => {
  const func = eqLength(3);
  test('greater length should not pass', () => {
    expect(func([1, 2, 3, 4])).toBe(false);
    expect(func('fooo')).toBe(false);
  });

  test('equal length should pass', () => {
    expect(func([1, 2, 3])).toBe(true);
    expect(func('bar')).toBe(true);
  });

  test('less should not pass', () => {
    expect(func([1, 2])).toBe(false);
    expect(func('fo')).toBe(false);
  });
});

describe('notStrEmpty tests', () => {
  const func = notStrEmpty;
  test('not empty should pass', () => {
    expect(func('fooo')).toBe(true);
  });

  test('empty should not pass', () => {
    expect(func('')).toBe(false);
  });
});

describe('notArrayEmpty tests', () => {
  const func = notArrayEmpty;
  test('not empty should pass', () => {
    expect(func([1, 2])).toBe(true);
  });

  test('empty should not pass', () => {
    expect(func([])).toBe(false);
  });
});

describe('notNullOrUndefined tests', () => {
  const func = notNullOrUndefined;
  test('not null or undefined should pass', () => {
    expect(func(1)).toBe(true);
    expect(func([])).toBe(true);
    expect(func('')).toBe(true);
  });

  test('null or undefined should not pass', () => {
    expect(func(undefined)).toBe(false);
    expect(func(null)).toBe(false);
  });
});
