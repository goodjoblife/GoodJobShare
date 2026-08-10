import { OPEN, TOGGLE } from 'actions/questionnaireExpandedModal';
import createReducer from 'utils/createReducer';

const preloadedState = {
  isOpen: false,
};

export default createReducer(preloadedState, {
  [TOGGLE]: state => {
    return {
      ...state,
      isOpen: !state.isOpen,
    };
  },
  [OPEN]: state => {
    return {
      ...state,
      isOpen: true,
    };
  },
});
