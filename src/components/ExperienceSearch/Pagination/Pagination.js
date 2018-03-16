import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { P } from 'common/base';
import { ArrowLeft } from 'common/icons';

import {
  getFromCount,
  getToCount,
  isPreviousDisabled,
  isNextDisabled,
  getTotalPage,
  getCurrentCount,
} from './helpers';

import styles from './Pagination.module.css';

const Pagination = ({
  totalCount,
  unit,
  currentPage,
  createPageLinkTo,
}) => {
  const totalPage = getTotalPage(totalCount, unit);
  const currentCount = getCurrentCount(totalCount, unit, currentPage);

  if (totalCount === 0) return null;
  return (
    <div className={styles.pagination}>
      <P size="m" className={styles.info}>
        {`${getFromCount(currentPage, unit)}-${getToCount(currentPage, unit, currentCount)} 篇 (共 ${totalCount} 篇)`}
      </P>
      <div className={styles.buttons}>
        <Link
          className="buttonFirstPage"
          to={createPageLinkTo(1)}
        >
          第一頁
        </Link>
        <Link
          className="buttonPage"
          disabled={isPreviousDisabled(currentPage)}
          to={isPreviousDisabled(currentPage) ? undefined : createPageLinkTo(currentPage - 1)}
        >
          <ArrowLeft />前一頁
        </Link>
        <Link
          className="buttonPage"
          disabled={isNextDisabled(currentPage, totalPage)}
          to={isNextDisabled(currentPage, totalPage) ? undefined : createPageLinkTo(currentPage + 1)}
        >
          下一頁<ArrowLeft style={{ transform: 'scaleX(-1)' }} />
        </Link>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number,
  unit: PropTypes.number,
  currentPage: PropTypes.number,
  createPageLinkTo: PropTypes.func.isRequired,
};

export default Pagination;
