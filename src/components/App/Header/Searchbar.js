import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

import AutoCompleteSearchTextInput from 'common/form/AutoCompleteTextInput_new/AutoCompleteSearchTextInput';
import Magnifier from '../../common/icons/Magnifiner';
import styles from './Searchbar.module.css';

const getInitialSearchTextFromLocation = location =>
  qs.parse(location.search, { ignoreQueryPrefix: true }).q || '';

const Searchbar = ({ className, placeholder, history, location }) => {
  const [searchText, setSearchText] = useState(
    getInitialSearchTextFromLocation(location),
  );
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
      <AutoCompleteSearchTextInput
        className={styles.textInput}
        placeholder={placeholder}
        value={searchText}
        onChange={setSearchText}
        onSelected={gotoSearchResult}
      />
      <button type="submit" className={styles.searchBtn}>
        <Magnifier />
      </button>
    </form>
  );
};

Searchbar.propTypes = {
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Searchbar);
