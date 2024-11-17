import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReportDialog.module.css';
import cn from 'classnames';

const ReportDialog = ({ reportCount, isHighlighted }) => {
  return (
    <div
      className={cn(styles.dialogWrapper, {
        [styles.highlighted]: isHighlighted,
        [styles.enabled]: reportCount,
      })}
    >
      <div className={styles.dialogBox}>{reportCount ? reportCount : '!'}</div>
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
