import React from 'react';
import { Section, P, Link } from 'common/base';
import styles from './SubscriptionsSection.module.css';

const Captain = () => (
  <Section className={styles.captain}>
    <P>解鎖範圍：全站 8,393 筆面試、薪資資料，及期間內新增的資料</P>
    <P>使用期間：現在 ~ 2022.01.30 23:59</P>
    <P>
      付款及同意<Link to="/user-terms">使用條款</Link>
    </P>
  </Section>
);

export default Captain;
