import { SET_EXPERIENCE, SET_POPULAR_EXPERIENCES } from 'actions/experience';
import { InterviewExperience, WorkExperience } from 'apis/experience';
import { PopularExperience } from 'apis/queryPopularExperiences';
import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';

type State = {
  // id --> box
  experienceById: Record<
    string,
    FetchBox<WorkExperience | InterviewExperience | null>
  >;

  popularExperiences: FetchBox<PopularExperience[]>;
};

const preloadedState: State = {
  experienceById: {},

  popularExperiences: getUnfetched(),
};

export default createReducer(preloadedState, {
  [SET_EXPERIENCE]: (
    state,
    {
      experienceId,
      box,
    }: {
      experienceId: string;
      box: FetchBox<WorkExperience | InterviewExperience | null>;
    },
  ) => ({
    ...state,
    experienceById: {
      ...state.experienceById,
      [experienceId]: box,
    },
  }),
  [SET_POPULAR_EXPERIENCES]: (
    state,
    {
      popularExperiences,
    }: {
      popularExperiences: FetchBox<PopularExperience[]>;
    },
  ) => ({
    ...state,
    popularExperiences,
  }),
});
