import React, { PropTypes } from 'react';
import cn from 'classnames';
import i from 'common/icons';
import styles from './Header.module.css';
import HeaderButton from './HeaderButton';
import SiteMenu from './SiteMenu';

const Header = ({ isNavOpen, toggleHeaderButton }) => (
  <header className={styles.header}>
    <div className={cn(styles.inner, 'wrapperL')}>
      <HeaderButton
        isNavOpen={isNavOpen}
        toggle={toggleHeaderButton}
      />
      <a href="/" className={styles.logo} title="goodjob 工時薪資透明化運動">
        <i.GjLogo />
      </a>
      <nav className={cn(styles.nav, { [styles.isNavOpen]: isNavOpen })}>
        <SiteMenu />
      </nav>
    </div>
  </header>
);

Header.propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  toggleHeaderButton: PropTypes.func.isRequired,
};

export default Header;
