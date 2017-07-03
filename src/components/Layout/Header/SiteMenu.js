import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import ReactGA from 'react-ga';
import HEADER from '../../../constants/GACategories';
import styles from './SiteMenu.module.css';

const Item = ({ to, text, className, onClick }) => (
  <li className={cn(styles.menuItem, className)}>
    <Link to={to} activeClassName={styles.isCurrent} onClick={onClick}>{text}</Link>
  </li>
);
Item.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const SiteMenu = () => (
  <ul className={styles.menu}>
    <li className={styles.menuItem}>
      <a
        href="/time-and-salary"
        onClick={() => {
          ReactGA.event({
            category: HEADER,
            action: 'click-time-and-salary',
          });
        }}
      >薪資工時
      </a>
    </li>
    <Item
      to="/experiences/search"
      text="面試・工作經驗"
      onClick={() => {
        ReactGA.event({
          category: HEADER,
          action: 'click-experiences-search',
        });
      }}
    />
    <Item
      to="/labor-rights"
      text="勞動小教室"
      onClick={() => {
        ReactGA.event({
          category: HEADER,
          action: 'click-labor-rights',
        });
      }}
    />
  </ul>
);

export default SiteMenu;
