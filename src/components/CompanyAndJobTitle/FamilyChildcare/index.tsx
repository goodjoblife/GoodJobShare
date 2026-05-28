import React from 'react';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { Wrapper } from 'common/base';
import { PageType, TabType } from 'constants/companyJobTitle';
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
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <Wrapper size="l">
      <FamilyChildcareSection data={data} />
    </Wrapper>
  </CompanyAndJobTitleWrapper>
);

export default FamilyChildcare;
