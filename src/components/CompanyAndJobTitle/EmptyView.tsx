import React from 'react';

import { P, Section } from 'common/base';
import { TabType, tabTypeTranslation } from 'constants/companyJobTitle';

import styles from './EmptyView.module.css';

// tabType 可省略：SnippetBlock 這類轉手的呼叫端不見得知道自己在哪個 tab
const formatTabName = (tabType: TabType | undefined): string =>
  (tabType && tabTypeTranslation[tabType]) || '資料';

type EmptyViewProps = {
  pageName: string;
  tabType?: TabType;
};

const EmptyView: React.FC<EmptyViewProps> = ({ pageName, tabType }) => (
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
