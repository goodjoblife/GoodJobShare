import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import auth from './auth';
import dataCount from './dataCount';
import experienceDetail from './experienceDetail';
import experienceSearch from './experienceSearch';
import experiences from './experiences';
import laborRights from './laborRights';
import me from './me';
import timeAndSalaryBoard from './timeAndSalaryBoard';
import timeAndSalaryCompany from './timeAndSalaryCompany';
import timeAndSalaryJobTitle from './timeAndSalaryJobTitle';
import popularExperiences from './popularExperiences';
import campaignTimeAndSalaryBoard from './campaignTimeAndSalaryBoard';

const rootReducer = combineReducers({
  auth,
  dataCount,
  experienceSearch,
  experienceDetail,
  experiences,
  laborRights,
  me,
  timeAndSalaryBoard,
  timeAndSalaryCompany,
  timeAndSalaryJobTitle,
  popularExperiences,
  campaignTimeAndSalaryBoard,
  routing,
});


export default rootReducer;
