import { Reducer, AnyAction } from 'redux';

type HandlersMap<S, T extends Record<string, unknown>> = {
  [K in keyof T]: (state: S, action: T[K]) => S;
};

declare function createReducer<S, T extends Record<string, unknown>>(
  initialState: S,
  handlers: HandlersMap<S, T>,
  {
    resetOnLogOut = true,
  }: {
    resetOnLogOut?: boolean;
  } = {},
): Reducer<S, AnyAction>;

export = createReducer;
