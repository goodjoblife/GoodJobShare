import { Action } from 'redux';
import { Dispatch, GetState } from 'reducers';

import { queryInboxApi, openInboxApi, readInboxMessageApi } from 'apis/inbox';
import { tokenSelector } from 'selectors/authSelector';
import { messagesBoxSelector } from 'selectors/inbox';
import { getError, getFetched, isFetching, toFetching } from 'utils/fetchBox';
import { InboxMessage } from 'constants/inbox';
import FetchBox from 'utils/fetchBox';

export const SET_INBOX_COUNT = '@@inbox/SET_INBOX_COUNT';
export const SET_INBOX = '@@inbox/SET_INBOX';

// Set inbox count

export interface SetInboxCountAction {
  type: typeof SET_INBOX_COUNT;
  count: number;
}

const setInboxCount = (count: number): SetInboxCountAction => ({
  type: SET_INBOX_COUNT,
  count,
});

// Read inbox

export const openInbox = () => async (
  dispatch: Dispatch<Action>,
  getState: GetState,
) => {
  const state = getState();
  const token = tokenSelector(state);

  try {
    await openInboxApi({ token });
    dispatch(setInboxCount(0));
  } catch (error) {
    console.error(error);
  }
};

// Set inbox

export interface SetInboxAction {
  type: typeof SET_INBOX;
  box: FetchBox<InboxMessage[]>;
}

const setInbox = (box: FetchBox<InboxMessage[]>): SetInboxAction => ({
  type: SET_INBOX,
  box,
});

// Fetch inbox

export const fetchInbox = ({
  start,
  limit,
}: {
  start: number;
  limit: number;
}) => async (dispatch: Dispatch<Action>, getState: GetState) => {
  const state = getState();
  const token = tokenSelector(state);

  const box = messagesBoxSelector(getState());
  if (isFetching(box)) return;

  try {
    dispatch(setInbox(toFetching(box)));

    const { unreadCount, messages } = await queryInboxApi({
      token,
      start,
      limit,
    });

    dispatch(setInboxCount(unreadCount));
    dispatch(setInbox(getFetched(messages)));
  } catch (error) {
    console.error(error);
    dispatch(setInbox(getError(error)));
  }
};

// Read inbox message

export const readInboxMessage = ({ id }: { id: string }) => async (
  dispatch: Dispatch<Action>,
  getState: GetState,
) => {
  const state = getState();
  const token = tokenSelector(state);

  const oldBox = messagesBoxSelector(getState());
  const newBox = {
    ...oldBox,
    data:
      oldBox.data &&
      oldBox.data.map((message: InboxMessage) =>
        message.id === id ? { ...message, read: true } : message,
      ),
  };

  try {
    await readInboxMessageApi({ token, id });
    dispatch(setInbox(newBox));
  } catch (error) {
    console.error(error);
  }
};
