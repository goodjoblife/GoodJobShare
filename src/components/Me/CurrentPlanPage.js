import React from 'react';

import PlansWrapper from './PlansWrapper';
import AuthMask from './AuthMask';

const CurrentPlanPage = () => {
  return (
    <AuthMask>
      <PlansWrapper>MyCurrentSubscription</PlansWrapper>
    </AuthMask>
  );
};

export default CurrentPlanPage;
