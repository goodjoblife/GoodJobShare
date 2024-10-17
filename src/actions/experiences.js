import { getError, getFetched, toFetching, isUnfetched } from 'utils/fetchBox';
import { tokenSelector } from 'selectors/authSelector';
import { experienceCountBoxSelector } from 'selectors/countSelector';
import { queryExperienceCountApi } from 'apis/experiencesApi';
import { postInterviewExperience as postInterviewExperienceApi } from 'apis/interviewExperiencesApi';
import {
  postWorkExperience as postWorkExperienceApi,
  postWorkExperienceWithRating as postWorkExperienceWithRatingApi,
} from 'apis/workExperiencesApi';
import { queryMyPublishIds } from './me';

export const SET_COUNT = '@@EXPERIENCES/SET_COUNT';

const setCount = countBox => ({
  type: SET_COUNT,
  countBox,
});

export const queryExperienceCount = () => async (dispatch, getState) => {
  dispatch(setCount(toFetching()));
  try {
    const count = await queryExperienceCountApi();
    dispatch(setCount(getFetched(count)));
  } catch (error) {
    dispatch(setCount(getError(error)));
  }
};

export const queryExperienceCountIfUnfetched = () => async (
  dispatch,
  getState,
) => {
  if (isUnfetched(experienceCountBoxSelector(getState()))) {
    return dispatch(queryExperienceCount());
  }
};

export const createInterviewExperience = ({ body }) => async (
  dispatch,
  getState,
) => {
  const state = getState();
  const token = tokenSelector(state);

  const result = await postInterviewExperienceApi({
    body,
    token,
  });

  await dispatch(queryMyPublishIds());

  return result;
};

export const createWorkExperience = ({ body }) => async (
  dispatch,
  getState,
) => {
  const state = getState();
  const token = tokenSelector(state);

  const result = await postWorkExperienceApi({
    body,
    token,
  });

  await dispatch(queryMyPublishIds());

  return result;
};

export const createWorkExperienceWithRating = ({ body }) => async (
  dispatch,
  getState,
) => {
  const state = getState();
  const token = tokenSelector(state);

  const result = await postWorkExperienceWithRatingApi({
    body,
    token,
  });

  await dispatch(queryMyPublishIds());

  return result;
};
