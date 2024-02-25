import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import TextInput from 'common/form/TextInput';
import Magnifiner from 'common/icons/Magnifiner';
import styles from './Searchbar.module.css';
import { useDebounce } from 'react-use';

import {
  pageType as pageTypes,
  pageTypeTranslation,
  searchingPageType,
  tabTypeTranslation,
} from 'constants/companyJobTitle';

const useSearchbarHelper = ({ pageType, tabType }) => {
  const [filter, setFilter] = useState('');

  const translatedPageType = pageTypeTranslation[pageType];
  const translatedSearchingPageType =
    pageTypeTranslation[searchingPageType[pageType]];
  const translatedTabType = tabTypeTranslation[tabType];

  const label = `搜尋${translatedSearchingPageType}：`;
  const placeholder = `搜該${translatedPageType}指定${translatedSearchingPageType}${translatedTabType}`;

  const getSearchingValue = useCallback(
    ({ company, job_title }) => {
      switch (pageType) {
        case pageTypes.COMPANY:
          return job_title.name;
        case pageTypes.JOB_TITLE:
          return company.name;
        default:
          return null;
      }
    },
    [pageType],
  );

  const matchesFilter = useCallback(
    data => {
      const value = getSearchingValue(data);
      if (!value) return false;
      return value.toLowerCase().includes(filter.toLowerCase());
    },
    [filter, getSearchingValue],
  );

  return {
    label,
    placeholder,
    setFilter,
    matchesFilter,
  };
};

const Searchbar = ({ className, label, placeholder, onSubmit }) => {
  const [searchText, setSearchText] = useState('');
  const ref = useRef(null);

  useDebounce(
    () => {
      onSubmit(searchText);
    },
    1000,
    [searchText],
  );

  const handleFormSubmit = useCallback(
    e => {
      e.preventDefault();
      onSubmit(searchText);
      if (ref.current) ref.current.blur();
    },
    [onSubmit, searchText],
  );

  return (
    <form
      className={cn(className, styles.searchbar)}
      onSubmit={handleFormSubmit}
    >
      {label}
      <TextInput
        ref={ref}
        className={styles.textInput}
        placeholder={placeholder}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <button type="submit" className={styles.searchBtn}>
        <Magnifiner />
      </button>
    </form>
  );
};

Searchbar.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

const useSearchbar = ({ pageType, tabType }) => {
  const { label, placeholder, setFilter, matchesFilter } = useSearchbarHelper({
    pageType,
    tabType,
  });

  const searchbar = (
    <Searchbar label={label} placeholder={placeholder} onSubmit={setFilter} />
  );

  return {
    searchbar,
    matchesFilter,
  };
};

export default useSearchbar;
