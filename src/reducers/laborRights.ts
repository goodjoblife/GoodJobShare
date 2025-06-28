import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import { SET_MENU, SET_ENTRY } from 'actions/laborRights';
import { LaborRightEntry, LaborRightMenuEntry } from 'graphql/laborRight';

const preloadedState: {
  entryById: Record<string, FetchBox<LaborRightEntry>>;
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
      { entryId, entry }: { entryId: string; entry: FetchBox<LaborRightEntry> },
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
