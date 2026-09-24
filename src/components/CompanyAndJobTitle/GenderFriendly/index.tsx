import React from 'react';

import { Wrapper } from 'common/base';
import { generateTabURL } from 'constants/companyJobTitle';

import { usePageContext } from '../PageContextProvider';
import GenderFriendlySection, {
  FemaleManagerItem,
  GenderFriendlyData,
} from './GenderFriendly';

type Props = {
  data: GenderFriendlyData;
  femaleManagerStatisticsItem: FemaleManagerItem | null;
};

const GenderFriendly: React.FC<Props> = ({
  data,
  femaleManagerStatisticsItem,
}) => {
  const { pageType, pageName, tabType } = usePageContext();
  const tabBase = generateTabURL({ pageType, pageName, tabType });
  return (
    <Wrapper size="l">
      <GenderFriendlySection
        data={data}
        femaleManagerStatisticsItem={femaleManagerStatisticsItem}
        menstrualLeaveLinkTo={`${tabBase}/menstrual-leave`}
      />
    </Wrapper>
  );
};

export default GenderFriendly;
