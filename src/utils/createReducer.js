import { LOG_OUT } from '../actions/auth';

const createReducer = (
  initialState,
  handlers,
  { resetOnLogOut = true } = {},
) => (state = initialState, action) => {
  const reduceFn = handlers[action.type];
  if (resetOnLogOut && action.type === LOG_OUT) return initialState;
  return reduceFn ? reduceFn(state, action) : state;
};

export default createReducer;
