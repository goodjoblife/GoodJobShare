import { fromJS } from 'immutable';

import createReducer from 'utils/createReducer';
import {
  SET_EXPERIENCE,
} from '../actions/experienceDetail';

const preloadedState = fromJS({
  experience: {},
});

const experienceDetail = createReducer(preloadedState, {
  [SET_EXPERIENCE]: (state, action) => {
    console.log(SET_EXPERIENCE);
    return state.update('experience', () => fromJS(action.experience));
  },
});

export default experienceDetail;
