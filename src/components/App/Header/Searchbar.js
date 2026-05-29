import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SearchTextInput from 'common/form/TextInput/SearchTextInput';
import Magnifiner from 'common/icons/Magnifiner';
import { useSearchbar } from 'common/Searchbar';
import styles from './Searchbar.module.css';

const Searchbar = ({ className, placeholder, inputRef }) => {
  const { searchText, setSearchText, gotoSearchResult } = useSearchbar();
  const [isActive, setActive] = useState(false);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      gotoSearchResult(searchText);
    },
    [gotoSearchResult, searchText],
  );
  const handleFormFocus = useCallback(() => setActive(true), []);
  const handleFormBlur = useCallback(() => setActive(false), []);

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

Searchbar.propTypes = {
  className: PropTypes.string.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  placeholder: PropTypes.string,
};

export default Searchbar;
