import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useQuery } from 'hooks/routing';
import qs from 'qs';
import { ratingsFromQuerySelector } from 'selectors/routing/ratings';

export type FilterOption = {
  value: number;
  label: string;
};

export const RATING_FILTER_OPTIONS: FilterOption[] = [
  { value: 5, label: '非常滿意' },
  { value: 4, label: '滿意' },
  { value: 3, label: '普通' },
  { value: 2, label: '不滿意' },
  { value: 1, label: '非常不滿意' },
];

export const useRatings = () => {
  const history = useHistory();
  const query = useQuery();

  const ratings = ratingsFromQuerySelector(query);

  const setRatings = useCallback(
    (next: number[]) => {
      next = next.sort();

      const newQuery = {
        ...query,
        rating: next.length === 0 ? undefined : next.join(','),
      };
      if (!newQuery.rating) {
        delete newQuery.rating;
      }
      const search = qs.stringify(newQuery, {
        addQueryPrefix: true,
        encode: false,
      });

      history.push({ search });
    },
    [query, history],
  );

  return [ratings, setRatings];
};

// Clicking a filter updates the query string
export const useRatingsToggle = () => {
  const [ratings, setRatings] = useRatings();
  const toggleRating = useCallback(
    (rating: number) => {
      let next: number[];
      if ((ratings as number[]).includes(rating)) {
        next = ratings.filter(r => r !== rating);
      } else {
        next = [...ratings, rating];
      }
      setRatings(next);
    },
    [ratings, setRatings],
  );

  return [ratings, toggleRating];
};
