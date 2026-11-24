import cn from 'classnames';
import { LocationDescriptor } from 'history';
import React from 'react';
import { Link } from 'react-router-dom';

import { P, Section } from 'common/base';
import {
  generateShareEntry,
  generateShareInterviewTypeForm,
  generateShareTimeSalaryTypeForm,
  generateShareWork,
  SharePrefill,
} from 'common/ShareExpSection/shareLinkTo';
import {
  PageType,
  TabType,
  tabTypeDetailTranslation,
  tabTypeTranslation,
} from 'constants/companyJobTitle';

import styles from './EmptyView.module.css';
import { usePageContext } from './PageContextProvider';

// tabType 可省略：SnippetBlock 這類轉手的呼叫端不見得知道自己在哪個 tab
const formatTabName = (tabType: TabType | undefined): string =>
  (tabType && tabTypeTranslation[tabType]) || '資料';

// 每個 tab 的分享按鈕：按鈕上「分享你的___」，以及點下去要去哪。
// 總覽沒有單一對應的表單，去 /share 的選單讓使用者自己挑
type Shareable = {
  name: string;
  generateTo: (prefill?: SharePrefill) => LocationDescriptor;
};

const shareableByTabType: Record<TabType, Shareable> = {
  [TabType.TIME_AND_SALARY]: {
    name: tabTypeDetailTranslation[TabType.TIME_AND_SALARY],
    generateTo: generateShareTimeSalaryTypeForm,
  },
  [TabType.WORK_EXPERIENCE]: {
    name: tabTypeDetailTranslation[TabType.WORK_EXPERIENCE],
    generateTo: generateShareWork,
  },
  [TabType.INTERVIEW_EXPERIENCE]: {
    name: tabTypeDetailTranslation[TabType.INTERVIEW_EXPERIENCE],
    generateTo: generateShareInterviewTypeForm,
  },
  [TabType.OVERVIEW]: {
    name: '職場資訊',
    generateTo: generateShareEntry,
  },
};

// 公司頁的頁名是公司名，職稱頁的是職稱，各自預填到表單對應的欄位
const prefillOf = (pageType: PageType, pageName: string): SharePrefill =>
  pageType === PageType.COMPANY
    ? { companyName: pageName }
    : { jobTitle: pageName };

type ShareButtonProps = {
  pageName: string;
  tabType: TabType | undefined;
};

// 不知道在哪個 tab 時（SnippetBlock 這類轉手的呼叫端）比照總覽
const ShareButton: React.FC<ShareButtonProps> = ({ pageName, tabType }) => {
  const { pageType } = usePageContext();
  const { name, generateTo } = shareableByTabType[tabType || TabType.OVERVIEW];

  return (
    <Link
      to={generateTo(prefillOf(pageType, pageName))}
      className={cn('buttonCircleL', 'buttonBlack2', styles.shareButton)}
    >
      分享你的{name}
    </Link>
  );
};

type EmptyViewProps = {
  pageName: string;
  tabType?: TabType;
};

const EmptyView: React.FC<EmptyViewProps> = ({ pageName, tabType }) => (
  <Section Tag="main" paddingBottom>
    <div className={styles.searchNoResult}>
      <P size="l" bold className={styles.message}>
        尚未有「
        {pageName}
        」的
        {formatTabName(tabType)}
        <br />
        搜尋看看其他？
      </P>
      <ShareButton pageName={pageName} tabType={tabType} />
    </div>
  </Section>
);

export default EmptyView;
