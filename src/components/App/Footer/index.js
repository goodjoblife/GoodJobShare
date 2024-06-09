import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import GjLogo from 'common/icons/GjLogo.svg';
import { Wrapper, P } from 'common/base';
import LinkItem from './LinkItem';
import styles from './Footer.module.css';
import MediasImg from './medias.jpg';
import LogoG0vImg from './logo-g0v-white.svg';
import { openModal } from 'actions/questionnaireExpandedModal';
import { LS_USER_FEEDBACK_SUBMISSION_TIME_KEY } from 'constants/localStorageKey';

const link1 = [
  { to: '/experiences/search', text: '職場經驗' },
  { to: '/labor-rights', text: '勞工法令懶人包' },
  { to: 'https://media.goodjob.life', text: '部落格' },
];
const link2 = [
  { to: '/faq', text: '常見問答' },
  { to: '/guidelines', text: '發文留言規則' },
  { to: '/privacy-policy', text: '隱私權政策' },
  { to: '/user-terms', text: '使用者條款' },
  { to: '/product-and-refund', text: '商品與退款政策' },
];
const link3 = [
  { to: '/about', text: '關於我們' },
  { to: '/about#contact', text: '聯絡我們' },
  { to: '/about#joinUs', text: '加入我們' },
  {
    to: ({ dispatch }) => {
      localStorage.removeItem(LS_USER_FEEDBACK_SUBMISSION_TIME_KEY);
      dispatch(openModal());
    },
    text: '給我們回饋',
  },
];

const Footer = () => (
  <footer className={styles.wrapper}>
    <section className={styles.header}>
      <Wrapper size="l" className={styles.inner}>
        <img src={GjLogo} className={styles.logo} alt="GoodJob" />
        <h1 className={styles.heading}>職場透明化運動</h1>
        <h5 className={styles.subheading}>
          —— 共享薪水、面試情報，求職不再面議！
        </h5>
        <span
          className={cn('fb-like', styles.fbLike)}
          data-href="https://www.facebook.com/goodjob.life/"
          data-layout="button_count"
          data-action="like"
          data-size="small"
          data-show-faces="true"
          data-share="false"
        />
      </Wrapper>
    </section>
    <Wrapper size="l" tag="section" className={styles.body}>
      <section className={styles.links}>
        <LinkItem title="求職者工具" items={link1} />
        <LinkItem title="常見問答" items={link2} />
        <LinkItem title="GoodJob" items={link3} />
      </section>
      <section className={styles.medias}>
        <h4 className={styles.heading}>\ 感謝各大媒體採訪報導 /</h4>
        <Link to="/about">
          <img src={MediasImg} alt="cheers yahoo 蘋果日報 數位時代" />
        </Link>
      </section>
    </Wrapper>
    <div className={styles.footer}>
      <Wrapper size="l" className={styles.inner}>
        <P size="s">Copyright © GoodJob.life team 2024</P>
        <P size="s" style={{ paddingLeft: '10px' }}>
          網站負責人：陳韋銘 findyourgoodjob@gmail.com
        </P>
        <div className={styles.g0v}>
          <a href="https://grants.g0v.tw/power/" alt="power by g0v">
            <img src={LogoG0vImg} alt="g0v" />
          </a>
        </div>
      </Wrapper>
    </div>
  </footer>
);

export default Footer;
