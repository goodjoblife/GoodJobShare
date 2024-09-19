import createReducer from 'utils/createReducer';
import { SET_MY_PUBLISH_IDS } from 'actions/me';
import { getUnfetched } from 'utils/fetchBox';

const preloadedState = {
  myPublishIds: getUnfetched(),
};

const me = createReducer(preloadedState, {
  [SET_MY_PUBLISH_IDS]: (state, { box }) => ({
    ...state,
    myPublishIds: box,
  }),
});

export default me;
