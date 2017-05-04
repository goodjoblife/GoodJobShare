import React from 'react';
import cn from 'classnames';
import styles from './CallToAction.module.css';

const CallToAction = () => (
  <div className={styles.callToAction}>
    <div className={cn('wrapperM', styles.container)}>
      <div className={styles.image}>
        <img src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/workers-2.jpg" alt="workers" />
      </div>
      <div className={styles.content}>
        <h5 className={cn(styles.heading, 'headingM')}>
          覺得很有用嗎？也留下你的資訊吧！
        </h5>
        <a href="/#section-form" className={cn('buttonCircleM', 'buttonBlack')}>留下資料</a>
      </div>
    </div>
  </div>
);

export default CallToAction;
