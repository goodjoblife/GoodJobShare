export const getFromCount = (currentPage, unit) =>
  ((currentPage - 1) * unit) + 1;

export const getToCount = (currentPage, unit, currentCount) =>
  ((currentPage - 1) * unit) + 1 + (currentCount - 1);

export const isPreviousDisabled = currentPage =>
  currentPage <= 1;

export const isNextDisabled = (currentPage, totalPage) =>
  currentPage >= totalPage;

