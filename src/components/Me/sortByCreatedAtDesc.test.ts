import { sortByCreatedAtDesc } from './sortByCreatedAtDesc';

const itemOf = (name: string, createdAt: string): Item => ({
  name,
  createdAt,
});

type Item = { name: string; createdAt: string };

describe('sortByCreatedAtDesc', () => {
  it('puts the newest first, whatever order they come in', () => {
    const sorted = sortByCreatedAtDesc([
      itemOf('舊的面試', '2024-03-01T00:00:00.000Z'),
      itemOf('最新的薪時', '2026-01-02T00:00:00.000Z'),
      itemOf('去年的留言', '2025-07-15T00:00:00.000Z'),
    ]);

    expect(sorted.map(o => o.name)).toEqual([
      '最新的薪時',
      '去年的留言',
      '舊的面試',
    ]);
  });

  it('keeps the given order for items sharing a timestamp', () => {
    const sorted = sortByCreatedAtDesc([
      itemOf('先傳進來的', '2026-01-02T00:00:00.000Z'),
      itemOf('後傳進來的', '2026-01-02T00:00:00.000Z'),
    ]);

    expect(sorted.map(o => o.name)).toEqual(['先傳進來的', '後傳進來的']);
  });

  it('does not mutate the given list', () => {
    const items = [
      itemOf('舊的', '2024-03-01T00:00:00.000Z'),
      itemOf('新的', '2026-01-02T00:00:00.000Z'),
    ];

    sortByCreatedAtDesc(items);

    expect(items.map(o => o.name)).toEqual(['舊的', '新的']);
  });

  it('handles an empty list', () => {
    expect(sortByCreatedAtDesc([])).toEqual([]);
  });
});
