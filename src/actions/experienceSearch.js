// const API_HOST = process.env.API_HOST || 'https://api-stage-v4.goodjob.life';
import fetchUtil from '../utils/fetchUtil';
// import store from '../store/configureStore';

export const SET_SORT = 'SET_TSET_SORTYPE';
export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';
export const SET_INDUSTRY = 'SET_INDUSTRY';
export const SET_SEARCH_BY = 'SET_SEARCH_BY';
export const SET_EXPERIENCES = 'SET_EXPERIENCES';
export const SET_KEYWORD = 'SET_KEYWORD';
export const SET_KEYWORDS = 'SET_KEYWORDS';
export const SET_SORT_AND_EXPERIENCES = 'SET_SORT_AND_EXPERIENCES';
export const SET_SEARCH_QUERY_AND_EXPERIENCES = 'SET_SEARCH_QUERY_AND_EXPERIENCES';
export const SET_KEYWORDS_AND_EXPERIENCES = 'SET_KEYWORDS_AND_EXPERIENCES';

export const setSort = e => ({
  type: SET_SORT,
  sort: e.target.value,
});

export const setSearchType = e => ({
  type: SET_SEARCH_TYPE,
  searchType: e.target.value,
});

export const setIndustry = e => ({
  type: SET_INDUSTRY,
  industry: e.target.value,
});

export const setSearchBy = e => ({
  type: SET_SEARCH_BY,
  searchBy: e.target.value,
});

export const setKeyword = e => ({
  type: SET_KEYWORD,
  keyword: e.target.value,
});

export const fetchExperiencesMock = () => dispatch => {
  dispatch({
    type: SET_EXPERIENCES,
    experiences: [
      {
        _id: '590e90746c12f1000f7d6db2',
        type: 'interview',
        company: {
          name: 'GOODJOB',
        },
        salary: {
          type: 'year',
          amount: 10000,
        },
        like_count: 0,
        reply_count: 0,
        created_at: '2017-05-07T03:11:48.054Z',
        region: '臺北市',
        job_title: '工程師',
        title: 'GoodJob 面試心得',
        overall_rating: 4,
        preview: '好',
      },
    ],
  });
};

export const fetchExperiences = (cond, val) => (dispatch, getState) => {
  // dispatch(setMetaListStatus(status.FETCHING));
  const data = getState().experienceSearch.toJS();
  const sort = val || data.sort;
  let url = '/experiences';

  console.log('data==>', data, data.keyword);

  if (cond === 'searchBy') {
    url = `${url}?search_by=${data.searchBy}&search_query=${val}`;
  } else { // cond === 'sort'
    url = `${url}?sort=${sort}`;
  }
  return fetchUtil(url)('GET')
  // return fetch(`${API_HOST}/experiences`)
    // .then(response => {
    //   const json = response.json();
    //   if (response.status === 200) {
    //     return json;
    //   }
    //   return json.then(err => { throw err; });
    // })
    .then(result => {
      if (cond === 'searchBy') {
        dispatch({
          type: SET_SEARCH_QUERY_AND_EXPERIENCES,
          keyword: val,
          searchQuery: val,
          experiences: result.experiences,
          experienceCount: result.total,
        });
      } else {
        dispatch({
          type: SET_SORT_AND_EXPERIENCES,
          sort,
          keyword: '',
          searchQuery: '',
          experiences: result.experiences,
          experienceCount: result.total,
        });
      }
      // dispatch(setMetaListStatus(status.FETCHED));
    })
    .catch(err => {
      console.error('err', err);
      // dispatch(setMetaListStatus(status.ERROR, err));
      dispatch({
        type: SET_EXPERIENCES,
        experiences: [],
      });
    });
};

export const fetchKeywords2 = e => (dispatch, getState) => {
  // dispatch(setMetaListStatus(status.FETCHING));
  const data = getState().experienceSearch.toJS();
  const val = e ? e.target.value : data.searchBy;
  const url = val === 'company' ? '/company_keywords' : '/job_title_keywords';
  return fetchUtil(url)('GET')
  // return fetch(`${API_HOST}/experiences`)
    // .then(response => {
    //   const json = response.json();
    //   if (response.status === 200) {
    //     return json;
    //   }
    //   return json.then(err => { throw err; });
    // })
    .then(result => {
      dispatch({
        type: SET_KEYWORDS,
        searchBy: val,
        keywords: result.keywords,
      });
      // dispatch(setMetaListStatus(status.FETCHED));
    })
    .catch(err => {
      console.error('err', err);
      // dispatch(setMetaListStatus(status.ERROR, err));
      dispatch({
        type: SET_KEYWORDS,
        searchBy: val,
        keywords: [],
      });
    });
};

export const fetchKeywords = e => (dispatch, getState) => {
  const data = getState().experienceSearch.toJS();
  const val = e ? e.target.value : data.searchBy;
  dispatch({
    type: SET_KEYWORDS,
    searchBy: val,
    keywords: val === 'company' ? ['GoodJob', 'Yahoo', 'MTK'] : ['程序猿', '攻城獅', '猴子'],
  });
  return Promise.resolve();
};

// export const fetchKeywordsAndExperiences = () => dispatch => {
//   console.log('fetchKeywordsAndExperiences');
//   return Promise
//     .all([store.dispatch(fetchKeywords()), store.dispatch(fetchExperiences())])
//     .then(values => {
//       console.log('values:', values);
//       dispatch({
//         type: SET_KEYWORDS_AND_EXPERIENCES,
//         keywords: values[0],
//         experiences: values[1],
//       });
//     });
// };
