import R from 'ramda';
import fetchingStatus, { isUnfetched } from 'constants/status';
import { tokenSelector } from 'selectors/authSelector';
import { getExperiences as getExperiencesApi } from 'apis/experiencesApi';
import { postInterviewExperience as postInterviewExperienceApi } from 'apis/interviewExperiencesApi';
import { postWorkExperience as postWorkExperienceApi } from 'apis/workExperiencesApi';

export const SET_COUNT_DATA = '@@EXPERIENCES/SET_COUNT_DATA';

const setCountData = (count, status, error = null) => ({
  type: SET_COUNT_DATA,
  count,
  status,
  error,
});

export const queryExperienceCount = () => (dispatch, getState) => {
  dispatch(setCountData(0, fetchingStatus.FETCHING));
  const opt = {
    searchType: ['interview', 'work', 'intern'],
    limit: 1,
    start: 0,
    sort: 'created_at',
  };

  return getExperiencesApi(opt)
    .then(rawData => {
      const count = R.prop('total')(rawData);
      dispatch(setCountData(count, fetchingStatus.FETCHED));
    })
    .catch(error => {
      dispatch(setCountData(0, fetchingStatus.ERROR, error));
    });
};

export const queryExperienceCountIfUnfetched = () => (dispatch, getState) => {
  if (isUnfetched(getState().experiences.countStatus)) {
    return dispatch(queryExperienceCount());
  }
  return Promise.resolve();
};

export const createInterviewExperience = ({ body }) => (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  return postInterviewExperienceApi({
    body,
    token,
  });
};

export const createWorkExperience = ({ body }) => (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  return postWorkExperienceApi({
    body,
    token,
  });
};
