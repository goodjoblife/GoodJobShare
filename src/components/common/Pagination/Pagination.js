import PropTypes from 'prop-types';
import qs from 'qs';
import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { P } from 'common/base';
import ArrowLeft from 'common/icons/ArrowLeft';
import { useQuery } from 'hooks/routing';
import useSectionY from 'hooks/useSectionY';

import {
  getCurrentCount,
  getFromCount,
  getToCount,
  getTotalPage,
  isNextDisabled,
  isPreviousDisabled,
} from './helpers';
import styles from './Pagination.module.css';

// Portal for generating the link and ref
export const useCreatePageLinkTo = () => {
  const location = useLocation();
  const queryParams = useQuery();
  const [y, handleSectionRef] = useSectionY();

  const createPageLinkTo = useCallback(
    p => {
      const pathname = location.pathname;
      const search = qs.stringify(
        { ...queryParams, p },
        { addQueryPrefix: true },
      );
      return {
        pathname,
        search,
        state: { y },
      };
    },
    [y, queryParams, location.pathname],
  );

  return [createPageLinkTo, handleSectionRef, y];
};

const Pagination = ({ totalCount, unit, currentPage, createPageLinkTo }) => {
  const totalPage = getTotalPage(totalCount, unit);
  const currentCount = getCurrentCount(totalCount, unit, currentPage);

  if (totalCount === 0) return null;
  return (
    <div className={styles.pagination}>
      <P size="m" className={styles.info}>
        {`${getFromCount(currentPage, unit)}-${getToCount(
          currentPage,
          unit,
          currentCount,
        )} 篇 (共 ${totalCount} 篇)`}
      </P>
      <div className={styles.buttons}>
        <Link className="buttonFirstPage" to={createPageLinkTo(1)}>
          最前頁
        </Link>
        {isPreviousDisabled(currentPage) ? (
          <div className="buttonPage" disabled>
            <ArrowLeft />
            前一頁
          </div>
        ) : (
          <Link
            className="buttonPage"
            disabled={isPreviousDisabled(currentPage)}
            to={
              isPreviousDisabled(currentPage)
                ? ''
                : createPageLinkTo(currentPage - 1)
            }
          >
            <ArrowLeft />
            前一頁
          </Link>
        )}
        {isNextDisabled(currentPage, totalPage) ? (
          <div className="buttonPage" disabled>
            下一頁
            <ArrowLeft style={{ transform: 'scaleX(-1)' }} />
          </div>
        ) : (
          <Link
            className="buttonPage"
            disabled={isNextDisabled(currentPage, totalPage)}
            to={createPageLinkTo(currentPage + 1)}
          >
            下一頁
            <ArrowLeft style={{ transform: 'scaleX(-1)' }} />
          </Link>
        )}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  createPageLinkTo: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,
  unit: PropTypes.number,
};

export default Pagination;
