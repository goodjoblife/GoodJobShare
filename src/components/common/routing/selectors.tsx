import R from 'ramda';
import qs, { ParsedQs } from 'qs';

export const pathSelector = R.path(['match', 'path']);
export const paramsSelector: (
  state: any,
) => Record<string, string> | undefined = R.path<Record<string, string>>([
  'match',
  'params',
]);

export const pathnameSelector = R.path(['location', 'pathname']);
export const searchSelector: (state: any) => string = R.path([
  'location',
  'search',
]) as (state: any) => string;

// props --> query object
export const querySelector: (state: any) => ParsedQs = R.compose(
  (query: string) => qs.parse(query, { ignoreQueryPrefix: true }),
  searchSelector,
);
