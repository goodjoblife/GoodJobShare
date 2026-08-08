import { renderHook } from '@testing-library/react-hooks';

import { RootState } from 'reducers';
import { EsgYearStatistics } from 'utils/esgYearUtils';
import FetchBox, {
  getError,
  getFetched,
  getUnfetched,
  isError,
  isFetched,
  isFetching,
  isUnfetched,
  toFetching,
} from 'utils/fetchBox';

import useEsgYearStatisticsBox from './useEsgYearStatisticsBox';

jest.mock('react-redux', () => ({
  useSelector: <T>(selector: (state: RootState) => T): T => selector(mockState),
}));

const sample: EsgYearStatistics[] = [
  {
    year: 2024,
    avgSalaryStatisticsItem: {
      year: 2024,
      average: 1010000,
      sameIndustryAverage: 1020000,
    },
    nonManagerAvgSalaryStatisticsItem: {
      year: 2024,
      average: 1005000,
      sameIndustryAverage: 950000,
    },
    nonManagerMedianSalaryStatisticsItem: null,
    femaleManagerStatisticsItem: null,
  },
  {
    year: 2023,
    avgSalaryStatisticsItem: {
      year: 2023,
      average: 973000,
      sameIndustryAverage: 1000000,
    },
    nonManagerAvgSalaryStatisticsItem: null,
    nonManagerMedianSalaryStatisticsItem: { year: 2023, median: 871000 },
    femaleManagerStatisticsItem: { year: 2023, percentage: 0.189 },
  },
];

let mockState: RootState;

const stateWithBox = (box: FetchBox<EsgYearStatistics[] | null>): RootState =>
  (({
    companyIndex: {
      esgSalaryData: { 台積電: box },
    },
  } as unknown) as RootState);

describe('useEsgYearStatisticsBox', () => {
  test('FETCHED 且有資料、未指定 year → 回傳最新年度', () => {
    mockState = stateWithBox(getFetched(sample));

    const { result } = renderHook(() => useEsgYearStatisticsBox('台積電'));

    expect(isFetched(result.current)).toBe(true);
    expect(result.current.data).toEqual(sample[0]);
  });

  test('FETCHED 但該公司沒有 ESG 資料 → data 維持 null', () => {
    mockState = stateWithBox(getFetched(null));

    const { result } = renderHook(() => useEsgYearStatisticsBox('台積電'));

    expect(isFetched(result.current)).toBe(true);
    expect(result.current.data).toBeNull();
  });

  test('指定 year → 取該年度的統計', () => {
    mockState = stateWithBox(getFetched(sample));

    const { result } = renderHook(() =>
      useEsgYearStatisticsBox('台積電', 2023),
    );

    expect(result.current.data).toEqual(sample[1]);
  });

  test('指定的 year 不存在 → 回退最新年度', () => {
    mockState = stateWithBox(getFetched(sample));

    const { result } = renderHook(() =>
      useEsgYearStatisticsBox('台積電', 2020),
    );

    expect(result.current.data).toEqual(sample[0]);
  });

  test('UNFETCHED → 回傳 unfetched box', () => {
    mockState = stateWithBox(getUnfetched());

    const { result } = renderHook(() => useEsgYearStatisticsBox('台積電'));

    expect(isUnfetched(result.current)).toBe(true);
  });

  test('FETCHING → 回傳 fetching box', () => {
    mockState = stateWithBox(toFetching());

    const { result } = renderHook(() => useEsgYearStatisticsBox('台積電'));

    expect(isFetching(result.current)).toBe(true);
  });

  test('ERROR → 保留原錯誤', () => {
    const error = new Error('boom');
    mockState = stateWithBox(getError(error));

    const { result } = renderHook(() => useEsgYearStatisticsBox('台積電'));

    expect(isError(result.current)).toBe(true);
    expect(result.current.error).toBe(error);
  });

  test('store 中沒有該公司 → 視為 unfetched', () => {
    mockState = ({
      companyIndex: { esgSalaryData: {} },
    } as unknown) as RootState;

    const { result } = renderHook(() => useEsgYearStatisticsBox('聯發科'));

    expect(isUnfetched(result.current)).toBe(true);
  });

  test('輸入不變時回傳同一個 data 物件，避免呼叫端誤判為變更', () => {
    mockState = stateWithBox(getFetched(sample));

    const { result, rerender } = renderHook(() =>
      useEsgYearStatisticsBox('台積電'),
    );
    const firstData = result.current.data;

    rerender();

    expect(result.current.data).toBe(firstData);
  });
});
