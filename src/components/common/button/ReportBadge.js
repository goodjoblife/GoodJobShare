import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReportBadge.module.css';
import cn from 'classnames';
import ReportIcon from '../icons/Report';

const ReportBadge = ({
  reportCount = 0,
  isHighlighted = false,
  reportText,
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
        <div className={styles.dialogBox}>
          {hasReport ? (
            reportCount
          ) : (
            <ReportIcon className={styles.reportIcon} />
          )}
        </div>
      </div>
      {reportText && <div className={styles.reportText}>{reportText}</div>}
    </div>
  );
};

ReportBadge.propTypes = {
  isHighlighted: PropTypes.bool,
  reportCount: PropTypes.number.isRequired,
  reportText: PropTypes.string,
};

ReportBadge.defaultProps = {
  isHighlighted: false,
};

export default ReportBadge;
