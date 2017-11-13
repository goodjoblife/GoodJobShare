import React from 'react';
// import PropTypes from 'prop-types';

import { P } from 'common/base';
import Button from 'common/button/Button';
import { ArrowLeft } from 'common/icons';

import styles from './Pagination.module.css';

const Pagination = () => (
  <div className={styles.pagination}>
    <P size="m" className={styles.info}>1-20 篇 (共 93 篇)</P>
    <div>
      <Button btnStyle="firstPage">第一頁</Button>
      <Button btnStyle="page"><ArrowLeft />前一頁</Button>
      <Button btnStyle="page" disabled>下一頁<ArrowLeft style={{ transform: 'scaleX(-1)' }} /></Button>
    </div>
  </div>
);

Pagination.propTypes = {

};

export default Pagination;
