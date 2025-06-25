import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './MobileTabBar.module.css';
import Bell from 'common/icons/Bell';
import Magnifiner from 'common/icons/Magnifiner';
import PlusCircle from 'common/icons/PlusCircle';

const ShareButton = ({ className, ...props }) => {
  return <PlusCircle className={cn(styles.share, className)} {...props} />;
};

ShareButton.propTypes = {
  className: PropTypes.string,
};

const MobileTabBar = ({ focusSearch }) => {
  const search = useCallback(() => {
    focusSearch();
  }, [focusSearch]);

  return (
    <nav className={styles.tabBar}>
      <Link to="/notifications" className={styles.tabItem}>
        <Bell className={styles.icon} />
        <span className={styles.label}>通知</span>
      </Link>
      <Link to="/share" className={styles.tabItem}>
        <ShareButton className={styles.icon} />
        <span className={styles.label}>分享</span>
      </Link>
      <button to="/search" className={styles.tabItem} onClick={search}>
        <Magnifiner className={styles.icon} />
        <span className={styles.label}>搜尋</span>
      </button>
    </nav>
  );
};

MobileTabBar.propTypes = {
  focusSearch: PropTypes.func.isRequired,
};

export default MobileTabBar;
