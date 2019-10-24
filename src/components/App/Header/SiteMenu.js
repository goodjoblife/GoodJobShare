import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import ReactGA from 'react-ga';
import styles from './SiteMenu.module.css';
import { GA_CATEGORY, GA_ACTION } from '../../../constants/gaConstants';

const Item = ({ to, text, className, onClick }) => (
  <li className={cn(styles.menuItem, className)}>
    <NavLink to={to} activeClassName={styles.isCurrent} onClick={onClick}>
      {text}
    </NavLink>
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
    <Item
      to="/labor-rights"
      text="職場生存錦囊"
      onClick={() => {
        onSendGA(GA_ACTION.CLICK_LABOR_RIGHTS);
      }}
    />
    <li className={cn(styles.menuItem, '')}>
      <a href="//media.goodjob.life" title="部落格">
        百工寫真
      </a>
    </li>
    <Item to="/about" text="認識我們" />
  </ul>
);

export default SiteMenu;
