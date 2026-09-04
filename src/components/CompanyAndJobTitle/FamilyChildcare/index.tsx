import React from 'react';

import { Wrapper } from 'common/base';
import { generateTabURL } from 'constants/companyJobTitle';

import { usePageContext } from '../PageContextProvider';
import FamilyChildcareSection, {
  FamilyChildcareData,
} from './FamilyChildcareSection';

type Props = {
  data: FamilyChildcareData;
};

const FamilyChildcare: React.FC<Props> = ({ data }) => {
  const { pageType, pageName, tabType } = usePageContext();
  const tabBase = generateTabURL({ pageType, pageName, tabType });
  return (
    <Wrapper size="l">
      <FamilyChildcareSection
        data={data}
        parentalLeaveLinkTo={`${tabBase}/parental-leave`}
        familyCareLeaveLinkTo={`${tabBase}/family-care-leave`}
        flexibleHoursLinkTo={`${tabBase}/flexible-hours`}
        remoteWorkLinkTo={`${tabBase}/remote-work`}
      />
    </Wrapper>
  );
};

export default FamilyChildcare;
