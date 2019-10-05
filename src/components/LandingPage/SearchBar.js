import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactPixel from 'react-facebook-pixel';
import { withRouter } from 'react-router-dom';

import AutoCompleteCompanyNameTextInput from 'common/form/AutoCompleteTextInput_new/AutoCompleteCompanyNameTextInput';
import Magnifiner from 'common/icons/Magnifiner';

import styles from './SearchBar.module.css';

import PIXEL_CONTENT_CATEGORY from '../../constants/pixelConstants';

const searchType = 'company';

const SearchBar = ({ history, location }) => {
  const [searchText, setSearchText] = useState('');

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

  const handleFormSubmit = useCallback(
    e => {
      e.preventDefault();
      gotoSearchResult(searchText);
    },
    [gotoSearchResult, searchText],
  );

  return (
    <form className={styles.searchbar} onSubmit={handleFormSubmit}>
      <AutoCompleteCompanyNameTextInput
        wrapperClassName={styles.textInputWrapper}
        className={styles.textInput}
        value={searchText}
        onChange={setSearchText}
        placeholder="輸入公司、職稱查詢"
        onCompanyNameSelected={gotoSearchResult}
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
