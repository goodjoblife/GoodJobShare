import fetchingStatus from '../constants/status';
import { tokenSelector } from '../selectors/authSelector';

export const SET_EXPERIENCE = '@@experienceDetail/SET_EXPERIENCE';
export const SET_EXPERIENCE_STATUS = '@@experienceDetail/SET_EXPERIENCE_STATUS';
export const SET_REPLIES_STATUS = '@@EXPERIENCE_DETAIL/SET_REPLIES_STATUS';
export const SET_REPLIES_DATA = '@@EXPERIENCE_DETAIL/SET_REPLIES_DATA';
export const SET_REPLY_LIKED = '@@EXPERIENCE_DETAIL/REPLY/SET_LIKED';

const repliesExperienceIdSelector = state =>
  state.experienceDetail.get('repliesExperienceId');

export const setExperience = experience => ({
  type: SET_EXPERIENCE,
  experienceStatus: fetchingStatus.FETCHED,
  experienceError: null,
  experience,
});

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

export const likeExperience = o => (dispatch, getState, { api }) => {
  const state = getState();
  const token = tokenSelector(state);

  if (o.liked) {
    return api.experiences
      .deleteExperienceLikes({ id: o._id, token })
      .then(result => {
        if (result.success) {
          dispatch(
            setExperience(
              Object.assign({}, o, {
                liked: false,
                like_count: o.like_count - 1,
              }),
            ),
          );
          return;
        }
        dispatch(setExperience(o));
      });
  }

  return api.experiences
    .postExperienceLikes({ id: o._id, token })
    .then(result => {
      if (result.success) {
        dispatch(
          setExperience(
            Object.assign({}, o, {
              liked: true,
              like_count: o.like_count + 1,
            }),
          ),
        );
        return;
      }
      dispatch(setExperience(o));
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
        if (result.success) {
          return dispatch(setReplyLiked(replyId, false));
        }
        return Promise.resolve();
      });
  }

  return api.experiences.postReplyLikes({ id: replyId, token }).then(result => {
    if (result.success) {
      return dispatch(setReplyLiked(replyId, true));
    }
    return Promise.resolve();
  });
};

export const fetchExperience = id => (dispatch, getState, { api }) => {
  const state = getState();
  const token = tokenSelector(state);

  dispatch({
    type: SET_EXPERIENCE_STATUS,
    status: fetchingStatus.FETCHING,
  });

  return api.experiences
    .getExperience({ id, token })
    .then(result => {
      dispatch(setExperience(result));
    })
    .catch(error => {
      dispatch({
        type: SET_EXPERIENCE,
        experienceStatus: fetchingStatus.ERROR,
        experienceError: error,
        experience: {},
      });
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
