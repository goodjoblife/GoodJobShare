import qs, { ParsedQs } from 'qs';

import { HAS_POLICY_VALUES, hasPolicyFromQuerySelector } from './policyFilter';

const parse = (search: string): ParsedQs =>
  qs.parse(search, { ignoreQueryPrefix: true });

describe('hasPolicyFromQuerySelector', () => {
  it('沒帶 param 時代表不篩選，回傳全選', () => {
    expect(hasPolicyFromQuerySelector(parse(''))).toEqual(HAS_POLICY_VALUES);
    expect(hasPolicyFromQuerySelector(parse('?p=2'))).toEqual(
      HAS_POLICY_VALUES,
    );
  });

  it('帶了但是空字串時代表一個都沒選', () => {
    expect(hasPolicyFromQuerySelector(parse('?hasPolicy='))).toEqual([]);
  });

  it('讀得回逗號分隔的答案', () => {
    expect(hasPolicyFromQuerySelector(parse('?hasPolicy=yes'))).toEqual([
      'yes',
    ]);
    expect(hasPolicyFromQuerySelector(parse('?hasPolicy=yes,unknown'))).toEqual(
      ['yes', 'unknown'],
    );
  });

  it('擋掉不認得的答案，而不是往下傳給後端', () => {
    expect(hasPolicyFromQuerySelector(parse('?hasPolicy=yes,maybe'))).toEqual([
      'yes',
    ]);
    expect(hasPolicyFromQuerySelector(parse('?hasPolicy=maybe'))).toEqual([]);
  });

  it('讀得回自己寫出去的網址（分頁連結會再 stringify 一次）', () => {
    const written = qs.stringify(
      { hasPolicy: ['yes', 'unknown'].join(',') },
      { addQueryPrefix: true },
    );
    const afterPaginating = qs.stringify(
      { ...parse(written), p: 2 },
      { addQueryPrefix: true },
    );
    expect(hasPolicyFromQuerySelector(parse(afterPaginating))).toEqual([
      'yes',
      'unknown',
    ]);
  });
});
