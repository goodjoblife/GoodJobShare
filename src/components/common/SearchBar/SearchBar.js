import React, { useCallback } from 'react';
import cn from 'classnames';
import SearchTextInput from 'common/form/TextInput/SearchTextInput';
import Magnifiner from 'common/icons/Magnifiner';
import useSearchBar from './useSearchBar';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchText, setSearchText, gotoSearchResult] = useSearchBar();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      gotoSearchResult(searchText);
    },
    [gotoSearchResult, searchText],
  );

  return (
    <form
      className={cn(styles.section, styles.searchbar)}
      onSubmit={handleSubmit}
    >
      <SearchTextInput
        wrapperClassName={styles.textInputWrapper}
        className={styles.textInput}
        value={searchText}
        onChange={setSearchText}
        placeholder="搜全站薪水/面試/評價"
        onSelected={gotoSearchResult}
      />
      <button type="submit" className={styles.searchBtn}>
        <Magnifiner />
        搜尋
      </button>
    </form>
  );
};

export default SearchBar;
