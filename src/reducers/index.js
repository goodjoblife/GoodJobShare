import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import auth from './auth';
import counter from './counter';
import experienceDetail from './experienceDetail';
import experienceSearch from './experienceSearch';
import laborRightsSingle from './laborRightsSingle';
import laborRightsMenu from './laborRightsMenu';
import me from './me';

const rootReducer = combineReducers({
  auth,
  counter,
  experienceSearch,
  experienceDetail,
  laborRightsSingle,
  laborRightsMenu,
  me,
  routing,
});


export default rootReducer;
