import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { SET_MENU, SET_ENTRY } from 'actions/laborRights';

const preloadedState = {
  // entryId --> box
  entryById: {},
  menu: getUnfetched(),
};

export default createReducer(
  preloadedState,
  {
    [SET_MENU]: (state, { menu }) => ({
      ...state,
      menu,
    }),
    [SET_ENTRY]: (state, { entryId, entry }) => {
      return {
        ...state,
        entryById: {
          ...state.entryById,
          [entryId]: entry,
        },
      };
    },
  },
  { resetOnLogOut: false },
);
