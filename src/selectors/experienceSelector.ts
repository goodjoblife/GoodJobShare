import { InterviewExperience, WorkExperience } from 'apis/experience';
import { PopularExperience } from 'apis/queryPopularExperiences';
import { RootState } from 'reducers';
import FetchBox, { getUnfetched } from 'utils/fetchBox';

export const experienceBoxSelectorAtId = (experienceId: string) => (
  state: RootState,
): FetchBox<WorkExperience | InterviewExperience | null> => {
  return state.experience.experienceById[experienceId] || getUnfetched();
};

export const popularExperiencesBoxSelector = (
  state: RootState,
): FetchBox<PopularExperience[]> => state.experience.popularExperiences;
