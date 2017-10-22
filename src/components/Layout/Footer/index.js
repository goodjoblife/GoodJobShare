import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import i from 'common/icons';
import { Wrapper, P } from 'common/base';
import LinkItem from './LinkItem';
import styles from './Footer.module.css';

const link1 = [
  { to: '/time-and-salary', text: '薪資工時' },
  { to: '/experiences/search', text: '面試・工作經驗' },
  { to: '/labor-rights', text: '勞動小教室' },
];
const link2 = [
  { to: '/faq', text: '常見問答' },
  { to: '/guidelines', text: '發文留言規則' },
  { to: '/privacy-policy', text: '隱私權政策' },
  { to: '/user-terms', text: '使用者條款' },
];
const link3 = [
  { to: '/about', text: '關於我們' },
  { to: '/about#contact', text: '聯絡我們' },
  { to: '/about#joinUs', text: '加入我們' },
];

const Footer = () => (
  <footer className={styles.wrapper}>
    <section className={styles.header}>
      <Wrapper size="l" className={styles.inner}>
        <i.GjLogo className={styles.logo} />
        <h1 className={styles.heading}>好工作評論網</h1>
        <h5 className={styles.subheading}>—— 讓我們一起定義心中的理想工作</h5>
        <span
          className={cn('fb-like', styles.fbLike)}
          data-href="https://www.facebook.com/goodjob.life/"
          data-layout="button_count" data-action="like" data-size="small"
          data-show-faces="true" data-share="false"
        />
      </Wrapper>
    </section>
    <Wrapper size="l" tag="section" className={styles.body}>
      <section className={styles.links}>
        <LinkItem
          title="求職者工具"
          items={link1}
        />
        <LinkItem
          title="常見問答"
          items={link2}
        />
        <LinkItem
          title="GoodJob"
          items={link3}
        />
      </section>
      <section className={styles.medias}>
        <h4 className={styles.heading}>\ 感謝各大媒體採訪報導 /</h4>
        <Link to="/about"><img src="https://image.goodjob.life/medias.jpg" alt="cheers yahoo 蘋果日報 數位時代" /></Link>
      </section>
    </Wrapper>
    <div className={styles.footer}>
      <Wrapper size="l" className={styles.inner}>
        <P size="s">Copyright © GoodJob.life team 2017</P>
        <div className={styles.g0v}>
          <a href="https://grants.g0v.tw/power/" alt="power by g0v">
            <img src="https://image.goodjob.life/logo-g0v-white.svg" alt="g0v" />
          </a>
        </div>
      </Wrapper>
    </div>
  </footer>
);

export default Footer;
