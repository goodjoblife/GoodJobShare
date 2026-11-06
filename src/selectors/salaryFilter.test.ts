import {
  dataTimeFromQuerySelector,
  experiencesFromQuerySelector,
  gendersFromQuerySelector,
} from './salaryFilter';

describe('salary filter query selectors', () => {
  test('參考時間維持單選', () => {
    expect(dataTimeFromQuerySelector({ data_time: 'past_month' })).toBe(
      'past_month',
    );
  });

  test('保留多選參數並忽略未知值', () => {
    expect(
      experiencesFromQuerySelector({
        experience: ['0_3', 'unknown', '8_plus'],
      }),
    ).toEqual(['0_3', '8_plus']);
    expect(
      gendersFromQuerySelector({ gender: ['male', 'female', 'unknown'] }),
    ).toEqual(['male', 'female']);
  });

  test('未提供參數時回傳空陣列，代表不限制條件', () => {
    expect(dataTimeFromQuerySelector({})).toBeUndefined();
    expect(experiencesFromQuerySelector({})).toEqual([]);
    expect(gendersFromQuerySelector({})).toEqual([]);
  });
});
