import contentfulUtils from '../utils/contentfulUtils';
import status from '../constants/status';

export const SET_META_LIST =
    '@@LaborRightsSingle/SET_META_LIST';
export const SET_META_LIST_STATUS =
    '@@LaborRightsSingle/SET_META_LIST_STATUS';
export const SET_DATA =
    '@@LaborRightsSingle/SET_DATA';
export const SET_DATA_STATUS =
    '@@LaborRightsSingle/SET_DATA_STATUS';

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
  return contentfulUtils.fetchLaborRightsMetaList().then(metaList => {
    dispatch(setMetaList(metaList));
    dispatch(setMetaListStatus(status.FETCHED));
  }).catch(err => {
    const error = { status: err.response.status, message: err.response.data };
    dispatch(setMetaListStatus(status.ERROR, error));
  });
};

export const fetchMetaListIfNeeded = () => (dispatch, getState) => {
  const metaListStatus = getState().laborRightsSingle.get('metaListStatus');
  if (metaListStatus === status.UNFETCHED) {
    return dispatch(fetchMetaList());
  }
  return Promise.resolve();
};

const setData = (id, data) => ({
  type: SET_DATA,
  id,
  data,
});

const setDataStatus = (id, nextStatus, err) => ({
  type: SET_DATA_STATUS,
  id,
  nextStatus,
  err,
});

const fetchData = id => dispatch => {
  dispatch(setDataStatus(id, status.FETCHING));
  return contentfulUtils.fetchLaborRightsData(id).then(data => {
    dispatch(setData(id, data));
    dispatch(setDataStatus(id, status.FETCHED));
  }).catch(err => {
    const error = { status: err.response.status, message: err.response.data };
    dispatch(setDataStatus(id, status.ERROR, error));
  });
};

export const fetchDataIfNeeded = id =>
  (dispatch, getState) => {
    const dataStatus =
      getState().laborRightsSingle.getIn(
        ['dataMapById', id, 'dataStatus'],
        status.UNFETCHED
      );
    if (dataStatus === status.UNFETCHED) {
      return dispatch(fetchData(id));
    }
    return Promise.resolve();
  };
