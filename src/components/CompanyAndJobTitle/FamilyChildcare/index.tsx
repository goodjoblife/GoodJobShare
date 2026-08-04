import React from 'react';

import { Wrapper } from 'common/base';

import FamilyChildcareSection, {
  FamilyChildcareData,
} from './FamilyChildcareSection';

type Props = {
  data: FamilyChildcareData;
};

const FamilyChildcare: React.FC<Props> = ({ data }) => (
  <Wrapper size="l">
    <FamilyChildcareSection data={data} />
  </Wrapper>
);

export default FamilyChildcare;
