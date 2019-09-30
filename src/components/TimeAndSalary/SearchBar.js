import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import R from 'ramda';
import ReactPixel from 'react-facebook-pixel';
import { withRouter } from 'react-router-dom';

import { debounce } from 'utils/streamUtils';
import AutoCompleteTextInput from './AutoCompleteTextInput';
import Magnifiner from 'common/icons/Magnifiner';

import styles from './SearchBar.module.css';
import { fetchCompanyCandidates } from '../../apis/timeAndSalaryApi';
import { searchKeywordSelector } from './common/selectors';

import PIXEL_CONTENT_CATEGORY from '../../constants/pixelConstants';

const getInitialSearchTextFromLocation = R.compose(
  R.defaultTo(''),
  searchKeywordSelector,
);

const searchType = 'company';

const SearchBar = ({ history, location }) => {
  const [searchText, setSearchText] = useState(
    getInitialSearchTextFromLocation({ location }),
  );
  const [autocompleteItems, setAutocompleteItems] = useState([]);

  const performSearch = useCallback(
    debounce(async searchText => {
      if (searchText) {
        try {
          const response = await fetchCompanyCandidates({ key: searchText });
          const autocompleteItems = response.map(({ _id: { name } }) => name);
          setAutocompleteItems(autocompleteItems);
        } catch (err) {
          setAutocompleteItems([]);
        }
      } else {
        setAutocompleteItems([]);
      }
    }, 500),
    [setAutocompleteItems],
  );

  const handleSearchTextChange = useCallback(
    e => {
      setSearchText(e.target.value);
      performSearch(e.target.value);
    },
    [performSearch],
  );

  const gotoSearchResult = useCallback(
    searchText => {
      history.push(
        `/salary-work-times?q=${encodeURIComponent(
          searchText,
        )}&s_by=${searchType}`, // TODO: undetermined search-type
      );
      ReactPixel.track('Search', {
        search_string: searchText,
        content_category: PIXEL_CONTENT_CATEGORY.SEARCH_TIME_AND_SALARY,
      });
    },
    [history],
  );

  const handleAutocompleteItemSelect = useCallback(
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
      <AutoCompleteTextInput
        wrapperClassName={styles.textInputWrapper}
        className={styles.textInput}
        value={searchText}
        onChange={handleSearchTextChange}
        placeholder="輸入公司、職稱查詢"
        autocompleteItems={autocompleteItems}
        onAutocompleteItemSelect={handleAutocompleteItemSelect}
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
