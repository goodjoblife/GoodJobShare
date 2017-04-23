import React from 'react';
import { Link } from 'react-router';
import Logo from 'common/icons/logo.svg';
import styles from './Footer.module.css';


const Footer = () => (
  <footer className={styles.footer}>
    <Link to="/">
      <Logo className={styles.footer_logo} />
    </Link>
    <div className={styles.footer_container}>
      <div className={styles.copyright}>
        <p>Copyright©GoodJob.life team 2016</p>
        <p>使用者條款與隱私權政策 Emoji provided free by EmojiOne</p>
      </div>
      <div className={styles.emoji}>
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
    </div>
  </footer>
);


export default Footer;
