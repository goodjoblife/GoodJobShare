import { compose } from 'recompose';
import fetchingStatus from 'constants/status';
import { validatePage, validateSearchKeyword } from '../common/validators';
import {
  keywordFromQuerySelector,
  pageFromQuerySelector,
} from '../common/selectors';

export const keywordSelector = compose(
  validateSearchKeyword,
  keywordFromQuerySelector,
);

export const pageSelector = compose(
  validatePage,
  pageFromQuerySelector,
);

// 當 state 狀態跟目前要查詢的 key 不合，回傳預設值
export const dataSelector = keyword => state => {
  if (keyword === state.timeAndSalarySearch.keyword) {
    return state.timeAndSalarySearch.data;
  }
  return [];
};

export const statusSelector = keyword => state => {
  if (keyword === state.timeAndSalarySearch.keyword) {
    return state.timeAndSalarySearch.status;
  }
  return fetchingStatus.UNFETCHED;
};
