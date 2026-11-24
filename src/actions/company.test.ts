import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import queryCompanyPolicyReviewStatisticsApi, {
  PolicyReviewStatistics,
} from 'apis/queryCompanyPolicyReviewStatistics';
import companyIndex from 'reducers/companyIndex';
import { companyPolicyReviewStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import FetchBox, { getFetched, isFetched, isUnfetched } from 'utils/fetchBox';

import {
  refreshCompanyPolicyReviewStatistics,
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
  refresh: () => Promise<void>;
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
  const refresh = (): Promise<void> =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store.dispatch(refreshCompanyPolicyReviewStatistics(COMPANY_NAME) as any);
  return { select, refresh };
};

describe('refreshCompanyPolicyReviewStatistics', () => {
  beforeEach(() => {
    mockQuery.mockReset();
  });

  it('does nothing when there is no cached data (the page fetches on mount)', async () => {
    const { select, refresh } = setup();

    await refresh();

    expect(mockQuery).not.toHaveBeenCalled();
    expect(isUnfetched(select())).toBe(true);
  });

  it('replaces cached data with the latest data', async () => {
    mockQuery.mockResolvedValue(statistics(2));
    const { select, refresh } = setup(statistics(1));

    await refresh();

    expect(mockQuery).toHaveBeenCalledWith({ companyName: COMPANY_NAME });
    const box = select();
    expect(isFetched(box) && box.data).toEqual(statistics(2));
  });

  it('keeps the cached data while fetching (no loader flash)', async () => {
    let resolve: (data: PolicyReviewStatistics[]) => void = () => undefined;
    mockQuery.mockReturnValue(
      new Promise(r => {
        resolve = r;
      }),
    );
    const { select, refresh } = setup(statistics(1));

    const pending = refresh();

    const during = select();
    expect(isFetched(during) && during.data).toEqual(statistics(1));

    resolve(statistics(2));
    await pending;
    const after = select();
    expect(isFetched(after) && after.data).toEqual(statistics(2));
  });

  it('keeps the cached data when the request fails', async () => {
    mockQuery.mockRejectedValue(new Error('network error'));
    const { select, refresh } = setup(statistics(1));

    await expect(refresh()).resolves.toBeUndefined();

    const box = select();
    expect(isFetched(box) && box.data).toEqual(statistics(1));
  });
});
