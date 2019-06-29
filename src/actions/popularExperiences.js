import R from 'ramda';
import fetchingStatus from '../constants/status';
import { tokenSelector } from '../selectors/authSelector';

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

export const queryPopularExperiences = () => (dispatch, getState, { api }) => {
  dispatch(startFetching());

  const state = getState();
  const token = tokenSelector(state);

  return api.experiences
    .getPopularExperiences({ token })
    .then(experiences => {
      dispatch(
        setData({
          status: fetchingStatus.FETCHED,
          data: R.map(({ id, job_title, ...rest }) => ({
            // TODO 未來 migrate 掉
            _id: id,
            job_title: job_title.name,
            ...rest,
          }))(experiences),
        }),
      );
    })
    .catch(error => {
      dispatch(setData({ status: fetchingStatus.ERROR, data: [], error }));
    });
};
