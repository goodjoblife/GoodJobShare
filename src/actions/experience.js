import { concat } from 'ramda';
import { getError, getFetched, toFetching, isFetching } from 'utils/fetchBox';
import { relatedExperiencesStateSelector } from 'selectors/experienceSelector';

export const SET_RELATED_EXPERIENCES = '@@EXPERIENCE/SET_RELATED_EXPERIENCES';

const setRelatedExperiencesState = relatedExperiencesState => ({
  type: SET_RELATED_EXPERIENCES,
  relatedExperiencesState,
});

export const queryRelatedExperiencesOnExperience = experienceId => async (
  dispatch,
  getState,
  { api },
) => {
  const page = 0;

  dispatch(
    setRelatedExperiencesState(
      // this is an work around
      toFetching({
        data: {
          experienceId,
          page,
          relatedExperiences: [],
          hasMore: false,
        },
      }),
    ),
  );

  try {
    const relatedExperiences = await api.experiences.queryRelatedExperiences({
      id: experienceId,
      start: page * 5,
      limit: 5,
    });

    const previousState = relatedExperiencesStateSelector(getState()); // FetchBox

    if (
      experienceId === previousState.data.experienceId &&
      page === previousState.data.page
    ) {
      const hasMore = relatedExperiences.length < 5 ? false : true;

      dispatch(
        setRelatedExperiencesState(
          getFetched({
            experienceId,
            page,
            relatedExperiences,
            hasMore,
          }),
        ),
      );
    }
  } catch (error) {
    dispatch(setRelatedExperiencesState(getError(error)));
  }
};

export const loadMoreRelatedExperiences = () => async (
  dispatch,
  getState,
  { api },
) => {
  const state = relatedExperiencesStateSelector(getState()); // FetchBox

  // 判斷 isFetching
  if (isFetching(state)) {
    return;
  }

  const experienceId = state.data.experienceId;
  const page = state.data.page + 1;

  dispatch(
    setRelatedExperiencesState(
      // this is an work around
      toFetching({
        data: {
          experienceId,
          page,
          relatedExperiences: state.data.relatedExperiences,
          hasMore: false,
        },
      }),
    ),
  );

  try {
    const relatedExperiences = await api.experiences.queryRelatedExperiences({
      id: experienceId,
      start: page * 5,
      limit: 5,
    });

    const previousState = relatedExperiencesStateSelector(getState()); // FetchBox

    if (
      experienceId === previousState.data.experienceId &&
      page === previousState.data.page
    ) {
      const hasMore = relatedExperiences.length < 5 ? false : true;

      dispatch(
        setRelatedExperiencesState(
          getFetched({
            experienceId,
            page,
            relatedExperiences: concat(
              previousState.data.relatedExperiences,
              relatedExperiences,
            ),
            hasMore,
          }),
        ),
      );
    }
  } catch (error) {
    dispatch(setRelatedExperiencesState(getError(error)));
  }
};
