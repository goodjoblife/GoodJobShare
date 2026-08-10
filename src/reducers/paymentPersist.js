import { SET_REDIRECT_URL } from 'actions/payment';
import createReducer from 'utils/createReducer';

const persistPreloadedState = {
  redirectUrl: null,
};

export default createReducer(persistPreloadedState, {
  [SET_REDIRECT_URL]: (state, { redirectUrl }) => ({
    ...state,
    redirectUrl,
  }),
});
