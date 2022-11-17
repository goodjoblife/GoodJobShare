import R from 'ramda';
import { menuEntriesSelector } from './laborRightsSelector';

export const experienceCountSelector = state => state.experiences.get('count');

export const timeAndSalaryCountSelector = state =>
  state.timeAndSalary.get('count');

export const laborRightsCountSelector = R.compose(
  R.length,
  menuEntriesSelector,
);
