import React from 'react';
import cn from 'classnames';
import i from 'common/icons';
import FacebookProvider from 'common/FacebookProvider';
import styles from './Header.module.css';
import SiteMenu from './SiteMenu';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.facebookReady = this.facebookReady.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  closeNav() {
    this.setState({
      isNavOpen: false,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  facebookReady(FB) {
    FB.getLoginStatus(response => {
      console.log(response);
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
          <div className={styles.logo}>
            <a href="/" title="goodjob 工時薪資透明化運動">
              <i.GjLogo />
            </a>
          </div>
          <nav
            className={cn(styles.nav, { [styles.isNavOpen]: this.state.isNavOpen })}
            onClick={this.closeNav}
          >
            <SiteMenu />
          </nav>
          <FacebookProvider appId="1750608541889151" onReady={this.facebookReady} />
        </div>
      </header>
    );
  }
}

const HeaderButton = ({ isNavOpen, toggle }) => (
  <div
    className={cn(styles.mHeaderButton, { [styles.isNavOpen]: isNavOpen })}
    onClick={toggle}
  >
    <span />
  </div>
);

HeaderButton.propTypes = {
  isNavOpen: React.PropTypes.bool.isRequired,
  toggle: React.PropTypes.func.isRequired,
};

export default Header;
