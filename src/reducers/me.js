import { fromJS } from 'immutable';

import createReducer from 'utils/createReducer';
import status from '../constants/status';
import {
  SET_MY_EXPERIENCES,
  SET_MY_EXPERIENCES_STATUS,
  SET_MY_WORKINGS,
  SET_MY_WORKINGS_STATUS,
  SET_MY_REPLIES,
  SET_MY_REPLIES_STATUS,
} from '../actions/me';

const preloadedState = fromJS({
  myExperiencesStatus: status.UNFETCHED,
  myExperiencesError: null,
  myExperiences: {},
  myWorkingsStatus: status.UNFETCHED,
  myWorkingsError: null,
  myWorkings: {},
  myRepliesStatus: status.UNFETCHED,
  myRepliesError: null,
  myReplies: {},
});

const me = createReducer(preloadedState, {
  [SET_MY_EXPERIENCES]: (state, action) =>
    state.merge({
      myExperiencesStatus: action.myExperiencesStatus,
      myExperiencesError: action.myExperiencesError,
      myExperiences: fromJS(action.myExperiences),
    }),

  [SET_MY_EXPERIENCES_STATUS]: (state, action) =>
    state.update('myExperiencesStatus', () => action.status),

  [SET_MY_WORKINGS]: (state, action) =>
    state.merge({
      myWorkingsStatus: action.myWorkingsStatus,
      myWorkingsError: action.myWorkingsError,
      myWorkings: fromJS(action.myWorkings),
    }),

  [SET_MY_WORKINGS_STATUS]: (state, action) =>
    state.update('myWorkings', () => action.status),

  [SET_MY_REPLIES]: (state, action) =>
    state.merge({
      myRepliesStatus: action.myRepliesStatus,
      myRepliesError: action.myRepliesError,
      myReplies: fromJS(action.myReplies),
    }),

  [SET_MY_REPLIES_STATUS]: (state, action) =>
    state.update('myReplies', () => action.status),
});

export default me;
