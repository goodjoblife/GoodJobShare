import { path } from 'ramda';

export const experienceSelector = path(['experience', 'experience']);

export const experienceStateSelector = path([
  'experience',
  'experience',
  'state',
]);

export const relatedExperiencesStateSelector = path([
  'experience',
  'relatedExperiencesState',
]);
