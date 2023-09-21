import { path } from 'ramda';

export const loadingStatusSelector = path([
  'experienceSearch',
  'loadingStatus',
]);

export const experienceSearchSelector = path(['experienceSearch']);
