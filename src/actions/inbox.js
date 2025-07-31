import { queryInboxApi, readInboxApi, readInboxMessageApi } from 'apis/inbox';
import { tokenSelector } from 'selectors/authSelector';
import { messagesBoxSelector } from 'selectors/inbox';
import {
  getError,
  getFetched,
  isFetched,
  isFetching,
  toFetching,
} from 'utils/fetchBox';

export const SET_INBOX_COUNT = '@@inbox/SET_INBOX_COUNT';
export const SET_INBOX = '@@inbox/SET_INBOX';

const setInboxCount = count => ({
  type: SET_INBOX_COUNT,
  count,
});

export const readInbox = () => async (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  try {
    await readInboxApi({ token });
    dispatch(setInboxCount(0));
  } catch (error) {
    console.error(error);
  }
};

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

    const {
      notificationCountSinceBellLastOpen,
      userNotifications,
    } = await queryInboxApi({ token, start, limit });

    dispatch(setInboxCount(notificationCountSinceBellLastOpen));
    dispatch(setInbox(getFetched(userNotifications)));
  } catch (error) {
    console.error(error);
    dispatch(setInbox(getError(error)));
  }
};

export const readInboxMessage = ({ id }) => async (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  const oldBox = messagesBoxSelector(getState());
  const newBox = {
    ...oldBox,
    data:
      oldBox.data && oldBox.data.map(message => ({ ...message, read: true })),
  };

  try {
    await readInboxMessageApi({ token, id });
    dispatch(setInbox(newBox));
  } catch (error) {
    console.error(error);
  }
};
