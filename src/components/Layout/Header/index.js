import React, { PropTypes } from 'react';
import cn from 'classnames';
import i from 'common/icons';
import styles from './Header.module.css';
import HeaderButton from './HeaderButton';
import SiteMenu from './SiteMenu';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  render() {
    return (
      <header className={styles.header}>
        <div className={cn(styles.inner, 'wrapperL')}>
          <HeaderButton
            isNavOpen={this.state.isNavOpen}
            toggle={this.toggleNav}
          />
          <a href="/" className={styles.logo} title="goodjob 工時薪資透明化運動">
            <i.GjLogo />
          </a>
          <nav className={cn(styles.nav, { [styles.isNavOpen]: this.state.isNavOpen })}>
            <SiteMenu />
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  toggleHeaderButton: PropTypes.func.isRequired,
};

export default Header;
