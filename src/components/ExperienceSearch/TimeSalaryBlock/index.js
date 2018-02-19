import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Heading } from 'common/base';
import styles from './TimeSalaryBlock.module.css';

const TimeSalaryBlock = ({ data }) => {
  const { average, company } = data;
  return (
    <Link to="/要查一下doc" className={styles.root}>
      <Heading size="sm" className={styles.headingBlock}>{company.name}</Heading>
      <div className={styles.averageBlock}>
        <span className={styles.averageBlockHeading}>平均一週總工時：</span>
        <span className={styles.averageBlockValue}>
          {average.week_work_time.toFixed(1)}&nbsp;小時
        </span>
      </div>
      <div className={styles.averageBlock}>
        <span className={styles.averageBlockHeading}>平均估計時薪：</span>
        <span className={styles.averageBlockValue}>
          xxx&nbsp;元
        </span>
      </div>
    </Link>
  );
};
TimeSalaryBlock.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TimeSalaryBlock;
