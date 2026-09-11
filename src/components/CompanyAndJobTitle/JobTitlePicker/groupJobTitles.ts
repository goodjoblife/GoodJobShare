export type JobTitleCount = {
  name: string;
  count: number;
};

// 兩個字以上的共同前綴才視為同一群，避免「專員」這種常見字尾
// 把互不相關的職稱（業務專員、理賠專員…）誤連成一大群。
const PREFIX_THRESHOLD = 2;

const longestCommonPrefixLength = (a: string, b: string): number => {
  const max = Math.min(a.length, b.length);
  let i = 0;
  while (i < max && a[i] === b[i]) i++;
  return i;
};

// 依字首前綴（含最長共同前綴）把相近職稱分在同一群，例如「前端」「前端工程師」
// 排序邏輯：群組間依群組總筆數（人氣）由高到低排列；群組內依筆數排序。
// 群組本身不會被渲染成任何標題／分隔線，單純決定 flat list 的排列順序，
// 讓相關職稱在畫面上自然鄰近，藉此輔助使用者尋找。
export const groupJobTitles = (items: JobTitleCount[]): JobTitleCount[] => {
  const sorted = [...items].sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
  );

  const groups: JobTitleCount[][] = [];
  sorted.forEach((item, index) => {
    const prev = sorted[index - 1];
    const sameGroup =
      prev &&
      longestCommonPrefixLength(prev.name, item.name) >= PREFIX_THRESHOLD;
    if (sameGroup) {
      groups[groups.length - 1].push(item);
    } else {
      groups.push([item]);
    }
  });

  const rankedGroups = groups
    .map(group => ({
      items: [...group].sort(
        (a, b) => b.count - a.count || a.name.length - b.name.length,
      ),
      total: group.reduce((sum, item) => sum + item.count, 0),
    }))
    .sort((a, b) => b.total - a.total);

  return rankedGroups.flatMap(group => group.items);
};
