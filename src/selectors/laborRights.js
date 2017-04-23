import {
  createSelector,
  createStructuredSelector,
} from 'reselect';
import createCachedSelector from 're-reselect';

const getAllLaborRightsIdList = state =>
  state.laborRights.get('idList');

const getAllLaborRightsMapById = state =>
  state.laborRights.getIn(['dataMapById']);

const getAllLaborRightsData = createSelector(
  getAllLaborRightsMapById,
  laborRightsMapById =>
    laborRightsMapById.valueSeq().toList().map(entry => entry.get('data'))
);

export const getLaborRightsMenuProps = createStructuredSelector({
  items: getAllLaborRightsData,
});

const getId = (_, { params: { id } }) => id;

const getSingleLaborRightsData = createCachedSelector(
  getAllLaborRightsMapById,
  getId,
  (laborRightsMapById, id) => laborRightsMapById.getIn([id, 'data']),
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

const getSingleLaborRightsPrevData = createCachedSelector(
  getAllLaborRightsMapById,
  getSingleLaborRightsPrevId,
  (laborRightsMapById, prevId) => laborRightsMapById.get(prevId),
)(getId);

const getSingleLaborRightsNextId = createCachedSelector(
  getAllLaborRightsIdList,
  getIndexOfSingleLaborRightsId,
  (ids, index) => (index < ids.count() - 1 ? ids.get(index + 1) : undefined)
)(getId);

const getSingleLaborRightsNextData = createCachedSelector(
  getAllLaborRightsMapById,
  getSingleLaborRightsNextId,
  (laborRightsMapById, nextId) => laborRightsMapById.get(nextId),
)(getId);

export const getSingleLaborRightsProps = createStructuredSelector({
  item: getSingleLaborRightsData,
  prev: getSingleLaborRightsPrevData,
  next: getSingleLaborRightsNextData,
});
