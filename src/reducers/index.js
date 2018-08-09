import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

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
  routing,
});

export default rootReducer;
