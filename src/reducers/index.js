import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import counter from './counter';
import experienceSearch from './experienceSearch';
import laborRightsSingle from './laborRightsSingle';
import laborRightsMenu from './laborRightsMenu';

const rootReducer = combineReducers({
  counter,
  experienceSearch,
  laborRightsSingle,
  laborRightsMenu,
  routing,
});


export default rootReducer;
