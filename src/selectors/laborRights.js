import {
  createSelector,
  createStructuredSelector,
} from 'reselect';

const getAllLaborRightsIdList = state =>
  state.laborRights.get('idList');

const getAllLaborRightsMapById = state =>
  state.laborRights.get('dataMapById');

const getAllLaborRights = createSelector(
  getAllLaborRightsMapById,
  laborRightsMapById => laborRightsMapById.valueSeq().toList()
);

export const makeLaborRightsMenuProps = () =>
  createStructuredSelector({
    items: getAllLaborRights,
  });

const getId = (_, { params: { id } }) => id;

const getSingleLaborRights = createSelector(
  getAllLaborRightsMapById,
  getId,
  (laborRightsMapById, id) => laborRightsMapById.get(id),
);

const getIndexOfSingleLaborRightsId = createSelector(
  getAllLaborRightsIdList,
  getId,
  (ids, id) => ids.indexOf(id),
);

const getSingleLaborRightsPrevId = createSelector(
  getAllLaborRightsIdList,
  getIndexOfSingleLaborRightsId,
  (ids, index) => (index > 0 ? ids.get(index - 1) : undefined)
);

const getSingleLaborRightsPrev = createSelector(
  getAllLaborRightsMapById,
  getSingleLaborRightsPrevId,
  (laborRightsMapById, prevId) => laborRightsMapById.get(prevId),
);

const getSingleLaborRightsNextId = createSelector(
  getAllLaborRightsIdList,
  getIndexOfSingleLaborRightsId,
  (ids, index) => (index < ids.count() - 1 ? ids.get(index + 1) : undefined)
);

const getSingleLaborRightsNext = createSelector(
  getAllLaborRightsMapById,
  getSingleLaborRightsNextId,
  (laborRightsMapById, nextId) => laborRightsMapById.get(nextId),
);

export const makeSingleLaborRightsProps = () =>
  createStructuredSelector({
    item: getSingleLaborRights,
    prev: getSingleLaborRightsPrev,
    next: getSingleLaborRightsNext,
  });
