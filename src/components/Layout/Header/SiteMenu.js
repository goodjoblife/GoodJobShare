import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import ReactGA from 'react-ga';
import styles from './SiteMenu.module.css';
import { GA_CATEGORY, GA_ACTION } from '../../../constants/gaConstants';

const Item = ({ to, text, className, onClick }) => (
  <li className={cn(styles.menuItem, className)}>
    <Link to={to} activeClassName={styles.isCurrent} onClick={onClick} >{text}</Link>
  </li>
);
Item.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const onSendGA = action => {
  ReactGA.event({
    category: GA_CATEGORY.HEADER,
    action,
  });
};

const SiteMenu = ({ isLogin }) => (
  <ul className={styles.menu}>
    <li className={styles.menuItem}>
      <a href="/time-and-salary" onClick={() => { onSendGA(GA_ACTION.CLICK_TIME_AND_SALARY); }} >薪資工時</a>
    </li>
    <Item to="/experiences/search" text="面試・工作經驗" onClick={() => { onSendGA(GA_ACTION.CLICK_EXPERIENCE_SEARCH); }} />
    <Item to="/labor-rights" text="勞動小教室" onClick={() => { onSendGA(GA_ACTION.CLICK_LABOR_RIGHTS); }} />
    {
      isLogin && (<Item to="/me" text="個人頁面" />)
    }
  </ul>
);
SiteMenu.propTypes = {
  isLogin: PropTypes.bool,
};

export default SiteMenu;
