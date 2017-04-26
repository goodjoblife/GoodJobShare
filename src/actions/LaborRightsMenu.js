import contentfulUtils from '../utils/contentfulUtils';
import status from '../constants/status';

export const SET_ALL_LABOR_RIGHTS_META =
    '@@LaborRightsMenu/SET_ALL_LABOR_RIGHTS_META';
export const SET_ALL_LABOR_RIGHTS_META_STATUS =
    '@@LaborRightsMenu/SET_ALL_LABOR_RIGHTS_META_STATUS';

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
  return contentfulUtils.fetchAllLaborRightsMeta().then(metaList => {
    dispatch(setAllLaborRightsMeta(metaList));
    dispatch(setAllLaborRightsMetaStatus(status.FETCHED));
  }).catch(err => {
    dispatch(setAllLaborRightsMetaStatus(status.ERROR, err));
  });
};

export const fetchAllLaborRightsMetaIfNeeded = () => (dispatch, getState) => {
  const metaListStatus = getState().LaborRightsMenu.get('metaListStatus');
  if (metaListStatus === status.UNFETCHED) {
    return dispatch(fetchAllLaborRightsMeta());
  }
  return Promise.resolve();
};
