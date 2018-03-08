import R from 'ramda';

import fetchingStatus from '../../constants/status';

export const experienceCountSelector = state =>
  state.experiences.get('count');

export const hasFetchedexperienceCountSelector = R.compose(
  R.equals(fetchingStatus.FETCHED),
  state => state.experiences.get('countStatus')
);

export const laborRightsCountSelector = state =>
  state.laborRights.get('menuEntries').size;

export const hasFetchedLaborRightsCountSelector = R.compose(
  R.equals(fetchingStatus.FETCHED),
  state => state.laborRights.get('menuStatus')
);
