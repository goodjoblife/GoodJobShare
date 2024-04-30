import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth';
import experience from './experience';
import experienceSearch from './experienceSearch';
import experiences from './experiences';
import laborRights from './laborRights';
import timeAndSalary from './timeAndSalary';
import timeAndSalaryBoard from './timeAndSalaryBoard';
import timeAndSalarySearch from './timeAndSalarySearch';
import popularCompanyAverageSalary from './popularCompanyAverageSalary';
import popularJobTitleSalaryDistribution from './popularJobTitleSalaryDistribution';
import campaignInfo from './campaignInfo';
import campaignTimeAndSalaryBoard from './campaignTimeAndSalaryBoard';
import company from './company';
import companyIndex from './companyIndex';
import jobTitle from './jobTitle';
import jobTitleIndex from './jobTitleIndex';
import payment from './payment';
import paymentPersist from './paymentPersist';
import toastNotification from './toastNotification';
import { PERSIST_KEY } from '../config';
import questionnaireExpandedModal from './questionnaireExpandedModal';

const persistConfig = {
  key: PERSIST_KEY,
  storage,
  whitelist: ['auth', 'paymentPersist'],
};

const rootReducer = combineReducers({
  auth,
  experienceSearch,
  experience,
  experiences,
  laborRights,
  timeAndSalary,
  timeAndSalaryBoard,
  timeAndSalarySearch,
  popularCompanyAverageSalary,
  popularJobTitleSalaryDistribution,
  campaignInfo,
  campaignTimeAndSalaryBoard,
  company,
  companyIndex,
  jobTitle,
  jobTitleIndex,
  payment,
  paymentPersist,
  toastNotification,
  questionnaireExpandedModal,
});

export default persistReducer(persistConfig, rootReducer);
