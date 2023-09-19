import { path } from 'ramda';

export const experienceCabinSelector = path(['experience', 'experience']);

export const experienceStateSelector = path([
  'experience',
  'experience',
  'state',
]);

export const relatedExperiencesCabinSelector = path([
  'experience',
  'relatedExperiences',
]);

export const relatedExperiencesStateSelector = path([
  'experience',
  'relatedExperiences',
  'state',
]);

export const popularExperiencesBoxSelector = path([
  'experience',
  'popularExperiences',
]);
