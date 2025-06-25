import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import ReactGA from 'react-ga4';
import { Wrapper } from 'common/base';
import GjLogo from 'common/icons/GjLogo.svg';
import Glike from 'common/icons/Glike.svg';
import PopoverToggle from 'common/PopoverToggle';
import useShareLink from 'hooks/experiments/useShareLink';
import usePermission from 'hooks/usePermission';
import { useAuthUser, useAuthUserEmailStatus, useIsLoggedIn } from 'hooks/auth';
import { useLogin, useLogout } from 'hooks/login';
import styles from './Header.module.css';
import SiteMenu from './SiteMenu';
import Top from './Top';
import EmailVerificationTop from './Top/EmailVerificationTop';
import ProgressTop from './Top/ProgressTop';
import Searchbar from './Searchbar';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';
import emailStatusMap from 'constants/emailStatus';
import MailboxButton from './MailboxButton';
import useMobile from 'hooks/useMobile';

const onClickShareData = () => {
  ReactGA.event({
    category: GA_CATEGORY.HEADER,
    action: GA_ACTION.CLICK_SHARE_DATA,
  });
};

const HeaderTop = () => {
  const location = useLocation();
  const emailStatus = useAuthUserEmailStatus();
  const isEmailVerified = emailStatus === emailStatusMap.VERIFIED;
  const isLoggedIn = useIsLoggedIn();
  const shareLink = useShareLink();

  return useMemo(() => {
    if (!isLoggedIn && location.pathname === '/') {
      return null;
    }

    if (isLoggedIn && !isEmailVerified) {
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
      <Top to={shareLink}>
        <ProgressTop />
      </Top>
    );
  }, [emailStatus, isEmailVerified, isLoggedIn, location.pathname, shareLink]);
};

const NameButton = () => {
  const user = useAuthUser();
  const logout = useLogout();

  return (
    <PopoverToggle
      popoverClassName={cn(styles.popover, styles.nameContainer)}
      popoverContent={
        <ul className={styles.popoverItems}>
          <li>
            <Link className={styles.popoverItem} to="/me/subscriptions/current">
              我的方案
            </Link>
          </li>
          <li>
            <Link className={styles.popoverItem} to="/me">
              管理我的資料
            </Link>
          </li>
          <li>
            <button className={styles.popoverItem} onClick={logout}>
              登出
            </button>
          </li>
        </ul>
      }
    >
      <div className={styles.userNameBtn}>{user && user.name}</div>
    </PopoverToggle>
  );
};

const Logo = ({ className, forceDesktop }) => {
  const isMobile = useMobile();
  const shouldUseMobile = !forceDesktop && isMobile;

  return (
    <Link to="/" title="GoodJob 職場透明化運動" className={className}>
      <img src={shouldUseMobile ? Glike : GjLogo} alt="Goodjob" />
    </Link>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  forceDesktop: PropTypes.bool,
};

const ResponsiveSearchbar = ({ className, inputRef }) => {
  const isMobile = useMobile();
  return (
    <div
      className={cn(
        styles.searchbarWrapper,
        { [styles.mobile]: isMobile },
        className,
      )}
    >
      <Searchbar
        className={styles.searchbar}
        placeholder="搜全站薪水/面試/評價"
        inputRef={inputRef}
      />
    </div>
  );
};

ResponsiveSearchbar.propTypes = {
  className: PropTypes.string,
  inputRef: PropTypes.any,
};

const Nav = ({ isNavOpen, isLoggedIn, login, onClickShareData }) => {
  return (
    <nav
      className={cn(styles.nav, {
        [styles.isNavOpen]: isNavOpen,
      })}
    >
      <Logo className={styles.logo} forceDesktop />
      <SiteMenu isLogin={isLoggedIn} />
      <div className={styles.buttonsArea}>
        <Link to="/plans" className={styles.plansLink}>
          解鎖方式
        </Link>
        <Link
          to="/share"
          className={styles.leaveDataBtn}
          onClick={onClickShareData}
        >
          分享經驗
        </Link>
        <div style={{ position: 'relative' }}>
          {!isLoggedIn && (
            <button className={styles.loginBtn} onClick={login}>
              登入
            </button>
          )}
          {isLoggedIn && (
            <div className={styles.loggedInButton}>
              <MailboxButton />
              <NameButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  onClickShareData: PropTypes.func.isRequired,
};

const Header = ({ searchInputRef }) => {
  const history = useHistory();
  const [isNavOpen, setNavOpen] = useState(false);
  const [isLoggedIn, login] = useLogin();
  const [, fetchPermission] = usePermission();

  useEffect(() => {
    if (isLoggedIn) {
      fetchPermission();
    }
  }, [isLoggedIn, fetchPermission]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleNav = useCallback(() => setNavOpen(!isNavOpen), [isNavOpen]);

  const closeNav = useCallback(() => setNavOpen(false), []);

  useEffect(() => history.listen(closeNav), [closeNav, history]);

  return (
    <div className={styles.root}>
      <HeaderTop />
      <header className={styles.header}>
        <Wrapper size="l" className={styles.inner}>
          <HamburgerButton isNavOpen={isNavOpen} toggle={toggleNav} />
          <Logo className={styles.logo} />
          <ResponsiveSearchbar inputRef={searchInputRef} />
          <Nav
            isNavOpen={isNavOpen}
            isLoggedIn={isLoggedIn}
            login={login}
            onClickShareData={onClickShareData}
          />
        </Wrapper>
      </header>
    </div>
  );
};

const HamburgerButton = ({ isNavOpen, toggle }) => (
  <div
    className={cn(styles.mHeaderButton, { [styles.isNavOpen]: isNavOpen })}
    onClick={toggle}
  >
    <span />
  </div>
);

HamburgerButton.propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

Header.propTypes = {
  searchInputRef: PropTypes.any,
};

export default Header;
