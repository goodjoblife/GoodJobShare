import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import counter from './counter';
import experienceSearch from './experienceSearch';

const rootReducer = combineReducers({
  counter,
  experienceSearch,
  routing,
});


export default rootReducer;
