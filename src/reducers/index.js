import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';

import auth from './auth';
import experienceDetail from './experienceDetail';
import experienceSearch from './experienceSearch';
import experiences from './experiences';
import laborRights from './laborRights';
import timeAndSalary from './timeAndSalary';
import timeAndSalaryBoard from './timeAndSalaryBoard';
import timeAndSalarySearch from './timeAndSalarySearch';
import timeAndSalaryCompany from './timeAndSalaryCompany';
import timeAndSalaryJobTitle from './timeAndSalaryJobTitle';
import popularCompanyAverageSalary from './popularCompanyAverageSalary';
import popularJobTitleSalaryDistribution from './popularJobTitleSalaryDistribution';
import popularExperiences from './popularExperiences';
import campaignInfo from './campaignInfo';
import campaignTimeAndSalaryBoard from './campaignTimeAndSalaryBoard';
import company from './company';
import jobTitle from './jobTitle';
import { PERSIST_KEY } from '../config';

const persistConfig = {
  key: PERSIST_KEY,
  storage,
  whitelist: ['auth'],
  transforms: [immutableTransform()],
};

const rootReducer = combineReducers({
  auth,
  experienceSearch,
  experienceDetail,
  experiences,
  laborRights,
  timeAndSalary,
  timeAndSalaryBoard,
  timeAndSalarySearch,
  timeAndSalaryCompany,
  timeAndSalaryJobTitle,
  popularCompanyAverageSalary,
  popularJobTitleSalaryDistribution,
  popularExperiences,
  campaignInfo,
  campaignTimeAndSalaryBoard,
  company,
  jobTitle,
});

export default persistReducer(persistConfig, rootReducer);
