import React, { useMemo } from 'react';

import { Wrapper } from 'common/base';
import Heading from 'common/base/Heading';
import BreadCrumb from 'common/BreadCrumb';
import FanPageBlock from 'common/FanPageBlock';
import TabLinkGroup from 'common/TabLinkGroup';
import StatisticsCard from 'components/CompanyAndJobTitle/StatisticsCard';
import SubscribeNotificationButton from 'components/CompanyAndJobTitle/SubscribeNotificationButton';
import {
  generateTabURL,
  PageType,
  TabType,
  tabTypeDetailTranslation as TAB_TYPE_DETAIL_TRANSLATION,
  tabTypeTranslation,
} from 'constants/companyJobTitle';

import styles from './CompanyAndJobTitleWrapper.module.css';
import { PageContextProvider } from './PageContextProvider';
import { generateBreadCrumbData } from './utils';

type CompanyAndJobTitleWrapperProps = React.PropsWithChildren<{
  pageType: PageType;
  pageName: string;
  tabType: TabType;
}>;

// 由 Provider 渲染。除了共用 chrome 之外，也把頁面身分放進 PageContext，
// 讓 children（各 tab 的內容元件）不必逐層收 pageType / pageName / tabType
const CompanyAndJobTitleWrapper: React.FC<CompanyAndJobTitleWrapperProps> = ({
  pageType,
  pageName,
  tabType,
  children,
}) => {
  const tabLinkOptions = useMemo(
    () =>
      (Object.entries(tabTypeTranslation) as [TabType, string][]).map(
        ([type, label]) => ({
          label,
          to: generateTabURL({
            pageType,
            pageName,
            tabType: type,
          }),
          exact: type === TabType.OVERVIEW,
        }),
      ),
    [pageType, pageName],
  );

  const pageH1 = useMemo(() => {
    switch (tabType) {
      case TabType.WORK_EXPERIENCE:
      case TabType.INTERVIEW_EXPERIENCE:
      case TabType.TIME_AND_SALARY:
        return `${pageName} ${TAB_TYPE_DETAIL_TRANSLATION[tabType]}`;
      default:
        return pageName;
    }
  }, [pageName, tabType]);

  return (
    <PageContextProvider
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
    >
      <div>
        <Wrapper size="l">
          <div style={{ marginBottom: '20px' }}>
            <BreadCrumb
              data={generateBreadCrumbData({ pageType, pageName, tabType })}
            />
          </div>
          <div>
            <div className={styles.titleContainer}>
              <Heading className={styles.title}>{pageH1}</Heading>
              {pageType === PageType.COMPANY && (
                <SubscribeNotificationButton companyName={pageName} />
              )}
            </div>
            <StatisticsCard pageType={pageType} pageName={pageName} />
          </div>
          <TabLinkGroup
            className=""
            options={tabLinkOptions}
            style={{
              marginBottom: '24px',
            }}
          />
        </Wrapper>
        {children}
        <Wrapper size="l">
          <FanPageBlock className={styles.fanPageBlock} />
        </Wrapper>
      </div>
    </PageContextProvider>
  );
};

export default CompanyAndJobTitleWrapper;
