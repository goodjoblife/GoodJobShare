import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import { Wrapper } from 'common/base';
import i from 'common/icons';
import FacebookProvider from 'common/FacebookProvider';
import styles from './Header.module.css';
import SiteMenu from './SiteMenu';
import { FACEBOOK_APP_ID } from '../../../config';

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
      if (response.status === 'connected') {
        this.props.setLogin(response.status, response.authResponse.accessToken);
      } else if (response.status === 'not_authorized') {
        this.props.setLogin(response.status);
      }
    });
  }

  render() {
    return (
      <header className={styles.header}>
        <Wrapper size="l" className={styles.inner}>
          <HeaderButton
            isNavOpen={this.state.isNavOpen}
            toggle={this.toggleNav}
          />
          <div className={styles.logo}>
            <Link to="/" title="goodjob 工時薪資透明化運動" onClick={this.closeNav}>
              <i.GjLogo />
            </Link>
          </div>
          <nav
            className={cn(styles.nav, { [styles.isNavOpen]: this.state.isNavOpen })}
            onClick={this.closeNav}
          >
            <SiteMenu />
            <div className={styles.buttonsArea}>
              <Link to="/share" className={styles.leaveDataBtn}>
                留下資料<i.ArrowGo />
              </Link>
            </div>
          </nav>
          <FacebookProvider appId={FACEBOOK_APP_ID} onReady={this.facebookReady} />
        </Wrapper>
      </header>
    );
  }
}

Header.propTypes = {
  setLogin: React.PropTypes.func.isRequired,
};

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
