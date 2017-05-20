import {
  transferKeyToSnakecase,
} from './objectUtil';

describe('transferKeyToSnakecase tests', () => {
  test('transferKeyToSnakecase', () => {
    const testObj = {
      fooBar: 'fooBar',
      loveCat: 'loveCat',
      hiBeauty: 'hiBeauty',
    };

    const expectValue = {
      foo_bar: 'fooBar',
      love_cat: 'loveCat',
      hi_beauty: 'hiBeauty',
    };
    expect(transferKeyToSnakecase(testObj)).toEqual(expectValue);
  });
});
