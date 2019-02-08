import { LOG_OUT } from '../actions/auth';

const createReducer = (initialState, handlers) => (
  state = initialState,
  action,
) => {
  const reduceFn = handlers[action.type];
  if (action.type === LOG_OUT) return initialState;
  return reduceFn ? reduceFn(state, action) : state;
};

export default createReducer;
