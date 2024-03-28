import React, { useState, useCallback, useEffect } from 'react';
import styles from './CollapsedDrawer.module.css';
import { LS_USER_FEEDBACK_SUBMISSION_TIME_KEY } from 'constants/localStorageKey';
import cn from 'classnames';

const THIRTY_DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

const CollapsedDrawer = ({ title = '給我們回饋', children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApplyStyle, setIsApplyStyle] = useState(false);

  const handleToggleModalOpen = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  useEffect(() => {
    setIsApplyStyle(!isExpanded);
  }, [isExpanded]);

  if (typeof window !== 'undefined') {
    const lastSubmissionTime = Number(
      localStorage.getItem(LS_USER_FEEDBACK_SUBMISSION_TIME_KEY),
    );

    if (lastSubmissionTime) {
      const currentTime = new Date().getTime();
      const isWithin30Days =
        currentTime < lastSubmissionTime + THIRTY_DAYS_IN_MILLISECONDS;

      if (isWithin30Days) {
        return null;
      }
    }
  }

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { handleToggleModalOpen, isExpanded }),
  );

  if (isExpanded) return childrenWithProps;

  return (
    <div
      className={cn(styles.container, { [styles.applyStyle]: isApplyStyle })}
      onClick={handleToggleModalOpen}
    >
      <div className={styles.label}>{title}</div>
    </div>
  );
};

export default CollapsedDrawer;
