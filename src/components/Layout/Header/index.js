import React from 'react';
import cn from 'classnames';
import i from 'common/icons';
import styles from './Header.module.css';
import HeaderButton from './HeaderButton';
import SiteMenu from './SiteMenu';

const Header = () => (
  <header className={styles.header}>
    <div className={cn(styles.inner, 'wrapperL')}>
      <HeaderButton />
      <a href="/" className={styles.logo} title="goodjob 工時薪資透明化運動">
        <i.GjLogo />
      </a>
      <nav className={styles.nav}>
        <SiteMenu />
      </nav>
    </div>
  </header>
);


export default Header;
