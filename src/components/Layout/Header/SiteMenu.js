import React from 'react';
import PropTypes from 'prop-types';
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

const SiteMenu = () => (
  <ul className={styles.menu}>
    <Item to="/time-and-salary" text="薪資工時" onClick={() => { onSendGA(GA_ACTION.CLICK_TIME_AND_SALARY); }} />
    <Item to="/experiences/search" text="面試・工作經驗" onClick={() => { onSendGA(GA_ACTION.CLICK_EXPERIENCE_SEARCH); }} />
    <Item to="/labor-rights" text="勞動小教室" onClick={() => { onSendGA(GA_ACTION.CLICK_LABOR_RIGHTS); }} />
    <li className={cn(styles.menuItem, '')}>
      <a href="//media.goodjob.life" title="部落格">百工寫真</a>
    </li>
  </ul>
);

export default SiteMenu;
