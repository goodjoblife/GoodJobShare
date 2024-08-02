import { path } from 'ramda';
import { getUnfetched } from 'utils/fetchBox';

export const experienceBoxSelectorAtId = experienceId => state => {
  return state.experience.experienceById[experienceId] || getUnfetched();
};

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
