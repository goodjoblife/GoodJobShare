import { path } from 'ramda';

export const experienceSelector = path(['experienceDetail']);

export const relatedExperiencesStateSelector = path([
  'experience',
  'relatedExperiencesState',
]);
