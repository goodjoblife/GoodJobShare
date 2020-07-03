import React from 'react';
import { Section, Wrapper, Heading, P } from 'common/base';
import ButtonRect from 'common/button/ButtonRect';
import styles from './LaborUnionDetail.module.css';

const LaborUnionDetail = () => {
  return (
    <Section>
      <Section>
        <Wrapper className={styles.intro}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgEO4b5dyj36gl9Rq1IHDHFfwu2GHMiF6aB6b_U9gQ_zQLujqE&usqp=CAU"
            className={styles.headingIcon}
            alt="勞權圖示"
          />
          <Heading>
            <div className={styles.heading}>台灣電子電機資訊產業公會</div>
            <div className={styles.heading}>守護科技業勞工權益的第一線</div>
          </Heading>
        </Wrapper>
      </Section>

      <Section>
        <ButtonRect btnStyle="hoverYellow" className={styles.joinBtn}>
          馬上加入
        </ButtonRect>
        <img
          src="https://s.newtalk.tw/album/news/123/5ae8067d8a13d.JPG"
          className={styles.banner}
          alt="勞權公投"
        />
      </Section>

      <Section>
        <Wrapper>
          <Heading className={styles.subHeading}>關於我們</Heading>
          <P className={styles.text}>
            電資工會於 2011
            年成立，宗旨在於維護臺灣科技業勞工的權益，與雇主進行團體協商，並進行政策的提倡。讓臺灣科技業的勞工可以活得好，做的巧，在工作與生活之間取得平衡，一起讓臺灣科技業發光發熱。
          </P>
          <Wrapper className={styles.rectangleImgs}>
            <div>
              <img
                src="https://fakeimg.pl/160/282828/EAE0D0/"
                className={styles.rectangleImg}
                alt="維護勞工權益"
              />
              <P className={styles.illustration}>維護勞工權益</P>
              <P className={styles.illustration}>休假、加班費不打折</P>
            </div>

            <div>
              <img
                src="https://fakeimg.pl/160/282828/EAE0D0/"
                className={styles.rectangleImg}
                alt="進行團體協商"
              />
              <P className={styles.illustration}>進行團體協商</P>
              <P className={styles.illustration}>爭取更好的福利</P>
            </div>

            <div>
              <img
                src="https://fakeimg.pl/160/282828/EAE0D0/"
                className={styles.rectangleImg}
                alt="政策倡議"
              />
              <P className={styles.illustration}>政策倡議</P>
              <P className={styles.illustration}>改善產業體質</P>
            </div>
          </Wrapper>
        </Wrapper>
      </Section>
      <Section className={styles.backGroundGray}>
        <Wrapper>
          <Heading className={styles.subHeading}>爭取勞工權益實績</Heading>
          <div className={styles.text}>
            <P>1. 協助會員處理勞資爭議，爭取遣散費 ○○○ 元</P>
            <P>2. 2019 年舉辦三場勞工法律講座，協助會員理解自身勞動權益</P>
            <P>3. 參與 2018 年五一勞動節大遊行</P>
          </div>
        </Wrapper>
      </Section>
      <Section>
        <Heading>test</Heading>
      </Section>
    </Section>
  );
};

export default LaborUnionDetail;
