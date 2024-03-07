import React, { useState, Fragment, useCallback } from 'react';
import styles from './CollapsedDrawer.module.css';

const CollapsedDrawer = ({ title = '給我們回饋', children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleModalOpen = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { handleToggleModalOpen }),
  );

  if (isExpanded) return <Fragment>{childrenWithProps}</Fragment>;

  return (
    <div className={styles.container} onClick={handleToggleModalOpen}>
      <div className={styles.label}>{title}</div>
    </div>
  );
};

export default CollapsedDrawer;
