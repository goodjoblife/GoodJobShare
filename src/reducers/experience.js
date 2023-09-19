import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import {
  SET_EXPERIENCE,
  SET_RELATED_EXPERIENCES,
  SET_POPULAR_EXPERIENCES,
} from 'actions/experience';

const preloadedState = {
  experience: {
    experienceId: null,
    // state is related to experienceId
    state: getUnfetched(),
  },

  relatedExperiences: {
    experienceId: null,
    page: 0,
    // state is related to experienceId, page
    state: getUnfetched(),
  },

  popularExperiences: getUnfetched(),
};

export default createReducer(preloadedState, {
  [SET_EXPERIENCE]: (state, { experience }) => ({
    ...state,
    experience,
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
