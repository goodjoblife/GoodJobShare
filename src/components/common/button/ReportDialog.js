import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReportDialog.module.css';
import cn from 'classnames';

const ReportDialog = ({
  reportCount = 0,
  isHighlighted = false,
  isShowReportText = false,
  reportText = '回報',
}) => {
  const hasReport = reportCount > 0;
  return (
    <div className={styles.reportDialogContainer}>
      <div
        className={cn(styles.dialogWrapper, {
          [styles.highlighted]: isHighlighted,
          [styles.enabled]: hasReport,
        })}
      >
        <div className={styles.dialogBox}>{hasReport ? reportCount : '!'}</div>
        <div className={styles.dialogTriangle}></div>
      </div>
      {isShowReportText && (
        <div className={styles.reportText}>{reportText}</div>
      )}
    </div>
  );
};

ReportDialog.propTypes = {
  isHighlighted: PropTypes.bool,
  isShowReportText: PropTypes.bool,
  reportCount: PropTypes.number.isRequired,
  reportText: PropTypes.string,
};

ReportDialog.defaultProps = {
  isHighlighted: false,
  isShowReportText: false,
  reportCount: 0,
  reportText: '回報',
};

export default ReportDialog;
