import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Section, Wrapper, Heading, P } from 'common/base';
import { useShareLink } from 'hooks/experiments';
import InterviewImg from './share-2.png';
import WorkExperienceImg from './share-3.png';
import SalaryWorkTimeImg from './share-1.png';
import styles from './ShareExpSection.module.css';

const DefaultSubheading = () => (
  <div>
    面試又被問家庭、感情狀況 ( ˘･з･)？
    <br />
    覺得現在的公司超級棒、想要分享給大家 (^y^)？ <br />
    分享你的經驗，讓我們一起改變現狀、定義理想的工作！
  </div>
);

const ShareExpSection = ({ heading, Subheading }) => {
  // Get share link object according to Google Optimize parameters
  const shareLink = useShareLink();
  return (
    <Section padding>
      <Wrapper size="l">
        <Heading size="l" center className={styles.heading} marginBottomS>
          {heading}
        </Heading>
        <P size="l" Tag="h2" center className={styles.subheading}>
          <Subheading />
        </P>
        <div className={styles.container}>
          <Link to={shareLink} className={styles.item}>
            <img
              src={InterviewImg}
              alt="分享面試經驗"
              className={styles.image}
            />
            <P size="l" Tag="h3" bold className={styles.button}>
              面試經驗
            </P>
            <P className={styles.description} size="l">
              分享你的面試過程、面試問題，減少大家走冤枉路～
            </P>
          </Link>
          <Link to="/share/work-experiences" className={styles.item}>
            <img
              src={WorkExperienceImg}
              alt="分享工作經驗"
              className={styles.image}
            />
            <P size="l" Tag="h3" bold className={styles.button}>
              工作經驗
            </P>
            <P className={styles.description} size="l">
              想推薦工作、爆料的，這邊請！
            </P>
          </Link>
          <Link to="/share/time-and-salary" className={styles.item}>
            <img
              src={SalaryWorkTimeImg}
              alt="留下工時或薪資"
              className={styles.image}
            />
            <P size="l" Tag="h3" bold className={styles.button}>
              薪資工時
            </P>
            <P className={styles.description} size="l">
              常加班、薪水又少嗎？快分享避免他人踩雷！
            </P>
          </Link>
        </div>
      </Wrapper>
    </Section>
  );
};

ShareExpSection.propTypes = {
  heading: PropTypes.string.isRequired,
  Subheading: PropTypes.func,
};
ShareExpSection.defaultProps = {
  heading: '你要分享何種資訊？',
  Subheading: DefaultSubheading,
};

export default ShareExpSection;
