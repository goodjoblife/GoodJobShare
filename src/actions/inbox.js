import { queryInboxApi, readInboxApi } from 'apis/inbox';
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

export const readInbox = () => async (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  const box = messagesBoxSelector(getState());
  if (isFetching(box) || isFetched(box)) return;

  const unreadIds = box.data.filter(({ read }) => !read).map(({ id }) => id);

  if (unreadIds.length === 0) return;

  // Optimistically mark all unread messages as read in the local state
  const prevBox = box;
  const newBox = {
    ...box,
    data: box.data.map(message => ({ ...message, read: true })),
  };
  dispatch(setInbox(newBox));

  try {
    await readInboxApi({ token, ids: unreadIds });
    // Do nothing, local state already updated
  } catch (error) {
    console.error(error);

    // Revert local state if API fails
    dispatch(setInbox(prevBox));
  }
};
