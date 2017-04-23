import {
  createSelector,
  createStructuredSelector,
} from 'reselect';
import createCachedSelector from 're-reselect';

const getAllLaborRightsIdList = state =>
  state.laborRights.get('idList');

const getAllLaborRightsMapById = state =>
  state.laborRights.get('dataMapById');

const getAllLaborRights = createSelector(
  getAllLaborRightsMapById,
  laborRightsMapById => laborRightsMapById.valueSeq().toList()
);

export const laborRightsMenuProps = createStructuredSelector({
  items: getAllLaborRights,
});

const getId = (_, { params: { id } }) => id;

const getSingleLaborRights = createCachedSelector(
  getAllLaborRightsMapById,
  getId,
  (laborRightsMapById, id) => laborRightsMapById.get(id),
)(getId);

const getIndexOfSingleLaborRightsId = createCachedSelector(
  getAllLaborRightsIdList,
  getId,
  (ids, id) => ids.indexOf(id),
)(getId);

const getSingleLaborRightsPrevId = createCachedSelector(
  getAllLaborRightsIdList,
  getIndexOfSingleLaborRightsId,
  (ids, index) => (index > 0 ? ids.get(index - 1) : undefined)
)(getId);

const getSingleLaborRightsPrev = createCachedSelector(
  getAllLaborRightsMapById,
  getSingleLaborRightsPrevId,
  (laborRightsMapById, prevId) => laborRightsMapById.get(prevId),
)(getId);

const getSingleLaborRightsNextId = createCachedSelector(
  getAllLaborRightsIdList,
  getIndexOfSingleLaborRightsId,
  (ids, index) => (index < ids.count() - 1 ? ids.get(index + 1) : undefined)
)(getId);

const getSingleLaborRightsNext = createCachedSelector(
  getAllLaborRightsMapById,
  getSingleLaborRightsNextId,
  (laborRightsMapById, nextId) => laborRightsMapById.get(nextId),
)(getId);

export const singleLaborRightsProps = createStructuredSelector({
  item: getSingleLaborRights,
  prev: getSingleLaborRightsPrev,
  next: getSingleLaborRightsNext,
});
