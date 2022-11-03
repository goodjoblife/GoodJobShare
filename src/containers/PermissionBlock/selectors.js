import R from 'ramda';

import { isFetched } from '../../constants/status';
import { menuStatusSelector } from '../../selectors/laborRightsSelector';

export const hasFetchedexperienceCountSelector = R.compose(
  isFetched,
  state => state.experiences.get('countStatus'),
);

export const hasFetchedTimeAndSalaryCountSelector = R.compose(
  isFetched,
  state => state.timeAndSalary.get('countStatus'),
);

export const hasFetchedLaborRightsCountSelector = R.compose(
  isFetched,
  menuStatusSelector,
);
