import R from 'ramda';
import { getExperiences as getExperiencesApi } from '../apis/experiencesApi';
import fetchingStatus from '../constants/status';

export const SET_DATA = '@@POPULAR_EXPERIENCES/SET_DATA';
export const SET_STATUS = '@@POPULAR_EXPERIENCES/SET_STATUS';

const startFetching = () =>
  ({ type: SET_STATUS, status: fetchingStatus.FETCHING });
const setData = ({ data, status, error = null }) =>
  ({
    type: SET_DATA,
    status,
    data,
    error,
  });

export const queryPopularExperiences = (limit = 3) =>
  dispatch => {
    dispatch(startFetching());

    const opt = {
      start: 1,
      limit,
      sort: 'popularity',
      searchType: ['interview', 'work'],
    };

    return getExperiencesApi(opt)
      .then(rawData => {
        const experiences = R.prop('experiences')(rawData);
        dispatch(setData({ status: fetchingStatus.FETCHED, data: experiences }));
      })
      .catch(error => {
        dispatch(setData({ status: fetchingStatus.ERROR, data: [], error }));
      });
  };
