import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReportList.module.css';
import { Heading, P } from 'common/base';
import Button from 'common/button/Button';

const ReportList = ({ reports, reportCount, onShowReportForm }) => {
  return (
    <div className={styles.reportList}>
      {reportCount === 0 ? (
        <span className={styles.noReport}>沒有回報記錄</span>
      ) : (
        <div className={styles.headerContainer}>
          <Heading size="l" className={styles.header}>
            查看其他人回報
          </Heading>
          <P className={styles.totalReport}>共 {reportCount} 個回報</P>
        </div>
      )}
      {reports.map(({ reasonCategory, reason }, i) => (
        <div key={i} className={styles.reportItem}>
          <P size="m" bold>
            {reasonCategory}
          </P>
          <P size="m" className={styles.reason}>
            {reason}
          </P>
        </div>
      ))}
      <Button
        className={styles.reportButton}
        circleSize="md"
        btnStyle="black"
        onClick={onShowReportForm}
      >
        我要回報
      </Button>
    </div>
  );
};

ReportList.propTypes = {
  onShowReportForm: PropTypes.func.isRequired,
  reportCount: PropTypes.number,
  reports: PropTypes.arrayOf(PropTypes.object),
};

export default ReportList;
