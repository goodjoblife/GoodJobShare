import { combineReducers } from 'redux-immutable';
// https://github.com/gajus/redux-immutable#using-with-react-router-redux
// import { routerReducer as routing } from 'react-router-redux';
import routing from './routing';

import counter from './counter';
import experienceSearch from './experienceSearch';

const rootReducer = combineReducers({
  counter,
  experienceSearch,
  routing,
});


export default rootReducer;
