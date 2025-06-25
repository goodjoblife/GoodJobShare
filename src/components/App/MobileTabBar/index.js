import React, { useMemo } from 'react';
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
  const tabs = useMemo(
    () => [
      { path: '/notifications', label: '通知', Icon: Bell, onClick: null },
      { path: '/share', label: '分享', Icon: ShareButton, onClick: null },
      {
        path: '/search',
        label: '搜尋',
        Icon: Magnifiner,
        onClick: e => {
          e.preventDefault();
          focusSearch();
        },
      },
    ],
    [focusSearch],
  );

  return (
    <nav className={styles.tabBar}>
      {tabs.map(({ path, label, Icon, onClick }) => (
        <Link key={path} to={path} className={styles.tabItem} onClick={onClick}>
          <Icon className={styles.icon} />
          <span className={styles.label}>{label}</span>
        </Link>
      ))}
    </nav>
  );
};

MobileTabBar.propTypes = {
  focusSearch: PropTypes.func.isRequired,
};

export default MobileTabBar;
