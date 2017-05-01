import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './SiteMenu.module.css';

const Item = ({ to, text }) => (
  <li className={styles.menuItem}>
    <a href={to}>{text}</a>
  </li>
);
Item.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const SiteMenu = () => (
  <ul className={styles.menu}>
    <Item to="/#section-form" text="開始參與" />
    <Item to="/show" text="查看薪時" />
    <Item to="/#section-faq" text="常見問答" />
    <Item to="/about" text="關於我們" />
    <li className={styles.menuItem}>
      <Link to="/labor-rights">勞動小教室</Link>
    </li>
  </ul>
);

export default SiteMenu;
