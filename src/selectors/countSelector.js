import { path } from 'ramda';
import { isFetched } from 'utils/fetchBox';

export const experienceCountBoxSelector = path(['experiences', 'countBox']);

export const experienceCountSelector = state => {
  const countBox = experienceCountBoxSelector(state);
  if (isFetched(countBox)) {
    return countBox.data;
  }
  return 0;
};

export const salaryWorkTimeCountBoxSelector = path([
  'timeAndSalary',
  'countBox',
]);

export const salaryWorkTimeCountSelector = state => {
  const countBox = salaryWorkTimeCountBoxSelector(state);
  if (isFetched(countBox)) {
    return countBox.data;
  }
  return 0;
};
