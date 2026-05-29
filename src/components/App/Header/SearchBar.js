import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SearchTextInput from 'common/form/TextInput/SearchTextInput';
import Magnifiner from 'common/icons/Magnifiner';
import { useSearchBar } from 'common/SearchBar';
import styles from './SearchBar.module.css';

const SearchBar = ({ className, placeholder, inputRef }) => {
  const [searchText, setSearchText, gotoSearchResult] = useSearchBar();
  const [isActive, setActive] = useState(false);

  const handleFormFocus = useCallback(() => setActive(true), []);
  const handleFormBlur = useCallback(() => setActive(false), []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      gotoSearchResult(searchText);
    },
    [gotoSearchResult, searchText],
  );

  return (
    <form
      className={cn(className, styles.searchbar, { [styles.active]: isActive })}
      onSubmit={handleSubmit}
      onFocus={handleFormFocus}
      onBlur={handleFormBlur}
    >
      <SearchTextInput
        ref={inputRef}
        className={styles.textInput}
        placeholder={placeholder}
        value={searchText}
        onChange={setSearchText}
        onSelected={gotoSearchResult}
      />
      <button type="submit" className={styles.searchBtn}>
        <Magnifiner />
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  placeholder: PropTypes.string,
};

export default SearchBar;
