import fetchingStatus from '../constants/status';
import { tokenSelector } from '../selectors/authSelector';

export const SET_REPLIES_STATUS = '@@EXPERIENCE_DETAIL/SET_REPLIES_STATUS';
export const SET_REPLIES_DATA = '@@EXPERIENCE_DETAIL/SET_REPLIES_DATA';
export const SET_REPLY_LIKED = '@@EXPERIENCE_DETAIL/REPLY/SET_LIKED';

const repliesExperienceIdSelector = state =>
  state.experienceDetail.get('repliesExperienceId');

const resetRepliesData = experienceId => ({
  type: SET_REPLIES_DATA,
  experienceId,
  status: fetchingStatus.UNFETCHED,
  error: null,
  replies: [],
});

const setRepliesData = (experienceId, { status, replies, error = null }) => (
  dispatch,
  getState,
) => {
  if (experienceId === repliesExperienceIdSelector(getState())) {
    return dispatch({
      type: SET_REPLIES_DATA,
      experienceId,
      status,
      error,
      replies,
    });
  }
  return Promise.resolve();
};

export const submitComment = (id, comment) => (dispatch, getState, { api }) => {
  const state = getState();
  const token = tokenSelector(state);

  const oldReplies = getState()
    .experienceDetail.get('replies')
    .toJS();

  return api.experiences
    .postExperienceReply({ id, comment, token })
    .then(result => {
      dispatch(
        setRepliesData(id, {
          status: fetchingStatus.FETCHED,
          replies: [...oldReplies, result.reply],
        }),
      );
    });
};

const setReplyLiked = (replyId, liked) => ({
  type: SET_REPLY_LIKED,
  replyId,
  liked,
});

export const likeReply = reply => (dispatch, getState, { api }) => {
  const state = getState();
  const token = tokenSelector(state);

  const { _id: replyId, liked } = reply;

  if (liked) {
    return api.experiences
      .deleteReplyLikes({ id: replyId, token })
      .then(result => {
        dispatch(setReplyLiked(replyId, false));
      });
  }

  return api.experiences.postReplyLikes({ id: replyId, token }).then(result => {
    dispatch(setReplyLiked(replyId, true));
  });
};

export const fetchReplies = id => (dispatch, getState, { api }) => {
  const state = getState();
  const token = tokenSelector(state);

  if (id !== repliesExperienceIdSelector(getState())) {
    dispatch(resetRepliesData(id));
  }

  dispatch({
    type: SET_REPLIES_STATUS,
    status: fetchingStatus.FETCHING,
  });

  return api.experiences
    .getExperienceReply({
      experienceId: id,
      start: 0,
      limit: 100,
      token,
    })
    .then(rawData => {
      const replies = rawData.replies;
      return dispatch(
        setRepliesData(id, {
          status: fetchingStatus.FETCHED,
          replies,
        }),
      );
    })
    .catch(error =>
      dispatch(
        setRepliesData(id, {
          status: fetchingStatus.ERROR,
          error,
          replies: [],
        }),
      ),
    );
};
