import R from 'ramda';
import fetchingStatus from '../constants/status';

export const SET_DATA = '@@POPULAR_EXPERIENCES/SET_DATA';
export const SET_STATUS = '@@POPULAR_EXPERIENCES/SET_STATUS';

const startFetching = () => ({
  type: SET_STATUS,
  status: fetchingStatus.FETCHING,
});
const setData = ({ data, status, error = null }) => ({
  type: SET_DATA,
  status,
  data,
  error,
});

export const queryPopularExperiences = (limit = 3) => (
  dispatch,
  getState,
  { api },
) => {
  dispatch(startFetching());

  const opt = {
    start: 1,
    limit,
    sort: 'popularity',
    searchType: ['interview', 'work'],
  };

  return api.experiences
    .getExperiences(opt)
    .then(rawData => {
      const experiences = R.prop('experiences')(rawData);
      dispatch(
        setData({
          status: fetchingStatus.FETCHED,
          data: experiences,
        }),
      );
    })
    .catch(error => {
      dispatch(setData({ status: fetchingStatus.ERROR, data: [], error }));
    });
};
