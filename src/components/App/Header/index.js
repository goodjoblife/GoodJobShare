import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import cn from 'classnames';
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
import Bell from 'common/icons/Bell';

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

const MailboxContent = ({ messages }) => {
  return (
    <div>
      <div className={styles.popoverHeader}>
        <div className={styles.title}>通知</div>
        <div className={styles.buttons}>
          <MailboxContent.Button>全部</MailboxContent.Button>
          <MailboxContent.Button>未讀</MailboxContent.Button>
        </div>
      </div>
      <ul className={styles.popoverItem}>
        {messages.map(({ id, link, title, date, read }) => (
          <li key={id}>
            <Link to={link} className={cn({ [styles.unread]: !read })}>
              <div>{title}</div>
              <div>{date.toString()}</div>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.loadMore}>
        <MailboxContent.Button>載入更多</MailboxContent.Button>
      </div>
    </div>
  );
};

MailboxContent.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      id: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      read: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

MailboxContent.Button = props => (
  <button className={styles.button} {...props} />
);

const MailboxButton = () => {
  const [messages, setMessages] = useState([
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: false,
    },
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: false,
    },
  ]);

  const count = useMemo(
    () => messages.filter(message => !message.read).length,
    [messages],
  );

  const read = useCallback(
    () =>
      setMessages(messages =>
        messages.map(message => {
          message.read = true;
          return message;
        }),
      ),
    [],
  );

  return (
    <PopoverToggle
      className={styles.mailbox}
      data-count={count}
      popoverClassName={cn(styles.popover, styles.mailboxContainer)}
      popoverContent={<MailboxContent messages={messages} />}
    >
      {({ isOpen }) => (
        <button className={cn({ [styles.activating]: isOpen })} onClick={read}>
          <Bell />
        </button>
      )}
    </PopoverToggle>
  );
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
              <img src={GjLogo} alt="Goodjob" />
            </Link>
          </div>
          <div className={styles.logoSm}>
            <Link to="/" title="GoodJob 職場透明化運動">
              <img src={Glike} alt="Goodjob" />
            </Link>
          </div>
          <div className={styles.searchbarWrapper}>
            <Searchbar
              className={styles.searchbar}
              placeholder="搜全站薪水/面試/評價"
            />
          </div>
          <div className={cn(styles.searchbarWrapper, styles.mobile)}>
            <Searchbar
              className={styles.searchbar}
              placeholder="搜全站薪水/面試/評價"
            />
          </div>
          <nav
            className={cn(styles.nav, {
              [styles.isNavOpen]: isNavOpen,
            })}
          >
            <Link to="/" className={styles.logo} title="GoodJob 職場透明化運動">
              <img src={GjLogo} alt="Goodjob" />
            </Link>
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
              <MailboxButton />
              <div style={{ position: 'relative' }}>
                {!isLoggedIn && (
                  <button className={styles.loginBtn} onClick={login}>
                    登入
                  </button>
                )}
                {isLoggedIn && (
                  <PopoverToggle
                    popoverClassName={cn(styles.popover, styles.nameContainer)}
                    popoverContent={
                      <ul className={styles.popoverItem}>
                        <li>
                          <Link to="/me/subscriptions/current">我的方案</Link>
                        </li>
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

export default Header;
