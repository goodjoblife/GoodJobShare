import React from 'react';
import cn from 'classnames';
import styles from './TimeSalaryForm.module.css';

const Hint = ({ hint, showWarning }) => {
  if (hint === null) {
    return null;
  } else if (showWarning) {
    return (
      <div className={cn([styles.warning__wording, styles.salaryHint])}>
        {hint}
        ，確定嗎？
      </div>
    );
  }
  return <div className={cn(styles.salaryHint)}>{hint}</div>;
};

export default Hint;
