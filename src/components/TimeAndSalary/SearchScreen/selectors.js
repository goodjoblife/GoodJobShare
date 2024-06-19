import fetchingStatus from 'constants/status';

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
