import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import counter from './counter';
import experienceSearch from './experienceSearch';
import LaborRightsSingle from './LaborRightsSingle';
import LaborRightsMenu from './LaborRightsMenu';

const rootReducer = combineReducers({
  counter,
  experienceSearch,
  LaborRightsSingle,
  LaborRightsMenu,
  routing,
});


export default rootReducer;
