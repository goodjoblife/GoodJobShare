import { queryInboxApi } from 'apis/inbox';
import { tokenSelector } from 'selectors/authSelector';
import { messagesBoxSelector } from 'selectors/inbox';
import {
  getError,
  getFetched,
  isFetched,
  isFetching,
  toFetching,
} from 'utils/fetchBox';

export const SET_INBOX = '@@inbox/SET_INBOX';
export const READ_INBOX = '@@inbox/READ_INBOX';

const setInbox = box => ({
  type: SET_INBOX,
  box,
});

export const fetchInbox = ({ start, limit }) => async (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  const box = messagesBoxSelector(getState());
  if (isFetching(box) || isFetched(box)) return;

  try {
    dispatch(setInbox(toFetching()));
    const userNotifications = await queryInboxApi({ token, start, limit });
    dispatch(setInbox(getFetched(userNotifications)));
  } catch (error) {
    console.error(error);
    dispatch(setInbox(getError(error)));
  }
};

export const readInbox = () => ({
  type: READ_INBOX,
});
