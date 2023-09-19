import React from 'react';
import Redirect from 'common/routing/Redirect';
import { generatePath } from 'react-router';
import useCampaignName from './hooks/useCampaignName';

const CampaignTimeAndSalaryNotFound = () => {
  const campaignName = useCampaignName();

  return (
    <Redirect
      to={generatePath('/time-and-salary/campaigns/:campaignName/latest', {
        campaignName,
      })}
    />
  );
};

export default CampaignTimeAndSalaryNotFound;
