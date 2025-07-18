import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { READ_INBOX, SET_INBOX } from 'actions/inbox';

const preloadedState = {
  messages: getUnfetched(),
};

const inbox = createReducer(preloadedState, {
  [SET_INBOX]: (state, { box }) => ({
    ...state,
    messages: box,
  }),
  [READ_INBOX]: state => ({
    ...state,
    messages: {
      ...state.messages,
      data: state.messages.data?.map(message => ({ ...message, read: true })),
    },
  }),
});

export default inbox;
