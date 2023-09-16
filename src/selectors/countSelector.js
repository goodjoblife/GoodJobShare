import { compose, length, prop } from 'ramda';
import { menuStateSelector } from 'selectors/laborRightsSelector';

export const experienceCountSelector = state => state.experiences.get('count');

export const timeAndSalaryCountSelector = state =>
  state.timeAndSalary.get('count');

export const laborRightsCountSelector = compose(
  length,
  prop('data'),
  menuStateSelector,
);
