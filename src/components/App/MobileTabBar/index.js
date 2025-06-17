import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './MobileTabBar.module.css';
import Bell from 'common/icons/Bell';
import Magnifiner from 'common/icons/Magnifiner';
import PlusCircle from 'common/icons/PlusCircle';

const MobileTabBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { path: '/notifications', label: '通知', Icon: Bell },
    { path: '/share', label: '分享', Icon: PlusCircle },
    { path: '/search', label: '搜尋', Icon: Magnifiner },
  ];

  return (
    <nav className={styles.tabBar}>
      {tabs.map(({ path, label, Icon }) => (
        <Link
          key={path}
          to={path}
          className={cn(styles.tabItem, {
            [styles.active]: currentPath === path,
          })}
        >
          <Icon className={styles.icon} />
          <span className={styles.label}>{label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileTabBar;
