import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import SearchTextInput from 'common/form/TextInput/SearchTextInput';
import Magnifiner from 'common/icons/Magnifiner';
import { keywordFromQuerySelector } from 'selectors/routing/keyword';
import { useQuery } from 'hooks/routing';
import styles from './Searchbar.module.css';

const Searchbar = ({ className, placeholder }) => {
  const history = useHistory();
  const query = useQuery();
  const [searchText, setSearchText] = useState(keywordFromQuerySelector(query));
  const [isActive, setActive] = useState(false);

  const handleFormFocus = useCallback(() => {
    setActive(true);
  }, [setActive]);

  const handleFormBlur = useCallback(() => {
    setActive(false);
  }, [setActive]);

  const gotoSearchResult = useCallback(
    searchText => {
      history.push(`/search?q=${encodeURIComponent(searchText)}`);
    },
    [history],
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
      className={cn(className, styles.searchbar, { [styles.active]: isActive })}
      onSubmit={handleFormSubmit}
      onFocus={handleFormFocus}
      onBlur={handleFormBlur}
    >
      <SearchTextInput
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
  placeholder: PropTypes.string,
};

export default Searchbar;
