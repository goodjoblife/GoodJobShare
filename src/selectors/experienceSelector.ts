import { InterviewExperience, WorkExperience } from 'apis/experience';
import { PopularExperience } from 'apis/queryPopularExperiences';
import { RootState } from 'reducers';
import { RelatedExperiencesState } from 'reducers/experience';
import FetchBox, { getUnfetched } from 'utils/fetchBox';

export const experienceBoxSelectorAtId = (experienceId: string) => (
  state: RootState,
): FetchBox<WorkExperience | InterviewExperience | null> => {
  return state.experience.experienceById[experienceId] || getUnfetched();
};

export const relatedExperiencesCabinSelector = (
  state: RootState,
): RelatedExperiencesState => state.experience.relatedExperiences;

export const relatedExperiencesStateSelector = (
  state: RootState,
): RelatedExperiencesState['state'] =>
  state.experience.relatedExperiences.state;

export const popularExperiencesBoxSelector = (
  state: RootState,
): FetchBox<PopularExperience[]> => state.experience.popularExperiences;
