import React from 'react';

import PlansWrapper from './PlansWrapper';
import AuthMask from './AuthMask';

const PlansHistoryPage = () => {
  return (
    <AuthMask>
      <PlansWrapper>MyPlansHistory</PlansWrapper>
    </AuthMask>
  );
};

export default PlansHistoryPage;
