import { queryMyPublishIdsApi } from 'apis/me';
import { myPublishIdsSelector } from 'selectors/me';
import {
  isUnfetched,
  isError,
  getError,
  getFetched,
  toFetching,
} from 'utils/fetchBox';

export const SET_MY_PUBLISH_IDS = '@@me/SET_MY_PUBLISH_IDS';

const setMyPublishIds = box => ({
  type: SET_MY_PUBLISH_IDS,
  box,
});

// We don't obtain the token from the state but from the argument
// to indicate the need to be called on token change.
export const queryMyPublishIdsIfNeeded = ({ token }) => async (
  dispatch,
  getState,
) => {
  const myPublishIdsBox = myPublishIdsSelector(getState());

  if (isUnfetched(myPublishIdsBox) || isError(myPublishIdsBox)) {
    dispatch(queryMyPublishIds({ token }));
  }
};

// We don't obtain the token from the state but from the argument
// to indicate the need to be called on token change.
export const queryMyPublishIds = ({ token }) => async dispatch => {
  if (!token) {
    // If user has not logged in, it's assumed to have no publishes.
    dispatch(setMyPublishIds(getFetched([])));
    return;
  }

  dispatch(setMyPublishIds(toFetching()));
  try {
    const myPublishIds = await queryMyPublishIdsApi({ token });
    dispatch(setMyPublishIds(getFetched(myPublishIds)));
  } catch (error) {
    dispatch(setMyPublishIds(getError(error)));
  }
};
