import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import { P, Section } from 'common/base';
import {
  generateShareInterviewTypeForm,
  generateShareTimeSalaryTypeForm,
  generateShareWork,
  ShareLinkTo,
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

// 總覽沒有對應的表單，因此這張表不是每個 tab 都有
const shareFormByTabType: Partial<
  Record<TabType, (prefill?: SharePrefill) => ShareLinkTo>
> = {
  [TabType.TIME_AND_SALARY]: generateShareTimeSalaryTypeForm,
  [TabType.WORK_EXPERIENCE]: generateShareWork,
  [TabType.INTERVIEW_EXPERIENCE]: generateShareInterviewTypeForm,
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

const ShareButton: React.FC<ShareButtonProps> = ({ pageName, tabType }) => {
  const { pageType } = usePageContext();
  if (!tabType) return null;

  const generateShareFormTo = shareFormByTabType[tabType];
  if (!generateShareFormTo) return null;

  return (
    <Link
      to={generateShareFormTo(prefillOf(pageType, pageName))}
      className={cn('buttonCircleL', 'buttonBlack2', styles.shareButton)}
    >
      分享你的{tabTypeDetailTranslation[tabType]}
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
