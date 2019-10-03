import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

import { debounce } from 'utils/streamUtils';

import AutocompleteTextInput from './AutocompleteTextInput';
import Magnifier from '../../common/icons/Magnifiner';
import styles from './Searchbar.module.css';
import { getCompaniesSearch } from '../../../apis/companySearchApi';

const searchType = 'company';

const getInitialSearchTextFromLocation = location =>
  qs.parse(location.search, { ignoreQueryPrefix: true }).q || '';

const Searchbar = ({ className, placeholder, history, location }) => {
  const [searchText, setSearchText] = useState(
    getInitialSearchTextFromLocation(location),
  );
  const [autocompleteItems, setAutocompleteItems] = useState([]);
  const [isActive, setActive] = useState(false);
  const eleRef = useRef();

  const handleFormFocus = useCallback(() => {
    setActive(true);
  }, [setActive]);

  const handleFormBlur = useCallback(() => {
    setActive(false);
  }, [setActive]);

  const performSearchText = useCallback(
    debounce(async searchText => {
      if (searchText) {
        try {
          // TODO: search both company & job-title
          const response = await getCompaniesSearch({ key: searchText });
          const items = response.map(({ name, id }) => ({
            key: id,
            label: Array.isArray(name) ? name.shift() : name,
          }));
          if (eleRef.current) {
            setAutocompleteItems(items);
          }
        } catch (err) {
          if (eleRef.current) {
            setAutocompleteItems([]);
          }
        }
      } else {
        if (eleRef.current) {
          setAutocompleteItems([]);
        }
      }
    }, 800),
    [],
  );

  const handleChange = useCallback(
    e => {
      const searchText = e.target.value;
      setSearchText(searchText);
      performSearchText(searchText);
    },
    [setSearchText, performSearchText],
  );

  const gotoSearchResult = useCallback(
    searchText => {
      history.push(
        `/salary-work-times?q=${encodeURIComponent(
          searchText,
        )}&s_by=${searchType}`,
      );
    },
    [history],
  );

  const handleAutocompleteItemSelect = useCallback(
    e => {
      gotoSearchResult(e.label);
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
      ref={eleRef}
      className={cn(className, styles.searchbar, { [styles.active]: isActive })}
      onSubmit={handleFormSubmit}
      onFocus={handleFormFocus}
      onBlur={handleFormBlur}
    >
      <AutocompleteTextInput
        className={styles.textInput}
        placeholder={placeholder}
        value={searchText}
        onChange={handleChange}
        autocompleteItems={autocompleteItems}
        autocompleteItemKeySelector={item => item.key}
        autocompleteItemLabelSelector={item => item.label}
        onAutocompleteItemSelect={handleAutocompleteItemSelect}
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
