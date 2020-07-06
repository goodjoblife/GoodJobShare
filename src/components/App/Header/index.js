import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import ReactGA from 'react-ga';
import { Wrapper } from 'common/base';
import { GjLogo, Glike } from 'common/icons';
import PopoverToggle from 'common/PopoverToggle';
import styles from './Header.module.css';
import SiteMenu from './SiteMenu';
import Top from './Top';
import EmailVerificationTop from './Top/EmailVerificationTop';
import ProgressTop from './Top/ProgressTop';
import Searchbar from './Searchbar';

import authStatus from '../../../constants/authStatus';
import { GA_CATEGORY, GA_ACTION } from '../../../constants/gaConstants';
import emailStatusMap from '../../../constants/emailStatus';
import LoginModal from '../../common/LoginModal';
import useShareLink from '../../../hooks/experiments/useShareLink';
import usePermission from '../../../hooks/usePermission';

const Header = ({ auth, logout }) => {
  const history = useHistory();
  const location = useLocation();
  const [isNavOpen, setNavOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const shareLink = useShareLink();
  const [, fetchPermission] = usePermission();

  useEffect(() => {
    if (auth.get('status') === authStatus.CONNECTED) {
      fetchPermission();
    }
  }, [auth.get('status'), fetchPermission]); // eslint-disable-line react-hooks/exhaustive-deps

  const onClickShareData = useCallback(() => {
    ReactGA.event({
      category: GA_CATEGORY.HEADER,
      action: GA_ACTION.CLICK_SHARE_DATA,
    });
  }, []);

  const toggleNav = useCallback(() => setNavOpen(!isNavOpen), [isNavOpen]);

  const closeNav = useCallback(() => setNavOpen(false), []);

  const openLoginModal = useCallback(() => setLoginModalOpen(true), []);

  const closeLoginModal = useCallback(() => setLoginModalOpen(false), []);

  useEffect(() => history.listen(closeNav), [closeNav, history]);

  const topNode = useMemo(() => {
    const isLogin = auth.get('status') === authStatus.CONNECTED;
    const emailStatus = auth.getIn(['user', 'email_status']);
    const isEmailVerified = emailStatus === emailStatusMap.VERIFIED;

    if (!isLogin && location.pathname === '/') {
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
  }, [auth, location.pathname, shareLink]);

  return (
    <div className={styles.root}>
      {topNode}
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
            <SiteMenu isLogin={auth.get('status') === authStatus.CONNECTED} />
            <div className={styles.buttonsArea}>
              <ShareButton onClick={onClickShareData} />
              <div style={{ position: 'relative' }}>
                {auth.getIn(['user', 'name']) === null && (
                  <button className={styles.loginBtn} onClick={openLoginModal}>
                    登入
                  </button>
                )}
                {auth.getIn(['user', 'name']) !== null && (
                  <PopoverToggle
                    popoverClassName={styles.popover}
                    popoverContent={
                      <ul className={styles.popoverItem}>
                        <li>
                          <Link to="/me">個人頁面</Link>
                        </li>
                        <li>
                          <button onClick={logout}>登出</button>
                        </li>
                      </ul>
                    }
                  >
                    <div className={styles.userNameBtn}>
                      {auth.getIn(['user', 'name'])}
                    </div>
                  </PopoverToggle>
                )}
              </div>
            </div>
          </nav>
        </Wrapper>
      </header>
      <LoginModal isOpen={isLoginModalOpen} close={closeLoginModal} />
    </div>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object,
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
