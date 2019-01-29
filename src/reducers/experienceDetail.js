import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import fetchingStatus from '../constants/status';
import {
  SET_EXPERIENCE,
  SET_EXPERIENCE_STATUS,
  SET_REPLIES_STATUS,
  SET_REPLIES_DATA,
  SET_REPLY_LIKED,
} from '../actions/experienceDetail';

const preloadedState = fromJS({
  experienceStatus: fetchingStatus.UNFETCHED,
  experienceError: null,
  experience: {},
  repliesExperienceId: null,
  replyStatus: fetchingStatus.UNFETCHED,
  replyError: null,
  replies: [],
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

  [SET_REPLIES_STATUS]: (state, { status }) => state.set('replyStatus', status),

  [SET_REPLIES_DATA]: (state, { experienceId, status, replies, error }) =>
    state
      .set('repliesExperienceId', experienceId)
      .set('replyStatus', status)
      .set('replies', fromJS(replies))
      .set('error', error),

  [SET_REPLY_LIKED]: (state, { replyId, liked }) => {
    const index = state
      .get('replies')
      .findIndex(reply => reply.get('_id') === replyId);
    if (index === -1) {
      return state;
    }

    return state.updateIn(['replies', index], reply =>
      reply
        .set('liked', liked)
        .update('like_count', v => (liked === true ? v + 1 : v - 1)),
    );
  },
});

export default experienceDetail;
