import React from 'react';
import { Link, browserHistory } from 'react-router';
import cn from 'classnames';
import ReactGA from 'react-ga';
import { Wrapper } from 'common/base';
import { GjLogo, ArrowGo, People, PeopleFill } from 'common/icons';
import PopoverToggle from 'common/PopoverToggle';
import styles from './Header.module.css';
import SiteMenu from './SiteMenu';
import Top from './Top';

import authStatus from '../../../constants/authStatus';
import { GA_CATEGORY, GA_ACTION } from '../../../constants/gaConstants';

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
    this.unlisten = () => {};

    const { getLoginStatus, FB, getMe } = this.props;

    getLoginStatus(FB)
      .then(() => getMe(FB))
      .catch(() => {});
  }

  componentDidMount() {
    this.unlisten = browserHistory.listen(this.closeNav);
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

  componentWillUnmount() {
    this.unlisten();
  }

  onClickShareData = () => {
    ReactGA.event({
      category: GA_CATEGORY.HEADER,
      action: GA_ACTION.CLICK_SHARE_DATA,
    });
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
      <div className={styles.root}>
        <Top />
        <header className={styles.header}>
          <Wrapper size="l" className={styles.inner}>
            <HeaderButton
              isNavOpen={this.state.isNavOpen}
              toggle={this.toggleNav}
            />
            <div className={styles.logo}>
              <Link to="/" title="GoodJob 好工作評論網">
                <GjLogo />
              </Link>
            </div>
            <ShareButton onClick={this.onClickShareData} isMobileButton />
            <nav
              className={cn(styles.nav, { [styles.isNavOpen]: this.state.isNavOpen })}
            >
              <SiteMenu isLogin={this.props.auth.get('status') === authStatus.CONNECTED} />
              <div className={styles.buttonsArea}>
                <ShareButton onClick={this.onClickShareData} />
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
      </div>
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

const ShareButton = ({ isMobileButton, onClick }) => (
  <Link
    to="/share"
    className={cn(styles.leaveDataBtn, {
      [styles.isMobileButton]: isMobileButton,
    })}
    onClick={onClick}
  >
    立即分享<ArrowGo />
  </Link>
);
ShareButton.propTypes = {
  isMobileButton: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};
ShareButton.defaultProps = {
  isMobileButton: false,
};

export default Header;
