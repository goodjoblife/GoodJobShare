import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { SET_INBOX } from 'actions/inbox';

const preloadedState = {
  messages: getUnfetched(),
};

const inbox = createReducer(preloadedState, {
  [SET_INBOX]: (state, { box }) => ({
    ...state,
    messages: box,
  }),
});

export default inbox;
