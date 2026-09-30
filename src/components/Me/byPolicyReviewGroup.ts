type PolicyReviewGroupEntry = {
  groupId: string;
};

// 一列要對應一次表單填寫（一個 groupId），而不是其中的一項制度。
// 同一組若回傳多筆，只留第一筆代表整組（整組共用的欄位值都一樣）。
export const byPolicyReviewGroup = <T extends PolicyReviewGroupEntry>(
  policyReviewGroupList: T[],
): T[] => {
  const seen: Record<string, boolean> = {};
  return policyReviewGroupList.filter(({ groupId }) => {
    if (seen[groupId]) {
      return false;
    }
    seen[groupId] = true;
    return true;
  });
};
