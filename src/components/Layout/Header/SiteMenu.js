import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import styles from './SiteMenu.module.css';

const Item = ({ to, text, className }) => (
  <li className={cn(styles.menuItem, className)}>
    <Link to={to} activeClassName={styles.isCurrent}>{text}</Link>
  </li>
);
Item.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const SiteMenu = ({ isLogin }) => (
  <ul className={styles.menu}>
    <li className={styles.menuItem}>
      <a href="/time-and-salary">薪資工時</a>
    </li>
    <Item to="/experiences/search" text="面試・工作經驗" />
    <Item to="/labor-rights" text="勞動小教室" />
    {
      isLogin && (<Item to="/me" text="個人頁面" />)
    }
  </ul>
);
SiteMenu.propTypes = {
  isLogin: PropTypes.bool,
};

export default SiteMenu;
