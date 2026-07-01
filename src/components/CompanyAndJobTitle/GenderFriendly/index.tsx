import React from 'react';

import { Wrapper } from 'common/base';
import { generateTabURL, PageType, TabType } from 'constants/companyJobTitle';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
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
}) => {
  const tabBase = generateTabURL({ pageType, pageName, tabType });
  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
    >
      <Wrapper size="l">
        <GenderFriendlySection
          data={data}
          femaleManagerStatisticsItem={femaleManagerStatisticsItem}
          menstrualLeaveLinkTo={`${tabBase}/menstrual-leave`}
        />
      </Wrapper>
    </CompanyAndJobTitleWrapper>
  );
};

export default GenderFriendly;
