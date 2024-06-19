import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import SearchTextInput from 'common/form/TextInput/SearchTextInput';
import Magnifiner from 'common/icons/Magnifiner';
import { useQuery } from 'hooks/routing';
import styles from './SearchBar.module.css';
import { keywordFromQuerySelector } from 'selectors/routing/keyword';

const SearchBar = () => {
  const history = useHistory();
  const query = useQuery();
  const [searchText, setSearchText] = useState(keywordFromQuerySelector(query));

  const gotoSearchResult = useCallback(
    searchText => {
      history.push(`/search?q=${encodeURIComponent(searchText)}`);
    },
    [history],
  );

  const handleAutocompleteItemSelected = useCallback(
    e => {
      gotoSearchResult(e);
    },
    [gotoSearchResult],
  );

  const handleFormSubmit = useCallback(
    e => {
      e.preventDefault();
      gotoSearchResult(searchText);
    },
    [gotoSearchResult, searchText],
  );

  return (
    <form
      className={cn(styles.section, styles.searchbar)}
      onSubmit={handleFormSubmit}
    >
      <SearchTextInput
        wrapperClassName={styles.textInputWrapper}
        className={styles.textInput}
        value={searchText}
        onChange={setSearchText}
        placeholder="搜全站薪水/面試/評價"
        onSelected={handleAutocompleteItemSelected}
      />
      <button type="submit" className={styles.searchBtn}>
        <Magnifiner />
        搜尋
      </button>
    </form>
  );
};

export default SearchBar;
