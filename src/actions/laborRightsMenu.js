import { fetchLaborRightsMetaList } from '../utils/contentfulUtils';
import status from '../constants/status';

export const SET_META_LIST =
    '@@LaborRightsMenu/SET_META_LIST';
export const SET_META_LIST_STATUS =
    '@@LaborRightsMenu/SET_META_LIST_STATUS';

const setMetaList = metaList => ({
  type: SET_META_LIST,
  metaList,
});

const setMetaListStatus = (nextStatus, err) => ({
  type: SET_META_LIST_STATUS,
  nextStatus,
  err,
});

const fetchMetaList = () => dispatch => {
  dispatch(setMetaListStatus(status.FETCHING));
  return fetchLaborRightsMetaList().then(metaList => {
    dispatch(setMetaList(metaList));
    dispatch(setMetaListStatus(status.FETCHED));
  }).catch(err => {
    dispatch(setMetaListStatus(status.ERROR, err));
  });
};

export const fetchMetaListIfNeeded = () => (dispatch, getState) => {
  const metaListStatus = getState().laborRightsMenu.get('metaListStatus');
  if (metaListStatus === status.UNFETCHED) {
    return dispatch(fetchMetaList());
  }
  return Promise.resolve();
};
