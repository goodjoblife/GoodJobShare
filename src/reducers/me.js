import createReducer from 'utils/createReducer';
import { SET_MY_PUBLISH_IDS } from 'actions/me';
import { getUnfetched } from 'utils/fetchBox';
import { SET_LOGIN } from 'actions/auth';

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
