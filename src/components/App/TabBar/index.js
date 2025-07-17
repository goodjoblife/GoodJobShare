import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './TabBar.module.css';
import inboxIconStyles from '../Header/InboxIcon.module.css';
import Magnifiner from 'common/icons/Magnifiner';
import PlusCircle from 'common/icons/PlusCircle';
import InboxIcon from '../Header/InboxIcon';

const ShareButton = ({ className, ...props }) => {
  return <PlusCircle className={cn(styles.share, className)} {...props} />;
};

ShareButton.propTypes = {
  className: PropTypes.string,
};

const TabBar = ({ focusSearch, className }) => {
  const search = useCallback(() => {
    focusSearch();
  }, [focusSearch]);

  return (
    <nav className={cn(styles.tabBar, className)}>
      <Link to="/inbox" className={styles.tabItem}>
        <InboxIcon className={inboxIconStyles.tabBarIcon} />
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

TabBar.propTypes = {
  className: PropTypes.string,
  focusSearch: PropTypes.func.isRequired,
};

export default TabBar;
