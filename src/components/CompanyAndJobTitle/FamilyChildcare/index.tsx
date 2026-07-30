import React from 'react';

import { Wrapper } from 'common/base';
import { generateTabURL, PageType, TabType } from 'constants/companyJobTitle';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import FamilyChildcareSection, { FamilyChildcareData } from './FamilyChildcare';

type Props = {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
  data: FamilyChildcareData;
};

const FamilyChildcare: React.FC<Props> = ({
  pageType,
  pageName,
  tabType,
  data,
}) => {
  const tabBase = generateTabURL({ pageType, pageName, tabType });
  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
    >
      <Wrapper size="l">
        <FamilyChildcareSection
          data={data}
          parentalLeaveLinkTo={`${tabBase}/parental-leave`}
          familyCareLeaveLinkTo={`${tabBase}/family-care-leave`}
          flexibleHoursLinkTo={`${tabBase}/flexible-hours`}
          remoteWorkLinkTo={`${tabBase}/remote-work`}
        />
      </Wrapper>
    </CompanyAndJobTitleWrapper>
  );
};

export default FamilyChildcare;
