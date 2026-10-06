import { AnyAction } from 'redux';

import { InterviewExperience, WorkExperience } from 'apis/experience';
import queryExperienceApi from 'apis/queryExperience';
import queryPopularExperiencesApi, {
  PopularExperience,
} from 'apis/queryPopularExperiences';
import { Thunk } from 'reducers';
import { tokenSelector } from 'selectors/authSelector';
import {
  experienceBoxSelectorAtId,
  popularExperiencesBoxSelector,
} from 'selectors/experienceSelector';
import { isGraphqlError, UiNotFoundError } from 'utils/errors';
import FetchBox, {
  getError,
  getFetched,
  isUnfetched,
  toFetching,
} from 'utils/fetchBox';

export const SET_EXPERIENCE = '@@EXPERIENCE/SET_EXPERIENCE';
export const SET_POPULAR_EXPERIENCES = '@@EXPERIENCE/SET_POPULAR_EXPERIENCES';

// state is related to experienceId
export const setExperience = (
  experienceId: string,
  box: FetchBox<WorkExperience | InterviewExperience | null>,
): AnyAction => ({
  type: SET_EXPERIENCE,
  experienceId,
  box,
});

export const queryExperience = (experienceId: string): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
  const token = tokenSelector(getState());
  dispatch(setExperience(experienceId, toFetching()));

  try {
    const experience = await queryExperienceApi({
      id: experienceId,
      token,
    });

    if (experience === null) {
      dispatch(setExperience(experienceId, getError(new UiNotFoundError())));
      return;
    }

    return dispatch(setExperience(experienceId, getFetched(experience)));
  } catch (error) {
    if (isGraphqlError(error)) {
      dispatch(setExperience(experienceId, getError(error)));
      return;
    }

    // Unexpected error
    throw error;
  }
};

export const queryExperienceIfUnfetched = (
  experienceId: string,
): Thunk => async (dispatch, getState): Promise<unknown> => {
  if (isUnfetched(experienceBoxSelectorAtId(experienceId)(getState()))) {
    return dispatch(queryExperience(experienceId));
  }
};

const setPopularExperiences = (
  box: FetchBox<PopularExperience[]>,
): AnyAction => ({
  type: SET_POPULAR_EXPERIENCES,
  popularExperiences: box,
});

export const queryPopularExperiences = (): Thunk => async dispatch => {
  dispatch(setPopularExperiences(toFetching()));

  try {
    const experiences = await queryPopularExperiencesApi();
    dispatch(setPopularExperiences(getFetched(experiences)));
  } catch (error) {
    dispatch(setPopularExperiences(getError(error)));
  }
};

export const queryPopularExperiencesIfUnfetched = (): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
  const box = popularExperiencesBoxSelector(getState());

  if (isUnfetched(box)) {
    return dispatch(queryPopularExperiences());
  }
};
