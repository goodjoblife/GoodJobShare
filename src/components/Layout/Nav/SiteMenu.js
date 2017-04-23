import React from 'react';
import { Link } from 'react-router';
import styles from './SiteMenu.module.css';

const SiteMenu = () => (
  <ul className={styles.menu}>
    <li className={styles.menuItem}>
      <Link to="/">薪資工時</Link>
    </li>
    <li className={styles.menuItem}>
      <Link to="/experiences/search">面試‧工作經驗</Link>
    </li>
    <li className={styles.menuItem}>
      <Link to="/labor-rights">勞動小教室</Link>
    </li>
  </ul>
);

export default SiteMenu;
