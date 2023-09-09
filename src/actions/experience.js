import { getError, getFetched, toFetching } from 'utils/fetchBox';
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

  // 判斷 isFetching

  dispatch(
    setRelatedExperiencesState(
      // this is an work around
      toFetching({
        data: {
          experienceId,
          page,
          relatedExperiences: [],
        },
      }),
    ),
  );

  try {
    const relatedExperiences = await api.experiences.queryRelatedExperiences({
      id: experienceId,
      start: page * 10,
      limit: 10,
    });

    const previousState = relatedExperiencesStateSelector(getState()); // FetchBox

    if (
      experienceId === previousState.data.experienceId &&
      page === previousState.data.page
    ) {
      dispatch(
        setRelatedExperiencesState(
          getFetched({
            experienceId,
            page,
            relatedExperiences,
          }),
        ),
      );
    }
  } catch (error) {
    dispatch(setRelatedExperiencesState(getError(error)));
  }
};
