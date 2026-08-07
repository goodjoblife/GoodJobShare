import { concat } from 'ramda';
import { AnyAction } from 'redux';

import { InterviewExperience, WorkExperience } from 'apis/experience';
import queryExperienceApi from 'apis/queryExperience';
import queryPopularExperiencesApi, {
  PopularExperience,
} from 'apis/queryPopularExperiences';
import queryRelatedExperiencesApi from 'apis/queryRelatedExperiences';
import { Thunk } from 'reducers';
import { RelatedExperiencesState } from 'reducers/experience';
import { tokenSelector } from 'selectors/authSelector';
import {
  experienceBoxSelectorAtId,
  popularExperiencesBoxSelector,
  relatedExperiencesCabinSelector,
  relatedExperiencesStateSelector,
} from 'selectors/experienceSelector';
import { isGraphqlError, UiNotFoundError } from 'utils/errors';
import FetchBox, {
  getError,
  getFetched,
  isFetching,
  isUnfetched,
  toFetching,
} from 'utils/fetchBox';

export const SET_EXPERIENCE = '@@EXPERIENCE/SET_EXPERIENCE';
export const SET_RELATED_EXPERIENCES = '@@EXPERIENCE/SET_RELATED_EXPERIENCES';
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

const setRelatedExperiences = (
  experienceId: string | null,
  page: number,
  state: RelatedExperiencesState['state'],
): AnyAction => ({
  type: SET_RELATED_EXPERIENCES,
  relatedExperiences: {
    experienceId,
    page,
    state,
  },
});

export const queryRelatedExperiencesOnExperience = (
  experienceId: string,
): Thunk => async (dispatch, getState): Promise<void> => {
  const page = 0;
  dispatch(setRelatedExperiences(experienceId, page, toFetching()));

  try {
    const relatedExperiences = await queryRelatedExperiencesApi({
      id: experienceId,
      start: page * 5,
      limit: 5,
    });

    const prev = relatedExperiencesCabinSelector(getState());

    if (experienceId === prev.experienceId && page === prev.page) {
      const hasMore = relatedExperiences.length < 5 ? false : true;
      const data = {
        relatedExperiences,
        hasMore,
      };

      dispatch(setRelatedExperiences(experienceId, page, getFetched(data)));
    }
  } catch (error) {
    dispatch(setRelatedExperiences(experienceId, page, getError(error)));
  }
};

export const loadMoreRelatedExperiences = (): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
  const cabin = relatedExperiencesCabinSelector(getState());
  const state = relatedExperiencesStateSelector(getState()); // FetchBox

  if (cabin.experienceId === null) {
    return;
  }

  // 判斷 isFetching
  if (isFetching(state)) {
    return;
  }

  const experienceId = cabin.experienceId;
  const page = cabin.page + 1;

  dispatch(setRelatedExperiences(experienceId, page, toFetching(state)));

  try {
    const relatedExperiences = await queryRelatedExperiencesApi({
      id: experienceId,
      start: page * 5,
      limit: 5,
    });

    const prev = relatedExperiencesCabinSelector(getState());
    const prevState = relatedExperiencesStateSelector(getState()); // FetchBox

    if (
      experienceId === prev.experienceId &&
      page === prev.page &&
      prevState.data
    ) {
      const hasMore = relatedExperiences.length < 5 ? false : true;
      const data = {
        relatedExperiences: concat(
          prevState.data.relatedExperiences,
          relatedExperiences,
        ),
        hasMore,
      };

      dispatch(setRelatedExperiences(experienceId, page, getFetched(data)));
    }
  } catch (error) {
    const prev = relatedExperiencesCabinSelector(getState());

    if (experienceId === prev.experienceId && page === prev.page) {
      dispatch(setRelatedExperiences(experienceId, page, getError(error)));
    }
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
