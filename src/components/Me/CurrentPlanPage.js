import React from 'react';

import PlansWrapper from './PlansWrapper';
import AuthMask from './AuthMask';

const CurrentPlanPage = () => {
  return (
    <AuthMask>
      <PlansWrapper></PlansWrapper>
    </AuthMask>
  );
};

export default CurrentPlanPage;
