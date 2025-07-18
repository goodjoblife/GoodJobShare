import { combineReducers, Action, AnyAction } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PERSIST_KEY } from '../config';

// sort by reducers a-z
import auth from './auth';
import companyIndex from './companyIndex';
import experience from './experience';
import experiences from './experiences';
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
import inbox from './inbox';

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
  inbox,
});

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export interface Thunk<A extends Action = AnyAction> {
  (dispatch: Dispatch<A>, getState: GetState): unknown;
}

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T | Thunk<T>): T;
}
export interface GetState {
  (): RootState;
}
