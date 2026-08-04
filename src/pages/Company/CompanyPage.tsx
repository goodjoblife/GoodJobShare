import React from 'react';

import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import { PageContextProvider } from 'components/CompanyAndJobTitle/PageContextProvider';
import { PageType, TabType } from 'constants/companyJobTitle';

import useCompanyName from './useCompanyName';

type CompanyPageProps = React.PropsWithChildren<{
  tabType: TabType;
}>;

// 公司頁的外框：提供頁面身分與共用 chrome（麵包屑、標題、tab 列）。
// 由 Provider 渲染而非內容元件，內容元件因此位於 PageContext 之內，
// 也不必再把 pageType / pageName / tabType 轉手給外框
const CompanyPage: React.FC<CompanyPageProps> = ({ tabType, children }) => {
  const companyName = useCompanyName();

  return (
    <PageContextProvider
      pageType={PageType.COMPANY}
      pageName={companyName}
      tabType={tabType}
    >
      <CompanyAndJobTitleWrapper>{children}</CompanyAndJobTitleWrapper>
    </PageContextProvider>
  );
};

export default CompanyPage;
