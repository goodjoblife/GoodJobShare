import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import { Wrapper } from 'common/base';
import { GjLogo, ArrowGo, People, PeopleFill } from 'common/icons';
import PopoverToggle from 'common/PopoverToggle';
import styles from './Header.module.css';
import SiteMenu from './SiteMenu';

import authStatus from '../../../constants/authStatus';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    const { getLoginStatus, FB, getMe } = this.props;

    getLoginStatus(FB)
      .then(() => getMe(FB))
      .catch(() => {});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.FB !== this.props.FB) {
      // FB instance changed
      const { getLoginStatus, FB } = this.props;

      getLoginStatus(FB)
        .catch(() => {});
    }

    if (prevProps.auth.get('status') !== this.props.auth.get('status') &&
      this.props.auth.get('status') === authStatus.CONNECTED) {
      const { getMe, FB } = this.props;
      getMe(FB).catch(() => {});
    }
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

  login() {
    const { login, FB } = this.props;
    login(FB)
      .catch(() => {});
  }

  logout() {
    const { logout, FB } = this.props;
    logout(FB)
      .catch(() => {});
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
            <Link to="/" title="GoodJob 好工作評論網" onClick={this.closeNav}>
              <GjLogo />
            </Link>
          </div>
          <nav
            className={cn(styles.nav, { [styles.isNavOpen]: this.state.isNavOpen })}
            onClick={this.closeNav}
          >
            <SiteMenu isLogin={this.props.auth.get('status') === authStatus.CONNECTED} />
            <div className={styles.buttonsArea}>
              <Link to="/share" className={styles.leaveDataBtn}>
                留下資料<ArrowGo />
              </Link>
              <div style={{ position: 'relative' }}>
                {
                  this.props.auth.getIn(['user', 'name']) === null &&
                  <button className={styles.loginBtn} onClick={this.login}>
                    <People />登入
                  </button>
                }
                {
                  this.props.auth.getIn(['user', 'name']) !== null &&
                  <PopoverToggle
                    popoverClassName={styles.popover}
                    popoverContent={(
                      <ul className={styles.popoverItem}>
                        <li><Link to="/me">個人頁面</Link></li>
                        <li><button onClick={() => { this.logout(); }}>登出</button></li>
                      </ul>
                    )}
                  >
                    <div className={styles.loginBtn}>
                      <PeopleFill />{this.props.auth.getIn(['user', 'name'])}
                    </div>
                  </PopoverToggle>
                }
              </div>
            </div>
          </nav>
        </Wrapper>
      </header>
    );
  }
}

Header.propTypes = {
  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  getLoginStatus: React.PropTypes.func.isRequired,
  getMe: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object,
  FB: React.PropTypes.object,
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
