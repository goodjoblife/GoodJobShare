import React, { useCallback, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'qs';
import Pagination from 'common/Pagination';
import Loader from 'common/Loader';
import WorkingHourBlock from '../TimeAndSalary/SearchScreen/WorkingHourBlock';
import {
  pageTypeTranslation,
  generatePageURL,
} from '../../constants/companyJobTitle';
import styles from './CompanyAndJobTitleIndex.module.css';
import {
  pageTypeData,
  pageTypeStatus,
} from '../../selectors/companyAndJobTitleIndex';
import { isFetched } from '../../constants/status';
import { fetchPageNames } from '../../actions/companyAndJobTitleIndex';

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

const CompanyAndJobTitleIndex = ({ pageType }) => {
  const [page, getPageLink] = usePagination();
  const status = useSelector(pageTypeStatus(pageType));
  const dispatch = useDispatch();
  const pageNames = useSelector(pageTypeData(pageType));

  useEffect(() => {
    dispatch(fetchPageNames({ pageType }));
  }, [dispatch, pageType]);

  if (!isFetched(status)) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        所有{pageTypeTranslation[pageType]}資料
      </div>
      <div className={styles.index}>
        {pageNames
          .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
          .map(pageName => (
            <WorkingHourBlock
              key={pageName}
              pageType={pageType}
              name={pageName}
              to={generatePageURL({ pageType, pageName })}
            />
          ))}
      </div>
      <Pagination
        totalCount={pageNames.length}
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
