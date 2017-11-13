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
} from './helpers';

import styles from './Pagination.module.css';

const Pagination = ({
  totalPage,
  totalCount,
  currentCount,
  unit,
  currentPage,
}) => (
  <div className={styles.pagination}>
    <P size="m" className={styles.info}>
      {`${getFromCount(currentPage, unit)}-${getToCount(currentPage, unit, currentCount)} 篇 (共 ${totalCount} 篇)`}
    </P>
    <div>
      <Button btnStyle="firstPage">{`第 ${currentPage} 頁`}</Button>
      <Button
        btnStyle="page"
        disabled={isPreviousDisabled(currentPage)}
      >
        <ArrowLeft />前一頁
      </Button>
      <Button
        btnStyle="page"
        disabled={isNextDisabled(currentPage, totalPage)}
      >
        下一頁<ArrowLeft style={{ transform: 'scaleX(-1)' }} />
      </Button>
    </div>
  </div>
);

Pagination.propTypes = {
  totalPage: PropTypes.number,
  totalCount: PropTypes.number,
  currentCount: PropTypes.number,
  unit: PropTypes.number,
  currentPage: PropTypes.number,
  // onSelect: PropTypes.func,
  // style: PropTypes.object,
  // disabled: PropTypes.bool,
};

export default Pagination;
