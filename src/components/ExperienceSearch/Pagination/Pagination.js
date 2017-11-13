import React from 'react';
import PropTypes from 'prop-types';

import { P } from 'common/base';
import Button from 'common/button/Button';
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
  onSelect,
}) => {
  const totalPage = getTotalPage(totalCount, unit);
  const currentCount = getCurrentCount(totalCount, unit, currentPage);
  return (
    <div className={styles.pagination}>
      <P size="m" className={styles.info}>
        {`${getFromCount(currentPage, unit)}-${getToCount(currentPage, unit, currentCount)} 篇 (共 ${totalCount} 篇)`}
      </P>
      <div>
        <Button
          btnStyle="firstPage"
          onClick={() => onSelect(1)}
        >
          第一頁
        </Button>
        <Button
          btnStyle="page"
          disabled={isPreviousDisabled(currentPage)}
          onClick={() => onSelect(currentPage - 1)}
        >
          <ArrowLeft />前一頁
      </Button>
        <Button
          btnStyle="page"
          disabled={isNextDisabled(currentPage, totalPage)}
          onClick={() => onSelect(currentPage + 1)}
        >
          下一頁<ArrowLeft style={{ transform: 'scaleX(-1)' }} />
        </Button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number,
  unit: PropTypes.number,
  currentPage: PropTypes.number,
  onSelect: PropTypes.func,
  // disabled: PropTypes.bool,
};

export default Pagination;
