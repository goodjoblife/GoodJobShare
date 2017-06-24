import React from 'react';
import cn from 'classnames';
import i from 'common/icons';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={cn(styles.inner, 'wrapperL')}>
      <div className={styles.col1}>
        <div className={styles.logo}>
          <i.GjLogo />
        </div>
        <div className={styles.content}>
          <p>Copyright©GoodJob.life team 2016</p>
          <p>
            <a href="/user-term">使用者條款</a>
            與<a href="/privacy-policy">隱私權政策</a>
          </p>
        </div>
        <div className={styles.g0v}>
          <a href="https://grants.g0v.tw/power/" alt="power by g0v">
            <img src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/logo-g0v.svg" alt="g0v" />
          </a>
        </div>
      </div>
      <div className={styles.col2}>
        <div className={styles.shareButtons}>
          <a
            href="https://github.com/goodjoblife"
            className={styles.shareItem}
            title="github"
          >
            <i.Github />
          </a>
          <a
            href="https://www.facebook.com/goodjob.life"
            className={styles.shareItem}
            title="facebook"
          >
            <i.Facebook />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
