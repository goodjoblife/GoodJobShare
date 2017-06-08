import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import status from '../constants/status';
import {
  SET_EXPERIENCE,
  SET_TOS,
  SET_COMMENT,
  SET_REPLY_STATUS,
  SET_REPLIES,
} from '../actions/experienceDetail';

const preloadedState = fromJS({
  experienceStatus: status.UNFETCHED,
  experienceError: null,
  experience: {},
  tos: false,
  comment: '',
  replyStatus: status.UNFETCHED,
  replyError: null,
  replies: [],
});

const experienceDetail = createReducer(preloadedState, {
  [SET_EXPERIENCE]: (state, action) => {
    console.log(SET_EXPERIENCE);
    return state.update('experience', () => fromJS(action.experience));
  },

  [SET_TOS]: state => state.update('tos', v => !v),

  [SET_COMMENT]: (state, action) =>
    state.update('comment', () => action.comment),

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
