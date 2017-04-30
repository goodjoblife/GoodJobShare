import React from 'react';
import cn from 'classnames';
import i from 'common/icons';
import styles from './Header.module.css';
import SiteMenu from './SiteMenu';

const Header = () => (
  <header className={styles.header}>
    <div className={cn(styles.inner, 'wrapperL')}>
      <a to="/" className={styles.logo}>
        <i.GjLogo />
      </a>
      <nav className={styles.nav}>
        <SiteMenu />
      </nav>
    </div>
  </header>
);


export default Header;
