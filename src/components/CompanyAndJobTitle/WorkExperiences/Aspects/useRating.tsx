import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useQuery } from 'hooks/routing';
import qs from 'qs';
import { ratingFromQuerySelector } from 'selectors/routing/ratings';

const useRating = () => {
  const history = useHistory();
  const query = useQuery();

  const rating = ratingFromQuerySelector(query);

  const setRating = useCallback(
    (next: number | undefined) => {
      const newQuery = { ...query };
      if (next === undefined) {
        delete newQuery.rating;
      } else {
        newQuery.rating = String(next);
      }
      const search = qs.stringify(newQuery, {
        addQueryPrefix: true,
        encode: false,
      });

      history.push({ search });
    },
    [query, history],
  );

  return [rating, setRating];
};

export default useRating;
