import React from 'react';
import { Link } from 'react-router';
import ReactGA from 'react-ga';
import cn from 'classnames';
import { Wrapper } from 'common/base';
import i from 'common/icons';
import styles from './Header.module.css';
import SiteMenu from './SiteMenu';
import HEADER from '../../../constants/GACategories';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.login = this.login.bind(this);

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
      this.props.auth.get('status') === 'connected') {
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

  render() {
    return (
      <header className={styles.header}>
        <Wrapper size="l" className={styles.inner}>
          <HeaderButton
            isNavOpen={this.state.isNavOpen}
            toggle={this.toggleNav}
          />
          <div className={styles.logo}>
            <Link
              to="/"
              title="goodjob 工時薪資透明化運動"
              onClick={() => {
                ReactGA.event({
                  category: HEADER,
                  action: 'click-logo',
                });
                this.closeNav();
              }}
            >
              <i.GjLogo />
            </Link>
          </div>
          <nav
            className={cn(styles.nav, { [styles.isNavOpen]: this.state.isNavOpen })}
            onClick={this.closeNav}
          >
            <SiteMenu />
            <div className={styles.buttonsArea}>
              <Link
                to="/share"
                className={styles.leaveDataBtn}
                onClick={() => {
                  ReactGA.event({
                    category: HEADER,
                    action: 'click-to-share-button',
                  });
                }}
              >
                留下資料<i.ArrowGo />
              </Link>
              {
                this.props.auth.getIn(['user', 'name']) === null &&
                <button className={styles.loginBtn} onClick={this.login}>
                  <i.People />登入
                </button>
              }
              {
                this.props.auth.getIn(['user', 'name']) !== null &&
                <div className={cn(styles.loginBtn, styles.disableBtn)}>
                  <i.People />{this.props.auth.getIn(['user', 'name'])}
                </div>
              }
            </div>
          </nav>
        </Wrapper>
      </header>
    );
  }
}

Header.propTypes = {
  login: React.PropTypes.func.isRequired,
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
