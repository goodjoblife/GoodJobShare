import React from 'react';
import { Section, P } from 'common/base';
import styles from './About.module.css';

const About = () => (
  <Section paddingBottom>
    <img
      className={styles.image}
      src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/labor-rights-about.png"
      alt="勞動知識小教室"
    />
    <P size="l" className={styles.wrapper}>
      GoodJob 團隊看見勞工們的需要，自 2016 年底推出【勞動知識小教室】系列懶人包，將複雜的法律資訊轉換成易懂的圖文，讓勞工認識自己的權益，學會保護自己。內容涵蓋勞基法、性別工作平等法、就服法以及工會相關法令等勞工必備的權益資訊。
      <br /><br />
      內容皆為創用 CC 授權，歡迎分享、散佈，但需標明出處。
      <img
        className={styles.cc}
        src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/logo-cc.svg"
        alt="cc"
      />
    </P>
  </Section>
);

export default About;
