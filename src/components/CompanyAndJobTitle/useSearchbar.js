import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ReactGA from 'react-ga4';

import TextInput from 'common/form/TextInput';
import Magnifiner from 'common/icons/Magnifiner';
import styles from './Searchbar.module.css';
import { useDebounce } from 'react-use';

import {
  pageType as pageTypes,
  pageTypeTranslation,
  tabTypeTranslation,
} from 'constants/companyJobTitle';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';

const Searchbar = ({ className, label, placeholder, onSubmit, pageType }) => {
  const [searchText, setSearchText] = useState('');
  const ref = useRef(null);

  useDebounce(
    () => {
      onSubmit(searchText);
      switch (pageType) {
        case pageTypes.COMPANY:
          ReactGA.event({
            category: GA_CATEGORY.COMPANY_PAGE,
            action: GA_ACTION.SEARCH_JOB_TITLE,
            label: searchText,
          });
          break;
        case pageTypes.JOB_TITLE:
          ReactGA.event({
            category: GA_CATEGORY.JOB_TITLE_PAGE,
            action: GA_ACTION.SEARCH_COMPANY,
            label: searchText,
          });
          break;
        default:
          break;
      }
    },
    300,
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
  onSubmit: PropTypes.func.isRequired,
  pageType: PropTypes.string,
  placeholder: PropTypes.string,
};

const useSearchbar = ({ pageType, tabType }) => {
  const [filter, setFilter] = useState('');

  const translatedPageType = pageTypeTranslation[pageType];
  const translatedTabType = tabTypeTranslation[tabType];

  const searchingPageType = (() => {
    switch (pageType) {
      case pageTypes.COMPANY:
        return pageTypes.JOB_TITLE;
      case pageTypes.JOB_TITLE:
        return pageTypes.COMPANY;
      default:
        return null;
    }
  })();
  const translatedSearchingPageType = pageTypeTranslation[searchingPageType];

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

  const WrappedSearchbar = useCallback(
    () => (
      <Searchbar
        label={label}
        placeholder={placeholder}
        onSubmit={setFilter}
        pageType={pageType}
      />
    ),
    [label, placeholder, setFilter],
  );

  return {
    Searchbar: WrappedSearchbar,
    matchesFilter,
  };
};

export default useSearchbar;
