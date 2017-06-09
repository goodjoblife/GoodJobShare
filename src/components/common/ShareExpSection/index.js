import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Heading from 'common/Heading';
import Wrapper from 'common/Wrapper';
import P from 'common/P';
import styles from './ShareExpSection.module.css';

const ShareExpSection = ({ heading }) => (
  <Wrapper size="l" Tag="section" padding>
    <Heading size="headingL" Tag="h2" center className={styles.heading}>{heading}</Heading>
    <div className={styles.container}>
      <a href="/time-and-salary/share" className={styles.item}>
        <img src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/share-1.png" alt="留下工時或薪資" className={styles.image} />
        <P size="l" bold className={styles.button}>留下工時或薪資</P>
      </a>
      <Link to="/share/interview" className={styles.item}>
        <img src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/share-2.png" alt="分享面試經驗" className={styles.image} />
        <P size="l" bold className={styles.button}>分享面試經驗</P>
      </Link>
      <Link to="/share/work-experiences" className={styles.item}>
        <img src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/share-3.png" alt="分享工作經驗" className={styles.image} />
        <P size="l" bold className={styles.button}>分享工作經驗</P>
      </Link>
    </div>
  </Wrapper>
);
ShareExpSection.propTypes = {
  heading: PropTypes.string,
};
ShareExpSection.defaultProps = {
  heading: '你要分享何種經驗？',
};

export default ShareExpSection;
