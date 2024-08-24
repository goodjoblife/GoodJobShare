import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import cn from 'classnames';
import qs from 'qs';
import ReactGA from 'react-ga4';

import { useQuery } from 'hooks/routing';
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

export const searchTextFromQuerySelector = query => query.q || '';

export const useSearchTextFromQuery = () => {
  const history = useHistory();
  const query = useQuery();
  const searchText = searchTextFromQuerySelector(query);
  const setSearchText = useCallback(
    nextSearchText => {
      if (searchText === nextSearchText) return;
      const { q, p, ...restQuery } = query; // remove page when search text changes
      const nextQuery = { ...restQuery, q: nextSearchText };
      const nextUrl = qs.stringify(nextQuery, { addQueryPrefix: true });
      history.push(nextUrl);
    },
    [searchText, query, history],
  );
  return [searchText, setSearchText];
};

const Searchbar = ({ className, label, placeholder, pageType }) => {
  const [
    searchTextFromQuery,
    setSearchTextFromQuery,
  ] = useSearchTextFromQuery();
  const [searchText, setSearchText] = useState(searchTextFromQuery);
  const ref = useRef(null);

  useDebounce(
    () => {
      setSearchTextFromQuery(searchText);
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
      setSearchTextFromQuery(searchText);
      if (ref.current) ref.current.blur();
    },
    [setSearchTextFromQuery, searchText],
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
  pageType: PropTypes.string,
  placeholder: PropTypes.string,
};

const useSearchbar = ({ pageType, tabType }) => {
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

  const WrappedSearchbar = useCallback(
    () => (
      <Searchbar label={label} placeholder={placeholder} pageType={pageType} />
    ),
    [label, placeholder, pageType],
  );

  return WrappedSearchbar;
};

export default useSearchbar;
