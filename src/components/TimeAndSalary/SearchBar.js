import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import R from 'ramda';
import ReactPixel from 'react-facebook-pixel';
import { withRouter } from 'react-router-dom';

import SearchTextInput from 'common/form/TextInput/SearchTextInput';
import Magnifiner from 'common/icons/Magnifiner';

import styles from './SearchBar.module.css';
import { searchKeywordSelector } from './common/selectors';

import PIXEL_CONTENT_CATEGORY from 'constants/pixelConstants';

const getInitialSearchTextFromLocation = R.compose(
  R.defaultTo(''),
  searchKeywordSelector,
);

const SearchBar = ({ history, location }) => {
  const [searchText, setSearchText] = useState(
    getInitialSearchTextFromLocation({ location }),
  );

  const gotoSearchResult = useCallback(
    searchText => {
      history.push(`/search?q=${encodeURIComponent(searchText)}`);
      ReactPixel.track('Search', {
        search_string: searchText,
        content_category: PIXEL_CONTENT_CATEGORY.SEARCH_TIME_AND_SALARY,
      });
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

SearchBar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(SearchBar);
