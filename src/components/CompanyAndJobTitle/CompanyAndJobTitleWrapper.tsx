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
import { generateBreadCrumbData } from './utils';

type CompanyAndJobTitleWrapperProps = React.PropsWithChildren<{
  pageName: string;
  pageType: PageType;
  tabType: TabType;
}>;

const CompanyAndJobTitleWrapper: React.FC<CompanyAndJobTitleWrapperProps> = ({
  children,
  pageType,
  pageName,
  tabType,
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
  );
};

export default CompanyAndJobTitleWrapper;
