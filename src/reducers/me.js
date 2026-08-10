import { SET_LOGIN } from 'actions/auth';
import { SET_MY_PUBLISH_IDS } from 'actions/me';
import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';

const preloadedState = {
  myPublishIds: getUnfetched(),
};

const me = createReducer(preloadedState, {
  [SET_MY_PUBLISH_IDS]: (state, { box }) => ({
    ...state,
    myPublishIds: box,
  }),
  [SET_LOGIN]: state => ({
    ...state,
    myPublishIds: getUnfetched(),
  }),
});

export default me;
