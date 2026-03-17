import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import qs from 'qs';

import { P } from 'common/base';
import ArrowLeft from 'common/icons/ArrowLeft';
import { useQuery } from 'hooks/routing';
import useMobile from 'hooks/useMobile';

import {
  getFromCount,
  getToCount,
  isPreviousDisabled,
  isNextDisabled,
  getTotalPage,
  getCurrentCount,
} from './helpers';

import styles from './Pagination.module.css';

const useSectionY = () => {
  const sectionRef = useRef(null);
  const isMobile = useMobile();
  const [y, setY] = useState(null);

  const handleSectionRef = useCallback(
    el => {
      if (el) {
        sectionRef.current = el;
      }
    },
    [sectionRef],
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  // DOM state changes don't notify React,
  // so dependencies are omitted to always run the effect
  // to ensure the latest scroll position is calculated.
  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      let newY = rect.top + window.scrollY;
      if (isMobile) {
        newY -= 50; /* nav height */
      }
      if (newY !== y) {
        setY(newY);
      }
    }
  });
  /* eslint-enable react-hooks/exhaustive-deps */

  return [y, handleSectionRef];
};

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

  return [createPageLinkTo, handleSectionRef];
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
