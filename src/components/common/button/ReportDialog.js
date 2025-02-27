import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReportDialog.module.css';
import cn from 'classnames';

const ReportDialog = ({
  reportCount = 0,
  isHighlighted = false,
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
      {reportText && <div className={styles.reportText}>{reportText}</div>}
    </div>
  );
};

ReportDialog.propTypes = {
  isHighlighted: PropTypes.bool,
  reportCount: PropTypes.number.isRequired,
  reportText: PropTypes.string,
};

ReportDialog.defaultProps = {
  isHighlighted: false,
  reportText: '回報',
};

export default ReportDialog;
