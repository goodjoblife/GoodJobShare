import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import Logo from 'common/icons/logo.svg';
import GitHub from 'common/icons/GitHub.svg';
import Facebook from 'common/icons/Facebook.svg';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={cn(styles.inner, 'wrapperL')}>
      <div className={styles.col1}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.content}>
          <p>Copyright©GoodJob.life team 2016</p>
          <p>
            <Link to="/user-term">使用者條款</Link>
            與<Link to="/privacy-policy">隱私權政策</Link>
          </p>
        </div>
      </div>
      <div className={styles.col2}>
        <div className={styles.shareButtons}>
          <a
            href="https://github.com/goodjoblife"
            className={styles.shareItem}
            title="github"
          >
            <GitHub />
          </a>
          <a
            href="https://github.com/goodjoblife"
            className={styles.shareItem}
            title="facebook"
          >
            <Facebook />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
