import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import auth from './auth';
import dataCount from './dataCount';
import experienceDetail from './experienceDetail';
import experienceSearch from './experienceSearch';
import laborRightsSingle from './laborRightsSingle';
import laborRightsMenu from './laborRightsMenu';
import me from './me';
import timeAndSalaryBoard from './timeAndSalaryBoard';
import timeAndSalaryCompany from './timeAndSalaryCompany';
import timeAndSalaryJobTitle from './timeAndSalaryJobTitle';
import progressBarState from './progressBarState';
import popularExperiences from './popularExperiences';

const rootReducer = combineReducers({
  auth,
  dataCount,
  experienceSearch,
  experienceDetail,
  laborRightsSingle,
  laborRightsMenu,
  me,
  timeAndSalaryBoard,
  timeAndSalaryCompany,
  timeAndSalaryJobTitle,
  progressBarState,
  popularExperiences,
  routing,
});


export default rootReducer;
