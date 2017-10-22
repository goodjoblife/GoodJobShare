import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import auth from './auth';
import experienceDetail from './experienceDetail';
import experienceSearch from './experienceSearch';
import laborRightsSingle from './laborRightsSingle';
import laborRightsMenu from './laborRightsMenu';
import me from './me';
import timeAndSalaryBoard from './timeAndSalaryBoard';
import timeAndSalaryCompany from './timeAndSalaryCompany';

const rootReducer = combineReducers({
  auth,
  experienceSearch,
  experienceDetail,
  laborRightsSingle,
  laborRightsMenu,
  me,
  timeAndSalaryBoard,
  timeAndSalaryCompany,
  routing,
});


export default rootReducer;
