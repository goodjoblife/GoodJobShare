import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import Logo from 'common/icons/logo.svg';
import styles from './Header.module.css';
import SiteMenu from './SiteMenu';

const Header = () => (
  <header className={styles.header}>
    <div className={cn(styles.inner, 'wrapperL')}>
      <Link to="/" className={styles.logo}>
        <Logo />
      </Link>
      <nav className={styles.nav}>
        <SiteMenu />
      </nav>
    </div>
  </header>
);


export default Header;
