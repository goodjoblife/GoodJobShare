import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

import Logo from '../images/logo.svg';
import styles from './Header.module.css';


const Header = () => (
  <header className={cn(styles.headerWrapper, styles.wrapper_l)}>
    <Link to="/">
      <Logo className={styles.header_logo} />
    </Link>
    <nav className={styles.header_nav}>
      <ul>
        <li className={styles.site_menu_item}>
          <Link to="/">薪資工時</Link>
        </li>
        <li className={styles.site_menu_item}>
          <Link to="/">面試經驗</Link>
        </li>
        <li className={styles.site_menu_item}>
          <Link to="/">工作經驗</Link>
        </li>
        <li className={styles.site_menu_item}>
          <Link to="/">勞動小教室</Link>
        </li>
      </ul>
      <div className={styles.button_area}>
        <button className={styles.leave_data_btn}>留下資料</button>
        <button className={styles.login_btn}>登入</button>
      </div>
    </nav>
  </header>
);


export default Header;
