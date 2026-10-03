import { Action, AnyAction, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { PERSIST_KEY } from '../config';
import auth from './auth';
import companyIndex from './companyIndex';
import experience from './experience';
import experiences from './experiences';
import inbox from './inbox';
import jobTitleIndex from './jobTitleIndex';
import laborRights from './laborRights';
import me from './me';
import payment from './payment';
import paymentPersist from './paymentPersist';
import popularCompanyAverageSalary from './popularCompanyAverageSalary';
import popularJobTitleSalaryDistribution from './popularJobTitleSalaryDistribution';
import questionnaireExpandedModal from './questionnaireExpandedModal';
import salaryWorkTime from './salaryWorkTime';
import search from './search';
import toastNotification from './toastNotification';
import { ThunkExtraArgument } from '../store/thunkExtraArgument';

const persistConfig = {
  key: PERSIST_KEY,
  storage,
  whitelist: ['auth', 'paymentPersist'],
};

const rootReducer = combineReducers({
  // sort by a-z
  auth,
  companyIndex,
  experience,
  experiences,
  inbox,
  jobTitleIndex,
  laborRights,
  me,
  payment,
  paymentPersist,
  popularCompanyAverageSalary,
  popularJobTitleSalaryDistribution,
  questionnaireExpandedModal,
  salaryWorkTime,
  search,
  toastNotification,
});

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<
  RootState,
  ThunkExtraArgument,
  AnyAction
>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  ThunkExtraArgument,
  AnyAction
>;

export interface Thunk<A extends Action = AnyAction> {
  (dispatch: Dispatch<A>, getState: GetState): unknown;
}

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T | Thunk<T>): T;
}
export interface GetState {
  (): RootState;
}
