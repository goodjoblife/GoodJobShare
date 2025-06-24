import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './MobileTabBar.module.css';
import Bell from 'common/icons/Bell';
import Magnifiner from 'common/icons/Magnifiner';
import PlusCircle from 'common/icons/PlusCircle';

const MobileTabBar = ({ focusSearch }) => {
  const tabs = [
    { path: '/notifications', label: '通知', Icon: Bell },
    { path: '/share', label: '分享', Icon: PlusCircle },
    { path: '/search', label: '搜尋', Icon: Magnifiner },
  ];

  const handleTabClick = useCallback(
    path => e => {
      if (path === '/search') {
        e.preventDefault();
        focusSearch();
      }
    },
    [focusSearch],
  );

  return (
    <nav className={styles.tabBar}>
      {tabs.map(({ path, label, Icon }) => (
        <Link
          key={path}
          to={path}
          className={styles.tabItem}
          onClick={e => handleTabClick(path)(e)}
        >
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
