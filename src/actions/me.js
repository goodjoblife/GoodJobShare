import { queryMyPublishIdsApi } from 'apis/me';
import { tokenSelector } from 'selectors/authSelector';
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

export const queryMyPublishIdsIfNeeded = () => async (dispatch, getState) => {
  const myPublishIdsBox = myPublishIdsSelector(getState());

  if (isUnfetched(myPublishIdsBox) || isError(myPublishIdsBox)) {
    dispatch(queryMyPublishIds());
  }
};

export const queryMyPublishIds = () => async (dispatch, getState) => {
  const token = tokenSelector(getState());
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
