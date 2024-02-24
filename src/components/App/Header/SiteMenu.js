import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './SiteMenu.module.css';

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

const SiteMenu = () => (
  <ul className={styles.menu}>
    <Item to="/about" text="認識我們" />
  </ul>
);

export default SiteMenu;
