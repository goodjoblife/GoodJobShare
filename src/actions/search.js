import { pageType } from 'constants/companyJobTitle';
import {
  fetchSearchCompany as fetchSearchCompanyApi,
  fetchSearchJobTitle as fetchSearchJobTitleApi,
} from 'apis/timeAndSalaryApi';
import { searchByKeywordSelector } from 'selectors/search';
import { isFetching, toFetching, getFetched, getError } from 'utils/fetchBox';

export const SET_SEARCH_BY_KEYWORD = '@@SEARCH/SET_SEARCH_BY_KEYWORD';

export const setSearchByKeyword = ({ keyword, box }) => ({
  type: SET_SEARCH_BY_KEYWORD,
  keyword,
  box,
});

export const keywordMinLength = 2;

export const queryKeyword = ({ keyword }) => async (dispatch, getState) => {
  const box = searchByKeywordSelector(keyword)(getState());

  if (isFetching(box)) {
    return;
  }

  dispatch(setSearchByKeyword({ keyword, box: toFetching() }));

  try {
    const searchCompanies = fetchSearchCompanyApi({
      companyName: keyword,
      hasData: true,
    }).then(items =>
      items.map(item => ({ ...item, pageType: pageType.COMPANY })),
    );

    const searchJobTitles = fetchSearchJobTitleApi({
      jobTitle: keyword,
    }).then(items =>
      items.map(item => ({ ...item, pageType: pageType.JOB_TITLE })),
    );

    const [companyData, jobTitleData] = await Promise.all([
      searchCompanies,
      searchJobTitles,
    ]);
    const data = [...companyData, ...jobTitleData];
    data.sort((a, b) => (b.dataCount || 0) - (a.dataCount || 0));

    dispatch(setSearchByKeyword({ keyword, box: getFetched(data) }));
  } catch (e) {
    dispatch(setSearchByKeyword({ keyword, box: getError(e) }));
  }
};
