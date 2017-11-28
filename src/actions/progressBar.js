import { getExperiences } from '../apis/experiencesApi';

export const SET_PROGRESS_BAR_STATE = '@@progressBarData/SET_PROGRESS_BAR_DATA';

export const setProgressBarState = (experienceCount, hasFetched, err) => ({
  type: SET_PROGRESS_BAR_STATE,
  experienceCount,
  hasFetched,
  err,
});

export const queryExperienceCount = () =>
  dispatch => {
    const query = {
      limit: 1,
      start: 0,
      sort: 'created_at',
    };

    return getExperiences(query).then(data => {
      const experiecnceCount = data.total;
      dispatch(setProgressBarState(experiecnceCount, true, null));
    }).catch(err => {
      dispatch(setProgressBarState(0, false, err));
    });
  };
