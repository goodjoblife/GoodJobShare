import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { useQuery } from 'hooks/routing';
import { queryFromQuerySelector } from 'selectors/routing';

const useSearchBar = (): {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  gotoSearchResult: (text: string) => void;
} => {
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

  return { searchText, setSearchText, gotoSearchResult };
};

export default useSearchBar;
