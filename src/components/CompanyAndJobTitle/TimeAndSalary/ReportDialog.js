import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReportDialog.module.css';
import cn from 'classnames';

const ReportDialog = ({ reportCount, isHighlighted }) => {
  const isShowReportCount = reportCount > 0;
  return (
    <div
      className={cn(styles.dialogWrapper, {
        [styles.highlighted]: isHighlighted,
        [styles.enabled]: isShowReportCount,
      })}
    >
      <div className={styles.dialogBox}>
        {isShowReportCount ? reportCount : '!'}
      </div>
      <div className={styles.dialogTriangle}></div>
    </div>
  );
};

ReportDialog.propTypes = {
  isHighlighted: PropTypes.bool,
  reportCount: PropTypes.number,
};
ReportDialog.defaultProps = {
  isHighlighted: false,
  reportCount: 0,
};

export default ReportDialog;
