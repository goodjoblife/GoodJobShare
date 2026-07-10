import qs from 'qs';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { useQuery } from 'hooks/routing';
import { ratingFromQuerySelector } from 'selectors/routing';

const useRating = (): [number | null, (next: number | null) => void] => {
  const history = useHistory();
  const query = useQuery();

  const rating = ratingFromQuerySelector(query);

  const setRating = useCallback(
    (next: number | null) => {
      const newQuery = { ...query };
      if (next === null) {
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
