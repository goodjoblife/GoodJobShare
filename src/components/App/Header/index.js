import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import ReactGA from 'react-ga';
import { Wrapper } from 'common/base';
import { GjLogo, Glike } from 'common/icons';
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
import { GA_CATEGORY, GA_ACTION } from '../../../constants/gaConstants';
import emailStatusMap from '../../../constants/emailStatus';

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

const Header = () => {
  const history = useHistory();
  const [isNavOpen, setNavOpen] = useState(false);
  const [isLoggedIn, login] = useLogin();
  const [, fetchPermission] = usePermission();
  const user = useAuthUser();
  const logout = useLogout();

  useEffect(() => {
    if (isLoggedIn) {
      fetchPermission();
    }
  }, [isLoggedIn, fetchPermission]); // eslint-disable-line react-hooks/exhaustive-deps

  const onClickShareData = useCallback(() => {
    ReactGA.event({
      category: GA_CATEGORY.HEADER,
      action: GA_ACTION.CLICK_SHARE_DATA,
    });
  }, []);

  const toggleNav = useCallback(() => setNavOpen(!isNavOpen), [isNavOpen]);

  const closeNav = useCallback(() => setNavOpen(false), []);

  useEffect(() => history.listen(closeNav), [closeNav, history]);

  return (
    <div className={styles.root}>
      <HeaderTop />
      <header className={styles.header}>
        <Wrapper size="l" className={styles.inner}>
          <HeaderButton isNavOpen={isNavOpen} toggle={toggleNav} />
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
              [styles.isNavOpen]: isNavOpen,
            })}
          >
            <Link to="/" className={styles.logo} title="GoodJob 職場透明化運動">
              <GjLogo />
            </Link>
            <SiteMenu isLogin={isLoggedIn} />
            <div className={styles.buttonsArea}>
              <ShareButton onClick={onClickShareData} />
              <div style={{ position: 'relative' }}>
                {!isLoggedIn && (
                  <button className={styles.loginBtn} onClick={login}>
                    登入
                  </button>
                )}
                {isLoggedIn && (
                  <PopoverToggle
                    popoverClassName={styles.popover}
                    popoverContent={
                      <ul className={styles.popoverItem}>
                        <li>
                          <Link to="/me">管理我的資料</Link>
                        </li>
                        <li>
                          <button onClick={logout}>登出</button>
                        </li>
                      </ul>
                    }
                  >
                    <div className={styles.userNameBtn}>
                      {user && user.name}
                    </div>
                  </PopoverToggle>
                )}
              </div>
            </div>
          </nav>
        </Wrapper>
      </header>
    </div>
  );
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

export default Header;
