import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import i from 'common/icons';
import { Wrapper, P } from 'common/base';
import LinkItem from './LinkItem';
import styles from './Footer.module.css';

const link1 = [
  { to: '/time-and-salary', text: '薪資工時', anchor: true },
  { to: '/experiences/search', text: '面試・工作經驗' },
  { to: '/labor-rights', text: '勞動小教室' },
];
const link2 = [
  { to: '/', text: '發文留言規定' },
  { to: '/faq', text: '常見問題' },
  { to: '/privacy-policy', text: '隱私權政策' },
  { to: '/user-term', text: '使用者條款' },
];
const link3 = [
  { to: '/about', text: '關於我們' },
  { to: '/contact', text: '聯絡我們' },
  { to: '/recruit', text: '加入我們' },
];

const Footer = () => (
  <footer className={styles.wrapper}>
    <Wrapper size="l">
      <section className={styles.header}>
        <i.GjLogo className={styles.logo} />
        <h1>透明資訊求職平台</h1>
        <span
          className={cn('fb-like', styles.fbLike)}
          data-href="https://www.facebook.com/goodjob.life/"
          data-layout="button_count" data-action="like" data-size="small"
          data-show-faces="true" data-share="false"
        />
      </section>
      <div className={styles.body}>
        <section className={styles.links}>
          <LinkItem
            title="求職者工具"
            items={link1}
          />
          <LinkItem
            title="常見問題"
            items={link2}
          />
          <LinkItem
            title="Goodjob"
            items={link3}
          />
        </section>
        <section className={styles.medias}>
          <h4 className={styles.heading}>\ 感謝各大媒體採訪報導 /</h4>
          <Link to="/about#media"><img src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/medias.jpg" alt="cheers yahoo 蘋果日報 數位時代" /></Link>
        </section>
      </div>
    </Wrapper>
    <div className={styles.footer}>
      <Wrapper size="l" className={styles.inner}>
        <P size="s">Copyright © GoodJob.life team 2017</P>
        <div className={styles.g0v}>
          <a href="https://grants.g0v.tw/power/" alt="power by g0v">
            <img src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/logo-g0v-white.svg" alt="g0v" />
          </a>
        </div>
      </Wrapper>
    </div>
  </footer>
);

export default Footer;
