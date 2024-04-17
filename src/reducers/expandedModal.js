import createReducer from 'utils/createReducer';
import { TOGGLE, OPEN } from 'actions/expandedModal';

const preloadedState = {
  isOpen: false,
};

const expandedModal = createReducer(preloadedState, {
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

export default expandedModal;
