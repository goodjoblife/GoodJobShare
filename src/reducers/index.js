import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import counter from './counter';
import experienceSearch from './experienceSearch';
import LaborRightsSingle from './LaborRightsSingle';

const rootReducer = combineReducers({
  counter,
  experienceSearch,
  LaborRightsSingle,
  routing,
});


export default rootReducer;
