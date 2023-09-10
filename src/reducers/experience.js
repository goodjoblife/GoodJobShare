import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { SET_RELATED_EXPERIENCES } from 'actions/experience';

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
  relatedExperiencesState: getUnfetched(),
};

export default createReducer(preloadedState, {
  [SET_RELATED_EXPERIENCES]: (state, { relatedExperiencesState }) => ({
    ...state,
    relatedExperiencesState,
  }),
});
