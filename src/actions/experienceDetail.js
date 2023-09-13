import fetchingStatus from '../constants/status';
import { tokenSelector } from '../selectors/authSelector';

<<<<<<< HEAD
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
=======
export const SET_EXPERIENCE = '@@experienceDetail/SET_EXPERIENCE';
export const SET_EXPERIENCE_STATUS = '@@experienceDetail/SET_EXPERIENCE_STATUS';

export const setExperience = experience => ({
  type: SET_EXPERIENCE,
  experienceStatus: fetchingStatus.FETCHED,
  experienceError: null,
  experience,
});

export const createReply = (experienceId, comment) => (
>>>>>>> upstream/master
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const token = tokenSelector(state);

  return api.experiences.postExperienceReply({
    id: experienceId,
    comment,
    token,
  });
};

<<<<<<< HEAD
export const fetchReplies = id => (dispatch, getState, { api }) => {
  const state = getState();
  const token = tokenSelector(state);

  if (id !== repliesExperienceIdSelector(getState())) {
    dispatch(resetRepliesData(id));
  }

  dispatch({
    type: SET_REPLIES_STATUS,
=======
export const fetchExperience = id => (dispatch, getState, { api }) => {
  const state = getState();
  const token = tokenSelector(state);

  dispatch({
    type: SET_EXPERIENCE_STATUS,
>>>>>>> upstream/master
    status: fetchingStatus.FETCHING,
  });

  return api.experiences
<<<<<<< HEAD
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
=======
    .getExperience({ id, token })
    .then(experience => {
      if (experience === null) {
        return dispatch({
          type: SET_EXPERIENCE,
          experienceStatus: fetchingStatus.ERROR,
          experienceError: new UiNotFoundError(),
          experience: null,
        });
      }

      dispatch(setExperience(experience));
    })
    .catch(error => {
      if (isGraphqlError(error)) {
        dispatch({
          type: SET_EXPERIENCE,
          experienceStatus: fetchingStatus.ERROR,
          experienceError: error,
          experience: null,
        });
      } else {
        // Unexpected error
        throw error;
      }
    });
>>>>>>> upstream/master
};
