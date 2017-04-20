import {
  createSelector,
  createStructuredSelector,
} from 'reselect';

export const getAllLaborRightsIdList = state =>
  state.laborRights.get('idList');

export const getAllLaborRightsMapById = state =>
  state.laborRights.get('dataMapById');

export const getAllLaborRights = createSelector(
  getAllLaborRightsMapById,
  laborRightsMapById => laborRightsMapById.valueSeq().toList()
);

export const getId = (_, { id }) => id;

export const getSingleLaborRightsById = createSelector(
  getAllLaborRightsMapById,
  getId,
  (laborRightsMapById, id) => laborRightsMapById.get(id),
);

export const getIndexOfSingleLaborRightsId = createSelector(
  getAllLaborRightsIdList,
  getId,
  (ids, id) => ids.indexOf(id),
);

export const getSingleLaborRightsPrevId = createSelector(
  getAllLaborRightsIdList,
  getIndexOfSingleLaborRightsId,
  (ids, index) => (index > 0 ? ids.get(index - 1) : undefined)
);

export const getSingleLaborRightsPrevById = createSelector(
  getAllLaborRightsMapById,
  getSingleLaborRightsPrevId,
  (laborRightsMapById, prevId) => laborRightsMapById.get(prevId),
);

export const getSingleLaborRightsNextId = createSelector(
  getAllLaborRightsIdList,
  getIndexOfSingleLaborRightsId,
  (ids, index) => (index < ids.count() - 1 ? ids.get(index + 1) : undefined)
);

export const getSingleLaborRightsNextById = createSelector(
  getAllLaborRightsMapById,
  getSingleLaborRightsNextId,
  (laborRightsMapById, nextId) => laborRightsMapById.get(nextId),
);

export const getSingleLaborRightsPrevAndNext = createStructuredSelector({
  prev: getSingleLaborRightsPrevById,
  next: getSingleLaborRightsNextById,
});
