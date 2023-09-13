import { path } from 'ramda';

export const experienceSelector = path(['experienceDetail']);

export const experienceV2Selector = path(['experience', 'experience']);

export const experienceStateSelector = path([
  'experience',
  'experience',
  'state',
]);

export const relatedExperiencesStateSelector = path([
  'experience',
  'relatedExperiencesState',
]);
