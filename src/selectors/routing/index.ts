import { ParsedQs } from 'qs';

// query from ?q=xxx
export const queryFromQuerySelector = (query: ParsedQs): string => {
  const keyword = query.q;
  return typeof keyword === 'string' ? keyword : '';
};

// page from ?p=xxx
export const pageFromQuerySelector = (query: ParsedQs): number => {
  const p = parseInt(query.p as string, 10);
  return Number.isNaN(p) ? 1 : p;
};

// page from ?rating=xxx
export const ratingFromQuerySelector = (query: ParsedQs): number | null => {
  const { rating } = query;
  if (typeof rating !== 'string') return null;
  const n = parseInt(rating, 10);
  return isNaN(n) ? null : n;
};
