import {
  SET_EXPERIENCE,
  SET_POPULAR_EXPERIENCES,
  SET_RELATED_EXPERIENCES,
} from 'actions/experience';
import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';

const preloadedState = {
  // id --> box
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
  [SET_EXPERIENCE]: (state, { experienceId, box }) => ({
    ...state,
    experienceById: {
      ...state.experienceById,
      [experienceId]: box,
    },
  }),
  [SET_RELATED_EXPERIENCES]: (state, { relatedExperiences }) => ({
    ...state,
    relatedExperiences,
  }),
  [SET_POPULAR_EXPERIENCES]: (state, { popularExperiences }) => ({
    ...state,
    popularExperiences,
  }),
});
