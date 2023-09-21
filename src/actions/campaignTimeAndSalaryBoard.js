import R, { prop, compose } from 'ramda';
import { campaignTimeAndSalaryBoardSelector } from 'selectors/campaignTimeAndSalaryBoardSelector';
import fetchingStatus from 'constants/status';
import { DATA_NUM_PER_PAGE } from 'constants/timeAndSalarSearch';

export const SET_BOARD_DATA = '@@campaignTimeAndSalary/SET_BOARD_DATA';
export const SET_BOARD_STATUS = '@@campaignTimeAndSalary/SET_BOARD_STATUS';

const campaignNameSelector = compose(
  prop('campaignName'),
  campaignTimeAndSalaryBoardSelector,
);
const sortBySelector = compose(
  prop('sortBy'),
  campaignTimeAndSalaryBoardSelector,
);
const orderSelector = compose(
  prop('order'),
  campaignTimeAndSalaryBoardSelector,
);
const pageSelector = compose(
  prop('currentPage'),
  campaignTimeAndSalaryBoardSelector,
);
const statusSelector = compose(
  prop('status'),
  campaignTimeAndSalaryBoardSelector,
);

const resetBoard = ({ campaignName, sortBy, order, page }) => ({
  type: SET_BOARD_DATA,
  campaignName,
  sortBy,
  order,
  status: fetchingStatus.UNFETCHED,
  data: [],
  total: 0,
  currentPage: page,
  error: null,
});

const setBoardData = (
  { campaignName, sortBy, order },
  { status, data, total = 0, currentPage = 0, error = null },
) => (dispatch, getState) => {
  // make sure the store is consistent
  if (
    campaignName !== campaignNameSelector(getState()) ||
    sortBy !== sortBySelector(getState()) ||
    order !== orderSelector(getState()) ||
    currentPage !== pageSelector(getState())
  ) {
    return;
  }
  dispatch({
    type: SET_BOARD_DATA,
    campaignName,
    sortBy,
    order,
    status,
    data,
    total,
    currentPage,
    error,
  });
};

export const queryCampaignTimeAndSalary = (
  campaignName,
  { sortBy, order, jobTitles, page },
) => (dispatch, getState, { api }) => {
  if (
    campaignName !== campaignNameSelector(getState()) ||
    sortBy !== sortBySelector(getState()) ||
    order !== orderSelector(getState()) ||
    page !== pageSelector(getState())
  ) {
    dispatch(resetBoard({ campaignName, sortBy, order, page }));
  }

  if (statusSelector(getState()) === fetchingStatus.FETCHING) {
    return Promise.resolve();
  }

  dispatch({
    type: SET_BOARD_STATUS,
    status: fetchingStatus.FETCHING,
  });

  const opt = {
    sort_by: sortBy,
    order,
    job_titles: jobTitles,
    page: page - 1,
    limit: DATA_NUM_PER_PAGE,
    skip: (sortBy !== 'created_at').toString(),
  };

  return api.timeAndSalary
    .fetchCampaignTimeAndSalary({ campaignName, opt })
    .then(rawData => {
      // 將Array公司名稱轉換成String
      const takeFirstFromArrayCompanyName = R.over(
        R.lensPath(['company', 'name']),
        R.ifElse(
          R.pipe(
            R.type,
            R.equals('Array'),
          ),
          R.head,
          R.identity,
        ),
      );
      const data = rawData.time_and_salary.map(takeFirstFromArrayCompanyName);

      dispatch(
        setBoardData(
          { campaignName, sortBy, order },
          {
            status: fetchingStatus.FETCHED,
            data,
            total: rawData.total,
            currentPage: page,
          },
        ),
      );
    })
    .catch(error => {
      dispatch(
        setBoardData(
          { campaignName, sortBy, order },
          { status: fetchingStatus.ERROR, data: [], error },
        ),
      );
    });
};
