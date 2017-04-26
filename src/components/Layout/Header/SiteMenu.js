import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './SiteMenu.module.css';

const Item = ({ to, text }) => (
  <li className={styles.menuItem}>
    <Link to={to}>{text}</Link>
  </li>
);
Item.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const SiteMenu = () => (
  <ul className={styles.menu}>
    <Item to="/" text="薪資工時" />
    <Item to="/experiences/search" text="面試‧工作經驗" />
    <Item to="/labor-rights" text="勞動小教室" />
  </ul>
);

export default SiteMenu;
