import { byPolicyReviewGroup } from './byPolicyReviewGroup';

type Entry = { groupId: string; jobTitle: string };

const entryOf = (groupId: string, jobTitle = '前端工程師'): Entry => ({
  groupId,
  jobTitle,
});

describe('byPolicyReviewGroup', () => {
  it('keeps one entry per groupId', () => {
    const grouped = byPolicyReviewGroup([
      entryOf('group-1'),
      entryOf('group-1'),
      entryOf('group-2'),
    ]);

    expect(grouped.map(o => o.groupId)).toEqual(['group-1', 'group-2']);
  });

  it('keeps the first entry of each group and the original order', () => {
    const grouped = byPolicyReviewGroup([
      entryOf('group-2', '設計師'),
      entryOf('group-1', '前端工程師'),
      entryOf('group-2', '後端工程師'),
    ]);

    expect(grouped).toEqual([
      { groupId: 'group-2', jobTitle: '設計師' },
      { groupId: 'group-1', jobTitle: '前端工程師' },
    ]);
  });

  it('leaves an already-grouped list untouched', () => {
    const list = [entryOf('group-1'), entryOf('group-2')];

    expect(byPolicyReviewGroup(list)).toEqual(list);
  });

  it('handles an empty list', () => {
    expect(byPolicyReviewGroup([])).toEqual([]);
  });
});
