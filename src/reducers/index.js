import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import counter from './counter';
import experienceDetail from './experienceDetail';
import experienceSearch from './experienceSearch';
import laborRightsSingle from './laborRightsSingle';
import laborRightsMenu from './laborRightsMenu';
import headerButton from './headerButton';

const rootReducer = combineReducers({
  counter,
  headerButton,
  experienceSearch,
  experienceDetail,
  laborRightsSingle,
  laborRightsMenu,
  routing,
});


export default rootReducer;
