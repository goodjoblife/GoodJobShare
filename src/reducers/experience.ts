import {
  SET_EXPERIENCE,
  SET_POPULAR_EXPERIENCES,
  SET_RELATED_EXPERIENCES,
} from 'actions/experience';
import { InterviewExperience, WorkExperience } from 'apis/experience';
import {
  InterviewExperienceInRelatedExperiences,
  WorkExperienceInRelatedExperiences,
} from 'apis/queryRelatedExperiences';
import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';

type RelatedExperience =
  | WorkExperienceInRelatedExperiences
  | InterviewExperienceInRelatedExperiences;

// TODO: replace with proper type once apis/experiencesApi.js#getPopularExperiences is converted to TS
type PopularExperience = unknown;

type RelatedExperiencesState = {
  experienceId: string | null;
  page: number;
  state: FetchBox<{
    relatedExperiences: RelatedExperience[];
    hasMore: boolean;
  }>;
};

type State = {
  // id --> box
  experienceById: Record<
    string,
    FetchBox<WorkExperience | InterviewExperience | null>
  >;

  relatedExperiences: RelatedExperiencesState;

  popularExperiences: FetchBox<PopularExperience[]>;
};

const preloadedState: State = {
  experienceById: {},

  relatedExperiences: {
    experienceId: null,
    page: 0,
    // state is related to experienceId, page
    state: getUnfetched(),
  },

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
  [SET_RELATED_EXPERIENCES]: (
    state,
    {
      relatedExperiences,
    }: {
      relatedExperiences: RelatedExperiencesState;
    },
  ) => ({
    ...state,
    relatedExperiences,
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
