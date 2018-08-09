import { fetchCampaignList } from '../apis/campaignInfoApi';
import fetchingStatus, { isUnfetched } from '../constants/status';
import { campaignEntriesStatusSelector } from '../selectors/campaignSelector';

export const SET_LIST_DATA = '@@campaignInfo/SET_LIST_DATA';
export const SET_LIST_STATUS = '@@campaignInfo/SET_LIST_STATUS';

const setListData = (campaignList, status, error = null) => ({
  type: SET_LIST_DATA,
  campaignList,
  status,
  error,
});

export const queryCampaignInfoList = () =>
  dispatch => {
    dispatch({
      type: SET_LIST_STATUS,
      status: fetchingStatus.FETCHING,
    });

    return fetchCampaignList()
      .then(rawData => {
        dispatch(setListData(rawData, fetchingStatus.FETCHED));
      })
      .catch(error => {
        dispatch(setListData([], fetchingStatus.ERROR, error));
      });
  };

export const queryCampaignInfoListIfNeeded = () =>
  (dispatch, getState) => {
    if (isUnfetched(campaignEntriesStatusSelector(getState()))) {
      return dispatch(queryCampaignInfoList());
    }
    return Promise.resolve();
  };
