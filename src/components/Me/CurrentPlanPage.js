import React from 'react';

import PlansWrapper from './PlansWrapper';
import AuthMask from './AuthMask';
import EmptyCurrentPlan from './EmptyCurrentPlan';

const CurrentPlanPage = () => {
  return (
    <AuthMask>
      <PlansWrapper>
        <EmptyCurrentPlan />
      </PlansWrapper>
    </AuthMask>
  );
};

export default CurrentPlanPage;
