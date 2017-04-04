export const SET_SORT = 'SET_TSET_SORTYPE';
export const SET_TYPE = 'SET_TYPE';
export const SET_INDUSTRY = 'SET_INDUSTRY';

export const setSort = e => ({
  type: SET_SORT,
  sort: e.target.value,
});

export const setType = e => ({
  type: SET_TYPE,
  searchType: e.target.value,
});

export const setIndustry = e => ({
  type: SET_INDUSTRY,
  industry: e.target.value,
});
