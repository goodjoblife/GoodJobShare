import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';

import auth from './auth';
import experienceDetail from './experienceDetail';
import experienceSearch from './experienceSearch';
import experiences from './experiences';
import laborRights from './laborRights';
import me from './me';
import timeAndSalary from './timeAndSalary';
import timeAndSalaryBoard from './timeAndSalaryBoard';
import timeAndSalarySearch from './timeAndSalarySearch';
import timeAndSalaryCompany from './timeAndSalaryCompany';
import timeAndSalaryJobTitle from './timeAndSalaryJobTitle';
import popularExperiences from './popularExperiences';
import campaignInfo from './campaignInfo';
import campaignTimeAndSalaryBoard from './campaignTimeAndSalaryBoard';
import companyAndJobTitle from './companyAndJobTitle';
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
  me,
  timeAndSalary,
  timeAndSalaryBoard,
  timeAndSalarySearch,
  timeAndSalaryCompany,
  timeAndSalaryJobTitle,
  popularExperiences,
  campaignInfo,
  campaignTimeAndSalaryBoard,
  companyAndJobTitle,
});

export default persistReducer(persistConfig, rootReducer);
