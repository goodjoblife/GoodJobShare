export const campaignEntriesSelector = state => state.campaignInfo.get('entries');
export const campaignEntriesStatusSelector = state => state.campaignInfo.get('entriesStatus');
export const campaignEntriesErrorSelector = state => state.campaignInfo.get('entriesError');
export const campaignNameSelector = match => match.params.campaign_name;
