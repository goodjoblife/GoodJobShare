import R from 'ramda';

import fetchingStatus from '../../constants/status';
import {
  menuEntriesSelector,
  menuStatusSelector,
} from '../../selectors/laborRightsSelector';

export const experienceCountSelector = state =>
  state.experiences.get('count');

export const hasFetchedexperienceCountSelector = R.compose(
  R.equals(fetchingStatus.FETCHED),
  state => state.experiences.get('countStatus')
);

export const laborRightsCountSelector = R.compose(
  entries => entries.size,
  menuEntriesSelector,
);

export const hasFetchedLaborRightsCountSelector = R.compose(
  R.equals(fetchingStatus.FETCHED),
  menuStatusSelector,
);
