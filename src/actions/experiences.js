import R from 'ramda';
import { getExperiences } from '../apis/experiencesApi';
import fetchingStatus, { isUnfetched } from '../constants/status';

export const SET_COUNT_DATA = '@@EXPERIENCES/SET_COUNT_DATA';

const setCountData = (count, status, error = null) => ({
  type: SET_COUNT_DATA,
  count,
  status,
  error,
});

export const queryExperienceCount = () =>
  dispatch => {
    dispatch(setCountData(0, fetchingStatus.FETCHING));
    const opt = {
      limit: 1,
      start: 0,
      sort: 'created_at',
    };

    return getExperiences(opt)
      .then(rawData => {
        const count = R.prop('total')(rawData);
        dispatch(setCountData(count, fetchingStatus.FETCHED));
      }).catch(error => {
        dispatch(setCountData(0, fetchingStatus.ERROR, error));
      });
  };

export const queryExperienceCountIfUnfetched = () =>
(dispatch, getState) => {
  if (isUnfetched(getState().experiences.get('countStatus'))) {
    return dispatch(queryExperienceCount());
  }
  return Promise.resolve();
};
