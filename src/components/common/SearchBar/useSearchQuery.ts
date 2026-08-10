import qs from 'qs';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useQuery } from 'hooks/routing';
import { queryFromQuerySelector } from 'selectors/routing';

const useSearchQuery = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (text: string) => void,
] => {
  const history = useHistory();
  const query = useQuery();
  const [searchText, setSearchText] = useState(queryFromQuerySelector(query));

  const gotoSearchResult = useCallback(
    (text: string) =>
      history.push({
        pathname: '/search',
        search: qs.stringify({ q: text }, { addQueryPrefix: true }),
      }),
    [history],
  );

  return [searchText, setSearchText, gotoSearchResult];
};

export default useSearchQuery;
