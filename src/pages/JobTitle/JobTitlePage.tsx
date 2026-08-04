import React from 'react';

import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import { PageContextProvider } from 'components/CompanyAndJobTitle/PageContextProvider';
import { PageType, TabType } from 'constants/companyJobTitle';

import useJobTitle from './useJobTitle';

type JobTitlePageProps = React.PropsWithChildren<{
  tabType: TabType;
}>;

// 職稱頁的外框，與 CompanyPage 對稱，見該檔說明
const JobTitlePage: React.FC<JobTitlePageProps> = ({ tabType, children }) => {
  const jobTitle = useJobTitle();

  return (
    <PageContextProvider
      pageType={PageType.JOB_TITLE}
      pageName={jobTitle}
      tabType={tabType}
    >
      <CompanyAndJobTitleWrapper>{children}</CompanyAndJobTitleWrapper>
    </PageContextProvider>
  );
};

export default JobTitlePage;
