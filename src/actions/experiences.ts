import { AnyAction } from 'redux';

import { postInterviewExperience as postInterviewExperienceApi } from 'apis/interviewExperiencesApi';
import queryExperienceCountApi from 'apis/queryExperienceCount';
import { postWorkExperienceWithRating as postWorkExperienceWithRatingApi } from 'apis/workExperiencesApi';
import { Thunk } from 'reducers';
import { tokenSelector } from 'selectors/authSelector';
import { experienceCountBoxSelector } from 'selectors/countSelector';
import FetchBox, {
  getError,
  getFetched,
  isUnfetched,
  toFetching,
} from 'utils/fetchBox';

import { queryMyPublishIds } from './me';

export const SET_COUNT = '@@EXPERIENCES/SET_COUNT';

const setCount = (countBox: FetchBox<number>): AnyAction => ({
  type: SET_COUNT,
  countBox,
});

export const queryExperienceCount = (): Thunk => async (
  dispatch,
): Promise<void> => {
  dispatch(setCount(toFetching()));
  try {
    const count = await queryExperienceCountApi();
    dispatch(setCount(getFetched(count)));
  } catch (error) {
    dispatch(setCount(getError(error)));
  }
};

export const queryExperienceCountIfUnfetched = (): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
  if (isUnfetched(experienceCountBoxSelector(getState()))) {
    return dispatch(queryExperienceCount());
  }
};

export const createInterviewExperience = ({
  body,
}: {
  body: any; // TODO: fix me
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const state = getState();
  const token = tokenSelector(state);

  const result = await postInterviewExperienceApi({
    body,
    token,
  });

  await dispatch(queryMyPublishIds());

  return result;
};

export const createWorkExperienceWithRating = ({
  body,
}: {
  body: any; // TODO: fix me
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const state = getState();
  const token = tokenSelector(state);

  const result = await postWorkExperienceWithRatingApi({
    body,
    token,
  });

  await dispatch(queryMyPublishIds());

  return result;
};
