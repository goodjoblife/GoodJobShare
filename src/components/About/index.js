import React from 'react';
import { Link } from 'react-router-dom';

import { Section, Wrapper, Heading, P } from 'common/base';
import CallToActionBanner from 'common/CallToAction/CallToActionBanner';
import Facebook from 'common/icons/Facebook';
import Email from 'common/icons/Email';
import Github from 'common/icons/Github';
import editorStyles from 'common/Editor.module.css';
import StaticHelmet from 'common/StaticHelmet';

import styles from './About.module.css';
import Timeline from './Timeline';

const data2016 = [
  {
    month: 5,
    Content: () => (
      <div>
        一群熱血的年輕人聚集在學校的系館內，討論著台灣職場環境的現狀。我們發現台灣職場資訊的不透明，決定採取行動，首先架設了「工時透明化運動」網站，讓勞工分享真實工時資訊，讓過勞的情況被看見。
      </div>
    ),
  },
  {
    month: 10,
    Content: () => <div>網站介面翻新，並改善查詢功能。</div>,
  },
  {
    month: 12,
    Content: () => (
      <div>
        推出「勞動知識小教室」系列懶人包，將複雜的法律資訊轉換成易懂的圖文。內容涵蓋勞動基準法、性別工作平等法、就業服務法以及工會相關法令等勞工必備的權益資訊，讓勞工學會保護自己。
      </div>
    ),
  },
  {
    month: 12,
    Content: () => <div>申請上台大車庫計畫。</div>,
  },
];

const data2017 = [
  {
    month: 1,
    Content: () => (
      <div>
        申請上{' '}
        <a href="https://grants.g0v.tw/power">
          2017 春季 g0v 公民科技創新獎助金
        </a>
        。
      </div>
    ),
  },
  {
    month: 2,
    Content: () => <div>薪資功能上線，進化為「工時薪資透明化」</div>,
  },
  {
    month: 5,
    Content: () => (
      <div>
        與關鍵評論網合作，舉辦
        <a href="http://www.accupass.com/go/The_Weary_Generation">
          「厭世代」又怎樣？！—— 80後的職場生存攻略
        </a>
        實體活動。
      </div>
    ),
  },
  {
    month: 6,
    Content: () => (
      <div>
        <Link to="/labor-rights">勞動知識小教室</Link>
        網頁版上線
      </div>
    ),
  },
  {
    month: 8,
    Content: () => <div>工作經驗、面試經驗分享上線</div>,
  },
];

const About = () => (
  <Section Tag="main" pageTop>
    <StaticHelmet.About />
    <Section paddingBottom>
      <Wrapper size="m">
        <Heading size="m" marginBottomS>
          緣起：求職資訊不透明
        </Heading>
        <P size="l">
          在過去求職的經驗中，我們發現台灣職場資訊的不透明。薪資總是寫著面議、實際工時不得而知，只能詢問學長姊以及朋友，或是網路上胡亂爬文。而工時薪資之外，更多重要的資訊，譬如公司的管理制度、團隊氣氛，以及該份工作可以讓員工成長的部分，求職者更是難以得知。
          <br />
          職場資訊不透明，意味著：
        </P>
        <div className={styles.beginning}>
          <div className={styles.item}>
            <P Tag="h3" size="l" bold className={styles.heading}>
              好的工作、好的公司無法真正被看見
            </P>
            <img
              src="https://image.goodjob.life/about-01.png"
              alt="好的工作、好的公司無法真正被看見"
            />
          </div>
          <div className={styles.item}>
            <P Tag="h3" size="l" bold className={styles.heading}>
              求職者更難找到適合自己的工作
            </P>
            <img
              src="https://image.goodjob.life/about-02.png"
              alt="求職者更難找到適合自己的工作"
            />
          </div>
        </div>
      </Wrapper>
    </Section>
    <Section bg="white" padding className={styles.mission}>
      <Wrapper size="s">
        <Heading size="m" center marginBottomS>
          使命：促進職場資訊透明化
        </Heading>
        <P size="l" center>
          我們相信，當職場資訊變得足夠透明，在市場機制的運作下，好的公司更容易找到好人才，變得更有競爭力；條件相對差一點的公司將會提升薪資及福利，以招募更好的人才。
          <strong>台灣的產業整體而言向上提升，進入正向循環。</strong>
        </P>
        <img
          src="https://image.goodjob.life/about-03.png"
          alt="台灣整體而言向上提升，進入正向循環"
          className={styles.missionImg}
        />
      </Wrapper>
    </Section>
    <Section padding className={styles.timelineWrapper}>
      <Heading size="l" center marginBottom>
        大事紀
      </Heading>
      <Wrapper size="m">
        <div className={styles.timelineColWrapper}>
          <div className={styles.timelineCol}>
            <Timeline year="2016" data={data2016} />
          </div>
          <div className={styles.timelineCol}>
            <Timeline year="2017" data={data2017} />
          </div>
        </div>
        <img
          src="https://image.goodjob.life/about-city.png"
          alt="大事紀"
          className={styles.timelineImage}
        />
      </Wrapper>
    </Section>
    <CallToActionBanner
      bgColor="#fcd406"
      imgSrc="https://image.goodjob.life/about-people.png"
      heading="促進職場資訊透明化，需要每一個「你」的參與！"
      headingSize="m"
      buttonText="現在就留下資料"
    />
    <Section bg="white" padding id="contact">
      <Wrapper size="m">
        <Heading size="l" center marginBottom>
          聯絡我們
        </Heading>
        <div className={styles.contact}>
          <a
            href="https://www.facebook.com/goodjob.life"
            className={styles.facebook}
            title="facebook"
          >
            <Facebook />
          </a>
          <a
            href="https://github.com/goodjoblife/GoodJobShare"
            className={styles.github}
            title="Github"
          >
            <Github />
          </a>
          <a
            href="mailto:findyourgoodjob@gmail.com"
            className={styles.email}
            title="findyourgoodjob@gmail.com"
          >
            <Email />
          </a>
        </div>
      </Wrapper>
    </Section>
    <Section padding id="joinUs">
      <Wrapper size="s">
        <Heading size="l" center marginBottom>
          加入我們
        </Heading>
        <div className={editorStyles.editor}>
          <p>若你有以下任一專長或條件，非常希望你可以加入我們：</p>
          <ul>
            <li>具備社會企業或非營利組織之創立、經營經驗者</li>
            <li>對於推動求職市場透明化、改善台灣勞動環境具有熱忱的任何人</li>
          </ul>
        </div>
      </Wrapper>
    </Section>
  </Section>
);

export default About;
