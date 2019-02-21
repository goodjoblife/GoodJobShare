import R from 'ramda';
import fetchingStatus, { isUnfetched } from '../constants/status';
import { tokenSelector } from '../selectors/authSelector';

export const SET_COUNT_DATA = '@@EXPERIENCES/SET_COUNT_DATA';

const setCountData = (count, status, error = null) => ({
  type: SET_COUNT_DATA,
  count,
  status,
  error,
});

export const queryExperienceCount = () => (dispatch, getState, { api }) => {
  dispatch(setCountData(0, fetchingStatus.FETCHING));
  const opt = {
    searchType: ['interview', 'work', 'intern'],
    limit: 1,
    start: 0,
    sort: 'created_at',
  };

  return api.experiences
    .getExperiences(opt)
    .then(rawData => {
      const count = R.prop('total')(rawData);
      dispatch(setCountData(count, fetchingStatus.FETCHED));
    })
    .catch(error => {
      dispatch(setCountData(0, fetchingStatus.ERROR, error));
    });
};

export const queryExperienceCountIfUnfetched = () => (dispatch, getState) => {
  if (isUnfetched(getState().experiences.get('countStatus'))) {
    return dispatch(queryExperienceCount());
  }
  return Promise.resolve();
};

export const createInterviewExperience = ({ body }) => (
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const token = tokenSelector(state);

  return api.interviewExperiences.postInterviewExperience({
    body,
    token,
  });
};

export const createWorkExperience = ({ body }) => (
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const token = tokenSelector(state);

  return api.workExperiences.postWorkExperience({
    body,
    token,
  });
};
