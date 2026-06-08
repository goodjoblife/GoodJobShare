import { ParsedQs } from 'qs';

// query from ?q=xxx
export const queryFromQuerySelector = (query: ParsedQs): string => {
  const keyword = query.q;
  return typeof keyword === 'string' ? keyword : '';
};

// page from ?p=xxx
export const pageFromQuerySelector = (query: ParsedQs): number => {
  const p = parseInt(typeof query.p === 'string' ? query.p : '', 10);
  return Number.isNaN(p) ? 1 : p;
};
