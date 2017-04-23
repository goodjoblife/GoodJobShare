import contentfulUtils from '../utils/contentfulUtils';

export const SET_ALL_LABOR_RIGHTS_META =
  '@@laborRights/SET_ALL_LABOR_RIGHTS_META';
export const SET_SINGLE_LABOR_RIGHTS =
  '@@laborRights/SET_SINGLE_LABOR_RIGHTS';

const setAllLaborRightsMeta = items => ({
  type: SET_ALL_LABOR_RIGHTS_META,
  items,
});

export const loadAllLaborRightsMeta = () => dispatch =>
  contentfulUtils.fetchAllLaborRightsMeta().then(items => {
    dispatch(setAllLaborRightsMeta(items));
  }).catch(() => {});

const setSingleLaborRights = (id, item) => ({
  type: SET_SINGLE_LABOR_RIGHTS,
  id,
  item,
});

export const loadSingleLaborRights = laborRightsId => dispatch =>
  contentfulUtils.fetchSingleLaborRights(laborRightsId).then(items => {
    if (items.length === 1) {
      dispatch(setSingleLaborRights(laborRightsId, items.pop()));
    }
  }).catch(() => {});
