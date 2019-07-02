import React from 'react';
import { Section, P } from 'common/base';
import styles from './EmptyView.module.css';

const tabTypeText = {
  interview: '經驗分享',
};

const formatTabName = tabType => tabTypeText[tabType] || '資料';

const EmptyView = ({ pageName, tabType }) => (
  <Section Tag="main" paddingBottom>
    <P size="l" bold className={styles.searchNoResult}>
      尚未有「
      {pageName}
      」的
      {formatTabName(tabType)}
      <br />
      搜尋看看其他？
    </P>
  </Section>
);

export default EmptyView;
