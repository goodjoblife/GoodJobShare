import { History } from 'history';

export type ThunkExtraArgument = { history: History };

export const createThunkExtraArgument = (
  history: History,
): ThunkExtraArgument => ({ history });
