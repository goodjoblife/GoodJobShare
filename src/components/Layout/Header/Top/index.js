import React from 'react';
import { Link } from 'react-router';
import { Wrapper } from 'common/base';
import ProgressBar from 'common/ProgressBar';
import styles from './Top.module.css';

const Top = ({ experienceCount }) => (
  <Link to="/share" className={styles.root}>
    <Wrapper size="l" className={styles.inner}>
      <div className={styles.heading}>\  好工作評論網募「資」中  /</div>
      <ProgressBar totalData={experienceCount} size="s" theme="black" />
      <div className={styles.subheading}>
        不需要花上辛苦錢，只需要動動你的手，將你的面試、工作經驗分享出去！
      </div>
      <div className={styles.button}>GO !</div>
    </Wrapper>
  </Link>
);

Top.propTypes = {
  experienceCount: React.PropTypes.number,
};

export default Top;
