import { SET_REDIRECT_URL } from 'actions/payment';
import createReducer from 'utils/createReducer';

const persistPreloadedState: { redirectUrl: string | null } = {
  redirectUrl: null,
};

export default createReducer(persistPreloadedState, {
  [SET_REDIRECT_URL]: (
    state,
    { redirectUrl }: { redirectUrl: string | null },
  ) => ({
    ...state,
    redirectUrl,
  }),
});
