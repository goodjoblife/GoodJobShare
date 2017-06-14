import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import { Wrapper } from 'common/base';
import i from 'common/icons';
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
    this.login = this.login.bind(this);

    const { getLoginStatus, FB } = this.props;

    getLoginStatus(FB)
      .catch(() => {});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.FB !== this.props.FB) {
      // FB instance changed
      const { getLoginStatus, FB } = this.props;

      getLoginStatus(FB)
        .catch(() => {});
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
              {
                this.props.auth.getIn(['user', 'name']) === null &&
                <div className={styles.leaveDataBtn} onClick={this.login}>
                  <div>登入<i.User /></div>
                </div>
              }

              <Link to="/share" className={styles.leaveDataBtn}>
                留下資料<i.ArrowGo />
              </Link>
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
