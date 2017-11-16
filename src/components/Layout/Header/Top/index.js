import React from 'react';
import { Link } from 'react-router';
import { Wrapper } from 'common/base';
import getCallToActionLink from 'utils/callToActionUtils';
import styles from './Top.module.css';
import ProgressBarWithExperienceCount from '../../../../containers/ProgressBar';

const Top = () => (
  <Link to={getCallToActionLink()} className={styles.root}>
    <Wrapper size="l" className={styles.inner}>
      <div className={styles.heading}>\  好工作評論網募「資」中  /</div>
      <ProgressBarWithExperienceCount size="s" theme="black" />
      <div className={styles.subheading}>
        不需要花上辛苦錢，只需要動動你的手，將你的面試、工作經驗分享出去！
      </div>
      <div className={styles.button}>GO !</div>
    </Wrapper>
  </Link>
);

export default Top;
