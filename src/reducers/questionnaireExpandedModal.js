import createReducer from 'utils/createReducer';
import { TOGGLE, OPEN } from 'actions/questionnaireExpandedModal';

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
