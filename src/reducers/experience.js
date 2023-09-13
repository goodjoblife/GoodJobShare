import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { SET_EXPERIENCE, SET_RELATED_EXPERIENCES } from 'actions/experience';

/*
 * relatedExperiencesState
 * data
 *   experienceId
 *   page
 *   relatedExperiences
 *   hasMore
 * status
 * error
 */
const preloadedState = {
  experience: {
    experienceId: null,
    // state is related to experienceId
    state: getUnfetched(),
  },

  relatedExperiencesState: getUnfetched(),
};

export default createReducer(preloadedState, {
  [SET_EXPERIENCE]: (state, { experience }) => ({
    ...state,
    experience,
  }),
  [SET_RELATED_EXPERIENCES]: (state, { relatedExperiencesState }) => ({
    ...state,
    relatedExperiencesState,
  }),
});
