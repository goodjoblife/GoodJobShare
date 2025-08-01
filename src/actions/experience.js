import { concat } from 'ramda';
import {
  getError,
  getFetched,
  toFetching,
  isFetching,
  isUnfetched,
} from 'utils/fetchBox';
import { isGraphqlError, UiNotFoundError } from 'utils/errors';
import { tokenSelector } from 'selectors/authSelector';
import {
  experienceBoxSelectorAtId,
  relatedExperiencesCabinSelector,
  relatedExperiencesStateSelector,
  popularExperiencesBoxSelector,
} from 'selectors/experienceSelector';
import {
  queryExperience as queryExperienceApi,
  queryRelatedExperiences as queryRelatedExperiencesApi,
  getPopularExperiences as queryPopularExperiencesApi,
} from 'apis/experiencesApi';

export const SET_EXPERIENCE = '@@EXPERIENCE/SET_EXPERIENCE';
export const SET_RELATED_EXPERIENCES = '@@EXPERIENCE/SET_RELATED_EXPERIENCES';
export const SET_POPULAR_EXPERIENCES = '@@EXPERIENCE/SET_POPULAR_EXPERIENCES';

// state is related to experienceId
export const setExperience = (experienceId, box) => ({
  type: SET_EXPERIENCE,
  experienceId,
  box,
});

export const queryExperience = experienceId => async (dispatch, getState) => {
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

export const queryExperienceIfUnfetched = experienceId => async (
  dispatch,
  getState,
) => {
  if (isUnfetched(experienceBoxSelectorAtId(experienceId)(getState()))) {
    return dispatch(queryExperience(experienceId));
  }
};

const setRelatedExperiences = (experienceId, page, state) => ({
  type: SET_RELATED_EXPERIENCES,
  relatedExperiences: {
    experienceId,
    page,
    state,
  },
});

export const queryRelatedExperiencesOnExperience = experienceId => async (
  dispatch,
  getState,
) => {
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

export const loadMoreRelatedExperiences = () => async (dispatch, getState) => {
  const cabin = relatedExperiencesCabinSelector(getState());
  const state = relatedExperiencesStateSelector(getState()); // FetchBox

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

    if (experienceId === prev.experienceId && page === prev.page) {
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
      dispatch(setRelatedExperiences(getError(error)));
    }
  }
};

const setPopularExperiences = box => ({
  type: SET_POPULAR_EXPERIENCES,
  popularExperiences: box,
});

export const queryPopularExperiences = () => async (dispatch, getState) => {
  dispatch(setPopularExperiences(toFetching()));

  try {
    const experiences = await queryPopularExperiencesApi();
    dispatch(setPopularExperiences(getFetched(experiences)));
  } catch (error) {
    dispatch(setPopularExperiences(getError(error)));
  }
};

export const queryPopularExperiencesIfUnfetched = experienceId => async (
  dispatch,
  getState,
) => {
  const box = popularExperiencesBoxSelector(getState());

  if (isUnfetched(box)) {
    return dispatch(queryPopularExperiences(experienceId));
  }
};
