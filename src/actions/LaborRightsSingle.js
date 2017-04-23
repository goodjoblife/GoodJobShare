import contentfulUtils from '../utils/contentfulUtils';

export const SET_ALL_LABOR_RIGHTS_META =
    '@@LaborRightsSingle/SET_ALL_LABOR_RIGHTS_META';
export const SET_ALL_LABOR_RIGHTS_META_STATUS =
    '@@LaborRightsSingle/SET_ALL_LABOR_RIGHTS_META_STATUS';
export const SET_SINGLE_LABOR_RIGHTS_DATA =
    '@@LaborRightsSingle/SET_SINGLE_LABOR_RIGHTS_DATA';
export const SET_SINGLE_LABOR_RIGHTS_DATA_STATUS =
    '@@LaborRightsSingle/SET_SINGLE_LABOR_RIGHTS_DATA_STATUS';

export const status = {
  FETCHED: 'FETCHED',
  FETCHING: 'FETCHING',
  ERROR: 'ERROR',
};

const setAllLaborRightsMeta = metaList => ({
  type: SET_ALL_LABOR_RIGHTS_META,
  metaList,
});

const setAllLaborRightsMetaStatus = (nextStatus, err) => ({
  type: SET_ALL_LABOR_RIGHTS_META_STATUS,
  nextStatus,
  err,
});

const fetchAllLaborRightsMeta = () => dispatch => {
  dispatch(setAllLaborRightsMetaStatus(status.FETCHING));
  return contentfulUtils.fetchLaborRights().then(metaList => {
    dispatch(setAllLaborRightsMeta(metaList));
    dispatch(setAllLaborRightsMetaStatus(status.FETCHED));
  }).catch(err => {
    dispatch(setAllLaborRightsMetaStatus(status.ERROR, err));
  });
};

export const fetchAllLaborRightsMetaIfNeeded = () => (dispatch, getState) => {
  if (getState().LaborRightsSingle.get('metaList')) {
    return Promise.resolve();
  }
  return dispatch(fetchAllLaborRightsMeta());
};

const setSingleLaborRightsData = (id, data) => ({
  type: SET_SINGLE_LABOR_RIGHTS_DATA,
  id,
  data,
});

const setSingleLaborRightsDataStatus = (id, data) => ({
  type: SET_SINGLE_LABOR_RIGHTS_DATA_STATUS,
  id,
  data,
});

const fetchSingleLaborRightsData = id => dispatch => {
  dispatch(setSingleLaborRightsDataStatus(id, status.FETCHING));
  contentfulUtils.fetchSingleLaborRights(id).then(data => {
    dispatch(setSingleLaborRightsData(id, data));
    dispatch(setSingleLaborRightsDataStatus(id, status.FETCHED));
  }).catch(err => {
    dispatch(setSingleLaborRightsDataStatus(id, status.ERROR, err));
  });
};

export const fetchSingleLaborRightsDataIfNeeded = id =>
  (dispatch, getState) => {
    const data =
      getState().LaborRightsSingle.getIn(['dataMapById', id, 'data']);
    if (!data) {
      return Promise.resolve();
    }
    return dispatch(fetchSingleLaborRightsData());
  };
