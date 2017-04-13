import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import counter from './counter';
import experienceSearch from './experienceSearch';
import laborRights from './laborRights';

const rootReducer = combineReducers({
  counter,
  experienceSearch,
  laborRights,
  routing,
});


export default rootReducer;
