import { useRouteMatch } from 'react-router-dom';
import { campaignNameSelector } from '../selectors';

const useCampaignName = () => {
  const match = useRouteMatch();
  return campaignNameSelector(match);
};

export default useCampaignName;
