import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

import Wrapper from 'common/base/Wrapper';
import { Star, Sort } from 'common/icons';
import styles from './Banner.module.css';

export default () => (
  <section className={styles.pageBanner}>
    <Wrapper size="l" className={styles.container}>
      <h1 className={styles.heading}>查看工時、薪資</h1>
      <div className={styles.btns}>
        <Link className={cn(styles.btnS, styles.btnYellowLine)} to="/time-and-salary/latest">
          <Star /> 最新資料
        </Link>
        <Link className={cn(styles.btnS, styles.btnYellowLine)} to="/time-and-salary/work-time-dashboard">
          <Sort /> 工時排行
        </Link>
        <Link className={cn(styles.btnS, styles.btnYellowLine)} to="/time-and-salary/salary-dashboard">
          <Sort /> 時薪排行
        </Link>
      </div>
      <img src="https://image.goodjob.life/workers.jpg" className={styles.image} role="presentation" />
    </Wrapper>
  </section>
);
