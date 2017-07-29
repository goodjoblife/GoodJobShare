import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { Section, Wrapper, Heading, P } from 'common/base';
import CallToAction from 'common/CallToAction';
import helmetData from '../../constants/helmetData';
import styles from './About.module.css';
import Timeline from './Timeline';

const data2016 = [
  {
    month: 5,
    Content: () => <div>一群熱血的年輕人聚集在學校的系館內，討論著台灣職場環境的現狀。我們發現台灣職場資訊的不透明，決定採取行動，首先架設了「工時透明化運動」網站，讓勞工分享真實工時資訊，讓過勞的情況被看見。</div>,
  },
  {
    month: 10,
    Content: () => <div>網站改版上線，新增查詢功能。</div>,
  },
  {
    month: 12,
    Content: () => <div>推出「勞動知識小教室」系列懶人包，將複雜的法律資訊轉換成易懂的圖文。內容涵蓋勞基法、性別工作平等法、就服法以及工會相關法令等勞工必備的權益資訊，讓勞工學會保護自己。</div>,
  },
  {
    month: 12,
    Content: () => <div>申請上台大車庫補助。</div>,
  },
];

const data2017 = [
  {
    month: 1,
    Content: () => <div>申請上 g0v 2017 春季補助</div>,
  },
  {
    month: 2,
    Content: () => <div>薪資功能上線，進化為「工時薪資透明化」</div>,
  },
  {
    month: 5,
    Content: () => <div>與關鍵評論網合作，推出<a href="http://www.accupass.com/go/The_Weary_Generation">「厭世代」又怎樣？！—— 80後的職場生存攻略</a>實體活動。</div>,
  },
  {
    month: 6,
    Content: () => <div><Link to="/labor-rights">勞動知識小教室</Link>網頁版上線</div>,
  },
  {
    month: 8,
    Content: () => <div>工作經驗、面試經驗分享上線</div>,
  },
];

const About = () => (
  <Section Tag="main" pageTop>
    <Helmet {...helmetData.ABOUT} />
    <Section paddingBottom>
      <Wrapper size="m">
        <Heading size="m" marginBottomS>緣起：求職資訊不透明</Heading>
        <P size="l">
          求職的過程中，我們發現台灣職場資訊的不透明，例如：薪資總是寫著面議，工時現況不明，只能詢問學長姊以及朋友，或是網路上胡亂爬文。工時薪資之外，更多更重要的資訊，譬如公司的管理制度、團隊氣氛，求職者其實難以得知。
          <br />
          資訊不透明的結果，導致：
        </P>
        <div className={styles.beginning}>
          <div className={styles.item}>
            <P Tag="h3" size="l" bold className={styles.heading}>好工作、好公司沒有被看見</P>
            <img
              src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/about-01.png"
              alt="好工作、好公司沒有被看見"
            />
          </div>
          <div className={styles.item}>
            <P Tag="h3" size="l" bold className={styles.heading}>求職者更難找到適合自己的工作</P>
            <img
              src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/about-02.png"
              alt="求職者更難找到適合自己的工作"
            />
          </div>
        </div>
      </Wrapper>
    </Section>
    <Section bg="white" padding>
      <Wrapper size="s">
        <Heading size="sl" center marginBottomS>促進求職市場資訊透明化，讓台灣的求職者擁有更完整的資訊，進而找到適合自己的工作。</Heading>
        <P size="l" center>
          在市場機制的運作下，好的公司找到好人才；條件相對差的公司提升薪資福利，以招募更好的人才。<strong>台灣整體而言向上提升，進入正向循環。</strong>
        </P>
        <img
          src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/about-03.png"
          alt="台灣整體而言向上提升，進入正向循環"
          className={styles.about3img}
        />
      </Wrapper>
    </Section>
    <Section padding>
      <img
        src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/about-city.png"
        alt="大事紀"
        className={styles.timelineImage}
      />
      <Wrapper size="m">
        <div className={styles.timelineColWrapper}>
          <div className={styles.timelineCol}>
            <Timeline year="2016" data={data2016} />
          </div>
          <div className={styles.timelineCol}>
            <Timeline year="2017" data={data2017} />
          </div>
        </div>
      </Wrapper>
    </Section>
    <CallToAction
      bgColor="#fcd406"
      imgSrc="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/about-people.png"
      heading="台灣將會有一場改善勞動環境的革命，而這一場革命需要每一個「你」的參與。"
      headingSize="sl"
      buttonText="現在就留下資料"
    />
  </Section>
);

export default About;
