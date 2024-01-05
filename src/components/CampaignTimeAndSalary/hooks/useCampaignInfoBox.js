import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  campaignEntriesSelector,
  campaignEntriesStatusSelector,
  campaignEntriesErrorSelector,
} from 'selectors/campaignSelector';

const useCampaignInfoBox = () => {
  const data = useSelector(campaignEntriesSelector);
  const status = useSelector(campaignEntriesStatusSelector);
  const error = useSelector(campaignEntriesErrorSelector);

  return useMemo(
    () => ({
      data,
      status,
      error,
    }),
    [data, error, status],
  );
};

export default useCampaignInfoBox;
