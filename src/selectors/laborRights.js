import { createSelector } from 'reselect';

export const getLaborRightsMap = state =>
  state.laborRights.get('dataMapById');

export const getAllLaborRights = createSelector(
  getLaborRightsMap,
  laborRightsMap => laborRightsMap.valueSeq().toList()
);

export const getLaborRightsIdList = state =>
  state.laborRights.get('idList');

export const getSingleLaborRightsIndex = (state, { id }) =>
  getLaborRightsIdList(state).indexOf(id);

export const getSingleLaborRightsById = (state, { id }) =>
  state.laborRights.getIn(['dataMapById', id]);

export const getSingleLaborRightsPrev = (state, { id }) => {
  const index = getSingleLaborRightsIndex(state, { id });
  const ids = getLaborRightsIdList(state);
  const prevId = index > 0 ? ids.get(index - 1) : undefined;
  return getSingleLaborRightsById(state, { id: prevId });
};

export const getSingleLaborRightsNext = (state, { id }) => {
  const index = getSingleLaborRightsIndex(state, { id });
  const ids = getLaborRightsIdList(state);
  const nextId = index < ids.count() - 1 ? ids.get(index + 1) : undefined;
  return getSingleLaborRightsById(state, { id: nextId });
};

export const getSingleLaborRightsPrevAndNext = createSelector(
  getSingleLaborRightsPrev,
  getSingleLaborRightsNext,
  (prev, next) => ({ prev, next })
);
