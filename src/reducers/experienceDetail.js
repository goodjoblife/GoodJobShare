import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import fetchingStatus from 'constants/status';
import {
  SET_EXPERIENCE,
  SET_EXPERIENCE_STATUS,
} from 'actions/experienceDetail';

const preloadedState = fromJS({
  experienceStatus: fetchingStatus.UNFETCHED,
  experienceError: null,
  experience: null,
});

const experienceDetail = createReducer(preloadedState, {
  [SET_EXPERIENCE]: (state, action) =>
    state.merge({
      experienceStatus: action.experienceStatus,
      experienceError: action.experienceError,
      experience: fromJS(action.experience),
    }),

  [SET_EXPERIENCE_STATUS]: (state, action) =>
    state.update('experienceStatus', () => action.status),
});

export default experienceDetail;
