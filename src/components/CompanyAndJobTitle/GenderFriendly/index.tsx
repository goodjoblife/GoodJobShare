import React from 'react';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { Wrapper } from 'common/base';
import { PageType, TabType } from 'constants/companyJobTitle';
import GenderFriendlySection, { GenderFriendlyData } from './GenderFriendly';

type FemaleManagerItem = {
  year: number;
  percentage: number;
};

type Props = {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
  data: GenderFriendlyData;
  femaleManagerStatisticsItem: FemaleManagerItem | null;
};

const GenderFriendly: React.FC<Props> = ({
  pageType,
  pageName,
  tabType,
  data,
  femaleManagerStatisticsItem,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <Wrapper size="l">
      <GenderFriendlySection
        data={data}
        femaleManagerStatisticsItem={femaleManagerStatisticsItem}
      />
    </Wrapper>
  </CompanyAndJobTitleWrapper>
);

export default GenderFriendly;
