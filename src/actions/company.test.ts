import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import queryCompanyPolicyReviewStatisticsApi, {
  PolicyReviewStatistics,
} from 'apis/queryCompanyPolicyReviewStatistics';
import companyIndex from 'reducers/companyIndex';
import { companyPolicyReviewStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import FetchBox, { getFetched, isError, isFetched } from 'utils/fetchBox';

import {
  queryCompanyPolicyReviewStatistics,
  SET_POLICY_REVIEW_STATISTICS,
} from './company';

jest.mock('apis/queryCompanyPolicyReviewStatistics');

const mockQuery = queryCompanyPolicyReviewStatisticsApi as jest.MockedFunction<
  typeof queryCompanyPolicyReviewStatisticsApi
>;

const COMPANY_NAME = 'TEST COMPANY';

const statistics = (yes: number): PolicyReviewStatistics[] => [
  {
    policy: 'MENSTRUAL_LEAVE',
    hasPolicyCount: { yes, no: 0, unknown: 0 },
    complianceCount: null,
    remoteWorkPolicyCount: null,
  } as PolicyReviewStatistics,
];

const setup = (
  initialData?: PolicyReviewStatistics[],
): {
  select: () => FetchBox<PolicyReviewStatistics[] | null>;
  query: (options?: { force?: boolean }) => Promise<unknown>;
} => {
  const reducer = combineReducers({ companyIndex });
  const store = createStore(reducer, applyMiddleware(thunk));
  if (initialData) {
    store.dispatch({
      type: SET_POLICY_REVIEW_STATISTICS,
      companyName: COMPANY_NAME,
      box: getFetched(initialData),
    });
  }
  const select = (): FetchBox<PolicyReviewStatistics[] | null> =>
    companyPolicyReviewStatisticsBoxSelectorByName(COMPANY_NAME)(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      store.getState() as any,
    );
  const query = (options?: { force?: boolean }): Promise<unknown> =>
    (store.dispatch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryCompanyPolicyReviewStatistics(COMPANY_NAME, options) as any,
    ) as unknown) as Promise<unknown>;
  return { select, query };
};

describe('queryCompanyPolicyReviewStatistics', () => {
  beforeEach(() => {
    mockQuery.mockReset();
  });

  it('fetches when there is no cached data', async () => {
    mockQuery.mockResolvedValue(statistics(1));
    const { select, query } = setup();

    await query();

    expect(mockQuery).toHaveBeenCalledWith({ companyName: COMPANY_NAME });
    const box = select();
    expect(isFetched(box) && box.data).toEqual(statistics(1));
  });

  it('skips fetching when the data is already cached', async () => {
    const { select, query } = setup(statistics(1));

    await query();

    expect(mockQuery).not.toHaveBeenCalled();
    const box = select();
    expect(isFetched(box) && box.data).toEqual(statistics(1));
  });

  describe('with force', () => {
    it('refetches and replaces the cached data', async () => {
      mockQuery.mockResolvedValue(statistics(2));
      const { select, query } = setup(statistics(1));

      await query({ force: true });

      expect(mockQuery).toHaveBeenCalledWith({ companyName: COMPANY_NAME });
      const box = select();
      expect(isFetched(box) && box.data).toEqual(statistics(2));
    });

    it('stores the error when the request fails', async () => {
      mockQuery.mockRejectedValue(new Error('network error'));
      const { select, query } = setup(statistics(1));

      await query({ force: true });

      expect(isError(select())).toBe(true);
    });
  });
});
