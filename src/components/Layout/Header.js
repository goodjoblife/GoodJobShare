import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

import Logo from '../images/logo.svg';
import styles from './Header.module.css';


const Header = () => (
  <header className={styles.wrapper}>
    <div className={cn(styles.inner, 'wrapperL')}>
      <Link to="/">
        <Logo className={styles.logo} />
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li className={styles.navItem}>
            <Link to="/">薪資工時</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/">面試經驗</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/">工作經驗</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/">勞動小教室</Link>
          </li>
        </ul>
        <div className={styles.buttonArea}>
          <button className={styles.leaveDataBtn}>留下資料</button>
          <button className={styles.loginBtn}>登入</button>
        </div>
      </nav>
    </div>
  </header>
);


export default Header;
