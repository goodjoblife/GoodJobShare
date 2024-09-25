import { getError, getFetched, toFetching, isUnfetched } from 'utils/fetchBox';
import { tokenSelector } from 'selectors/authSelector';
import { salaryWorkTimeCountBoxSelector } from 'selectors/countSelector';
import { postWorkings as postWorkingsApi } from 'apis/timeAndSalaryApi';
import { querySalaryWorkTimeCountApi } from 'apis/salaryWorkTimeApi';
import { queryMyPublishIds } from './me';

export const SET_COUNT = '@@SALARY_WORK_TIME/SET_COUNT';

const setCount = countBox => ({
  type: SET_COUNT,
  countBox,
});

export const querySalaryWorkTimeCount = () => async (dispatch, getState) => {
  dispatch(setCount(toFetching()));
  try {
    const count = await querySalaryWorkTimeCountApi();
    dispatch(setCount(getFetched(count)));
  } catch (error) {
    dispatch(setCount(getError(error)));
  }
};

export const querySalaryWorkTimeCountIfUnfetched = () => async (
  dispatch,
  getState,
) => {
  if (isUnfetched(salaryWorkTimeCountBoxSelector(getState()))) {
    return dispatch(querySalaryWorkTimeCount());
  }
};

export const createSalaryWorkTime = ({ body }) => async (
  dispatch,
  getState,
) => {
  const state = getState();
  const token = tokenSelector(state);

  const result = await postWorkingsApi({
    body,
    token,
  });

  await dispatch(queryMyPublishIds({ token }));

  return result;
};
