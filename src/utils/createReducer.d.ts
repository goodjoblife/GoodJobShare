import { Reducer, Action, AnyAction } from 'redux';

type HandlersMap<S, A extends Action = AnyAction> = {
  [key: string]: (state: S, action: A<unknown>) => S;
};

declare function createReducer<S, A extends Action = AnyAction>(
  initialState: S,
  handlers: HandlersMap<S, A>,
  {
    resetOnLogOut = true,
  }: {
    resetOnLogOut?: boolean;
  } = {},
): Reducer<S, A>;

export = createReducer;
