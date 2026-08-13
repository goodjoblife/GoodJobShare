import React from 'react';

import { Wrapper } from 'common/base';

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
}) => (
  <Wrapper size="l">
    <GenderFriendlySection
      data={data}
      femaleManagerStatisticsItem={femaleManagerStatisticsItem}
    />
  </Wrapper>
);

export default GenderFriendly;
