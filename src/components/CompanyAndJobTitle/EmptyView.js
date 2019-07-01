import React from 'react';
import { Section, P } from 'common/base';
import styles from './EmptyView.module.css';

const tabNameText = {
  interview: '經驗分享',
};

const formatTabName = tabName => tabNameText[tabName] || '資料';

const EmptyView = ({ tabName }) => (
  <Section Tag="main" paddingBottom>
    <P size="l" bold className={styles.searchNoResult}>
      尚未有「聯發科股份有限公司」的
      {formatTabName(tabName)}
      <br />
      搜尋看看其他？
    </P>
  </Section>
);

export default EmptyView;
