import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReportList.module.css';
import { P } from 'common/base';
import Button from 'common/button/Button';

const ReportList = ({ onCloseReport, reports }) => {
  return (
    <div className={styles.reportList}>
      {reports?.length === 0 ? (
        <span>沒有檢舉記錄</span>
      ) : (
        <span>共 {reports?.length} 個檢舉：</span>
      )}
      {reports?.map(({ reason_category, reason }, i) => (
        <div key={i} className={styles.reportItem}>
          <P size="m" bold>
            {reason_category}
          </P>
          <P size="m">{reason}</P>
        </div>
      ))}
      <Button circleSize="md" btnStyle="black" onClick={onCloseReport}>
        我要回報
      </Button>
    </div>
  );
};

ReportList.propTypes = {
  onCloseReport: PropTypes.func.isRequired,
  reports: PropTypes.arrayOf(PropTypes.object),
};

export default ReportList;
