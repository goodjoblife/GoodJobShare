import { SET_ENTRY, SET_MENU } from 'actions/laborRights';
import { LaborRightEntry } from 'apis/queryLaborRights';
import { LaborRightMenuEntry } from 'apis/queryLaborRightsMenu';
import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';

const preloadedState: {
  entryById: Record<string, FetchBox<LaborRightEntry | null>>;
  menu: FetchBox<LaborRightMenuEntry[]>;
} = {
  entryById: {},
  menu: getUnfetched(),
};

export default createReducer(
  preloadedState,
  {
    [SET_MENU]: (
      state,
      { menu }: { menu: FetchBox<LaborRightMenuEntry[]> },
    ) => ({
      ...state,
      menu,
    }),
    [SET_ENTRY]: (
      state,
      {
        entryId,
        entry,
      }: { entryId: string; entry: FetchBox<LaborRightEntry | null> },
    ) => {
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
