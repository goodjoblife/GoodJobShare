import { isGraphqlError } from 'utils/errors';

import fetchingStatus from '../constants/status';
import { tokenSelector } from '../selectors/authSelector';
import { UiNotFoundError } from 'utils/errors';

export const SET_EXPERIENCE = '@@experienceDetail/SET_EXPERIENCE';
export const SET_EXPERIENCE_STATUS = '@@experienceDetail/SET_EXPERIENCE_STATUS';

export const setExperience = experience => ({
  type: SET_EXPERIENCE,
  experienceStatus: fetchingStatus.FETCHED,
  experienceError: null,
  experience,
});

export const fetchExperience = id => (dispatch, getState, { api }) => {
  const state = getState();
  const token = tokenSelector(state);

  dispatch({
    type: SET_EXPERIENCE_STATUS,
    status: fetchingStatus.FETCHING,
  });

  return api.experiences
    .getExperience({ id, token })
    .then(experience => {
      if (experience === null) {
        return dispatch({
          type: SET_EXPERIENCE,
          experienceStatus: fetchingStatus.ERROR,
          experienceError: new UiNotFoundError(),
          experience: null,
        });
      }

      dispatch(setExperience(experience));
    })
    .catch(error => {
      if (isGraphqlError(error)) {
        dispatch({
          type: SET_EXPERIENCE,
          experienceStatus: fetchingStatus.ERROR,
          experienceError: error,
          experience: null,
        });
      } else {
        // Unexpected error
        throw error;
      }
    });
};
