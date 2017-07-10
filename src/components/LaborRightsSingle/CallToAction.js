import React from 'react';
import cn from 'classnames';
import { Section, Wrapper, Heading } from 'common/base';
import styles from './CallToAction.module.css';

const CallToAction = () => (
  <Section padding bg="white" className={styles.callToAction}>
    <Wrapper size="m" className={styles.container}>
      <div className={styles.image}>
        <img src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/cta-01.jpg" alt="留下你的資訊" />
      </div>
      <div className={styles.content}>
        <Heading size="m" className={styles.heading} Tag="h3">
          覺得很有用嗎？也留下你的資訊吧！
        </Heading>
        <a href="/share/time-and-salary" className={cn('buttonCircleM', 'buttonBlack')}>留下資料</a>
      </div>
    </Wrapper>
  </Section>
);

export default CallToAction;
