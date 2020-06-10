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
              <P>維護勞工權益</P>
              <P>休假、加班費不打折</P>
            </div>

            <div>
              <img
                src="https://fakeimg.pl/160/282828/EAE0D0/"
                className={styles.rectangleImg}
                alt="進行團體協商"
              />
              <P>進行團體協商</P>
              <P>爭取更好的福利</P>
            </div>

            <div>
              <img
                src="https://fakeimg.pl/160/282828/EAE0D0/"
                className={styles.rectangleImg}
                alt="政策倡議"
              />
              <P>政策倡議</P>
              <P>改善產業體質</P>
            </div>
          </Wrapper>
        </Wrapper>
      </Section>
    </Section>
  );
};

export default LaborUnionDetail;
