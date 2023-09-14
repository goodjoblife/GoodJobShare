import { concat } from 'ramda';
import {
  getError,
  getFetched,
  toFetching,
  isFetching,
  isFetched,
} from 'utils/fetchBox';
import { isGraphqlError, UiNotFoundError } from 'utils/errors';
import { tokenSelector } from 'selectors/authSelector';
import {
  experienceCabinSelector,
  experienceStateSelector,
  relatedExperiencesCabinSelector,
  relatedExperiencesStateSelector,
} from 'selectors/experienceSelector';

export const SET_EXPERIENCE = '@@EXPERIENCE/SET_EXPERIENCE';
export const SET_RELATED_EXPERIENCES = '@@EXPERIENCE/SET_RELATED_EXPERIENCES';

// state is related to experienceId
const setExperience = (experienceId, state) => ({
  type: SET_EXPERIENCE,
  experience: {
    experienceId,
    state,
  },
});

export const queryExperienceIfUnfetched = experienceId => async (
  dispatch,
  getState,
  { api },
) => {
  const cabin = experienceCabinSelector(getState());
  const state = experienceStateSelector(getState());

  if (experienceId === cabin.experienceId && isFetched(state)) {
    return;
  }

  dispatch(queryExperience(experienceId));
};

export const queryExperience = experienceId => async (
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const token = tokenSelector(state);

  dispatch(setExperience(experienceId, toFetching()));

  try {
    const experience = await api.experiences.queryExperience({
      id: experienceId,
      token,
    });

    const prev = experienceCabinSelector(getState());
    if (experienceId === prev.experienceId) {
      if (experience === null) {
        dispatch(setExperience(experienceId, getError(new UiNotFoundError())));
        return;
      }

      return dispatch(setExperience(experienceId, getFetched(experience)));
    }
  } catch (error) {
    const prev = experienceCabinSelector(getState());
    if (experienceId === prev.experienceId) {
      if (isGraphqlError(error)) {
        dispatch(setExperience(experienceId, getError(error)));
        return;
      }

      // Unexpected error
      throw error;
    }
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
  { api },
) => {
  const page = 0;
  dispatch(setRelatedExperiences(experienceId, page, toFetching()));

  try {
    const relatedExperiences = await api.experiences.queryRelatedExperiences({
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

export const loadMoreRelatedExperiences = () => async (
  dispatch,
  getState,
  { api },
) => {
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
    const relatedExperiences = await api.experiences.queryRelatedExperiences({
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
