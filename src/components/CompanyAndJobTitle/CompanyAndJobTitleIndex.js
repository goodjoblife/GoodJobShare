import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'qs';
import Pagination from 'common/Pagination';
import WorkingHourBlock from '../TimeAndSalary/SearchScreen/WorkingHourBlock';
import {
  pageType as PAGE_TYPE,
  pageTypeTranslation,
  generatePageURL,
} from '../../constants/companyJobTitle';
import { getCompanyNames } from '../../apis/company';
import { getJobTitles } from '../../apis/jobTitle';
import Loader from 'common/Loader';
import styles from './CompanyAndJobTitleIndex.module.css';

const PAGE_SIZE = 10;

const usePagination = () => {
  const location = useLocation();
  const query = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location.search],
  );
  const getPageLink = useCallback(
    p => qs.stringify({ ...query, p }, { addQueryPrefix: true }),
    [query],
  );
  return [Number(query.p || 1), getPageLink];
};

const getNames = pageType => {
  switch (pageType) {
    case PAGE_TYPE.COMPANY:
      return getCompanyNames();
    case PAGE_TYPE.JOB_TITLE:
      return getJobTitles();
    default:
      return Promise.reject(new Error('Unknown page type'));
  }
};

const CompanyAndJobTitleIndex = ({ pageType }) => {
  const [page, getPageLink] = usePagination();
  const [names, setNames] = useState([]);
  useEffect(() => {
    getNames(pageType).then(setNames);
  }, [pageType]);

  if (names.length == 0) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        所有{pageTypeTranslation[pageType]}資料
      </div>
      <div className={styles.index}>
        {names.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(name => (
          <WorkingHourBlock
            key={name}
            pageType={pageType}
            name={name}
            to={generatePageURL({ pageType, pageName: name })}
          />
        ))}
      </div>
      <Pagination
        totalCount={names.length}
        unit={PAGE_SIZE}
        currentPage={page}
        createPageLinkTo={getPageLink}
      />
    </div>
  );
};

CompanyAndJobTitleIndex.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default CompanyAndJobTitleIndex;
