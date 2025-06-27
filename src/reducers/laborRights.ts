import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import { SET_MENU, SET_ENTRY } from 'actions/laborRights';

export type LaborRightMenuEntry = {
  id: string;
  title: string;
  coverUrl: string | null;
};

export type LaborRightEntry = {
  id: string;
  title: string;
  order: number | null;
  description: string;
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoText: string | null;
  coverUrl: string | null;
  nPublicPages: number | null;
  descriptionInPermissionBlock: string | null;
};

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
