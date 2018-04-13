import R from 'ramda';

import { isFetched } from '../../constants/status';
import {
  menuEntriesSelector,
  menuStatusSelector,
} from '../../selectors/laborRightsSelector';

export const experienceCountSelector = state =>
  state.experiences.get('count');

export const hasFetchedexperienceCountSelector = R.compose(
  isFetched,
  state => state.experiences.get('countStatus')
);

export const timeAndSalaryCountSelector = state =>
  state.timeAndSalary.get('count');

export const hasFetchedTimeAndSalaryCountSelector = R.compose(
  isFetched,
  state => state.timeAndSalary.get('countStatus')
);

export const laborRightsCountSelector = R.compose(
  entries => entries.size,
  menuEntriesSelector,
);

export const hasFetchedLaborRightsCountSelector = R.compose(
  isFetched,
  menuStatusSelector,
);
