import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import status from '../constants/status';
import {
  SET_EXPERIENCE,
  SET_REPLY_STATUS,
  SET_REPLIES,
} from '../actions/experienceDetail';

const preloadedState = fromJS({
  experience: {},
  replyStatus: status.UNFETCHED,
  replyError: null,
  replies: [],
});

const experienceDetail = createReducer(preloadedState, {
  [SET_EXPERIENCE]: (state, action) => {
    console.log(SET_EXPERIENCE);
    return state.update('experience', () => fromJS(action.experience));
  },

  [SET_REPLY_STATUS]: (state, action) =>
    state.update('replyStatus', () => action.replyStatus),

  [SET_REPLIES]: (state, action) =>
    state.merge({
      replyStatus: action.replyStatus,
      replyError: action.replyError,
      replies: fromJS(action.replies),
    }),
});

export default experienceDetail;
