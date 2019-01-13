import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth';
import experienceDetail from './experienceDetail';
import experienceSearch from './experienceSearch';
import experiences from './experiences';
import laborRights from './laborRights';
import me from './me';
import timeAndSalary from './timeAndSalary';
import timeAndSalaryBoard from './timeAndSalaryBoard';
import timeAndSalaryCompany from './timeAndSalaryCompany';
import timeAndSalaryJobTitle from './timeAndSalaryJobTitle';
import popularExperiences from './popularExperiences';
import campaignInfo from './campaignInfo';
import campaignTimeAndSalaryBoard from './campaignTimeAndSalaryBoard';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
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
  timeAndSalaryCompany,
  timeAndSalaryJobTitle,
  popularExperiences,
  campaignInfo,
  campaignTimeAndSalaryBoard,
});

export default persistReducer(persistConfig, rootReducer);
