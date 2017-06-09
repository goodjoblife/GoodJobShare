import { fetchLaborRightsMetaList } from '../utils/contentfulUtils';

export const SET_META_LIST =
    '@@LaborRightsMenu/SET_META_LIST';
export const SET_META_LIST_IS_FETCHING =
    '@@LaborRightsMenu/SET_META_LIST_IS_FETCHING';
export const SET_META_LIST_ERROR =
    '@@LaborRightsMenu/SET_META_LIST_ERROR';

const setMetaList = metaList => ({
  type: SET_META_LIST,
  metaList,
});

const setMetaListIsFetching = isFetching => ({
  type: SET_META_LIST_IS_FETCHING,
  isFetching,
});

const setMetaListError = error => ({
  type: SET_META_LIST_ERROR,
  error,
});

const fetchMetaList = () => dispatch => {
  dispatch(setMetaListIsFetching(true));
  return fetchLaborRightsMetaList().then(metaList => {
    dispatch(setMetaList(metaList));
  }).catch(err => {
    dispatch(setMetaListError(err));
  }).then(() => {
    dispatch(setMetaListIsFetching(false));
  });
};

export const fetchMetaListIfNeeded = () => (dispatch, getState) => {
  const metaList = getState().laborRightsMenu.get('metaList');
  const isFetching = getState().laborRightsMenu.get('metaListIsFetching');
  const error = getState().laborRightsMenu.get('metaListError');
  if (!metaList && !isFetching && !error) {
    return dispatch(fetchMetaList());
  }
  return Promise.resolve();
};
