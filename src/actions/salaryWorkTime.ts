import { AnyAction } from 'redux';
import { Thunk } from 'reducers';
import FetchBox, {
  getError,
  getFetched,
  toFetching,
  isUnfetched,
} from 'utils/fetchBox';
import { tokenSelector } from 'selectors/authSelector';
import { salaryWorkTimeCountBoxSelector } from 'selectors/countSelector';
import { postWorkings as postWorkingsApi } from 'apis/timeAndSalaryApi';
import querySalaryWorkTimeCountApi from 'apis/querySalaryWorkTimeCount';
import { queryMyPublishIds } from './me';

export const SET_COUNT = '@@SALARY_WORK_TIME/SET_COUNT';

const setCount = (countBox: FetchBox<number>): AnyAction => ({
  type: SET_COUNT,
  countBox,
});

export const querySalaryWorkTimeCount = (): Thunk => async (
  dispatch,
): Promise<void> => {
  dispatch(setCount(toFetching()));
  try {
    const count = await querySalaryWorkTimeCountApi();
    dispatch(setCount(getFetched(count)));
  } catch (error) {
    dispatch(setCount(getError(error)));
  }
};

export const querySalaryWorkTimeCountIfUnfetched = (): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
  if (isUnfetched(salaryWorkTimeCountBoxSelector(getState()))) {
    return dispatch(querySalaryWorkTimeCount());
  }
};

export const createSalaryWorkTime = ({
  body,
}: {
  body: any; // TODO: fix me
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const state = getState();
  const token = tokenSelector(state);

  const result = await postWorkingsApi({
    body,
    token,
  });

  await dispatch(queryMyPublishIds());

  return result;
};
