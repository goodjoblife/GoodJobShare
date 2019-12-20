import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import ReactGA from 'react-ga';
import { compose } from 'recompose';
import { Wrapper } from 'common/base';
import { GjLogo, Glike } from 'common/icons';
import PopoverToggle from 'common/PopoverToggle';
import { withPermission } from 'common/permission-context';
import styles from './Header.module.css';
import SiteMenu from './SiteMenu';
import Top from './Top';
import EmailVerificationTop from './Top/EmailVerificationTop';
import ProgressTop from './Top/ProgressTop';
import Searchbar from './Searchbar';

import authStatus from '../../../constants/authStatus';
import { shareLink } from '../../../constants/dataProgress';
import { GA_CATEGORY, GA_ACTION } from '../../../constants/gaConstants';
import emailStatusMap from '../../../constants/emailStatus';
import withModal from '../../TimeAndSalary/common/withModal';
import LoginModal from '../../common/LoginModal';

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
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.unlisten = () => {};
  }

  componentDidMount() {
    const { history } = this.props;
    this.unlisten = history.listen(this.closeNav);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.auth.get('status') !== this.props.auth.get('status') &&
      this.props.auth.get('status') === authStatus.CONNECTED
    ) {
      this.props.fetchPermission();
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
  };

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

  openLoginModal() {
    this.props.loginModal.setIsOpen(true);
  }

  closeLoginModal() {
    this.props.loginModal.setIsOpen(false);
  }

  login() {
    const { login, FB } = this.props;
    login(FB);
  }

  logout() {
    const { logout } = this.props;
    logout();
  }

  renderTop = () => {
    const {
      auth,
      location: { pathname },
    } = this.props;

    const isLogin = auth.get('status') === authStatus.CONNECTED;
    const emailStatus = auth.getIn(['user', 'email_status']);
    const isEmailVerified = emailStatus === emailStatusMap.VERIFIED;

    if (!isLogin && pathname === '/') {
      return null;
    }

    if (isLogin && !isEmailVerified) {
      return (
        <Top>
          <EmailVerificationTop
            isSentVerificationEmail={
              emailStatus === emailStatusMap.SENT_VERIFICATION_LINK
            }
          />
        </Top>
      );
    }

    return (
      <Top link={shareLink}>
        <ProgressTop />
      </Top>
    );
  };

  render() {
    return (
      <div className={styles.root}>
        {this.renderTop()}
        <header className={styles.header}>
          <Wrapper size="l" className={styles.inner}>
            <HeaderButton
              isNavOpen={this.state.isNavOpen}
              toggle={this.toggleNav}
            />
            <div className={styles.logo}>
              <Link to="/" title="GoodJob 職場透明化運動">
                <GjLogo />
              </Link>
            </div>
            <div className={styles.logoSm}>
              <Link to="/" title="GoodJob 職場透明化運動">
                <Glike />
              </Link>
            </div>
            <div className={styles.searchbarWrapper}>
              <Searchbar
                className={styles.searchbar}
                placeholder="輸入公司 or 職稱，查詢面試、薪水"
              />
            </div>
            <div className={cn(styles.searchbarWrapper, styles.mobile)}>
              <Searchbar
                className={styles.searchbar}
                placeholder="輸入公司 or 職稱查詢"
              />
            </div>
            <nav
              className={cn(styles.nav, {
                [styles.isNavOpen]: this.state.isNavOpen,
              })}
            >
              <Link
                to="/"
                className={styles.logo}
                title="GoodJob 職場透明化運動"
              >
                <GjLogo />
              </Link>
              <SiteMenu
                isLogin={this.props.auth.get('status') === authStatus.CONNECTED}
              />
              <div className={styles.buttonsArea}>
                <ShareButton onClick={this.onClickShareData} />
                <div style={{ position: 'relative' }}>
                  {this.props.auth.getIn(['user', 'name']) === null && (
                    <button
                      className={styles.loginBtn}
                      onClick={this.openLoginModal}
                    >
                      登入
                    </button>
                  )}
                  {this.props.auth.getIn(['user', 'name']) !== null && (
                    <PopoverToggle
                      popoverClassName={styles.popover}
                      popoverContent={
                        <ul className={styles.popoverItem}>
                          <li>
                            <Link to="/me">個人頁面</Link>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                this.logout();
                              }}
                            >
                              登出
                            </button>
                          </li>
                        </ul>
                      }
                    >
                      <div className={styles.userNameBtn}>
                        {this.props.auth.getIn(['user', 'name'])}
                      </div>
                    </PopoverToggle>
                  )}
                </div>
              </div>
            </nav>
          </Wrapper>
        </header>
        <LoginModal
          isOpen={this.props.loginModal.isOpen}
          close={this.closeLoginModal}
          loginModal={this.props.loginModal}
        />
      </div>
    );
  }
}

Header.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object,
  FB: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object.isRequired,
  fetchPermission: PropTypes.func.isRequired,
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
  isNavOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

const ShareButton = ({ className, onClick }) => (
  <Link
    to="/share"
    className={cn(className, styles.leaveDataBtn)}
    onClick={onClick}
  >
    立即分享
  </Link>
);
ShareButton.propTypes = {
  onClick: PropTypes.func,
};

const hoc = compose(
  withPermission,
  withModal('loginModal'),
);

export default hoc(Header);
