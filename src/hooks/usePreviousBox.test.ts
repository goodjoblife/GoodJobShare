import { renderHook, RenderHookResult } from '@testing-library/react-hooks';

import { FetchStatus } from 'constants/fetchStatus';
import FetchBox, {
  getError,
  getFetched,
  getUnfetched,
  toFetching,
} from 'utils/fetchBox';

import usePreviousBox from './usePreviousBox';

type Props = { box: FetchBox<string>; scope: string };

describe('usePreviousBox', () => {
  const setup = (initial: Props): RenderHookResult<Props, FetchBox<string>> =>
    renderHook(({ box, scope }: Props) => usePreviousBox(box, scope), {
      initialProps: initial,
    });

  it('returns the box as is when it has data', () => {
    const box = getFetched('a');
    const { result } = setup({ box, scope: 'x' });
    expect(result.current).toBe(box);
  });

  it('keeps previous data while the next box has none', () => {
    const { result, rerender } = setup({ box: getFetched('a'), scope: 'x' });
    rerender({ box: toFetching<string>(), scope: 'x' });
    expect(result.current).toEqual({
      status: FetchStatus.FETCHING,
      data: 'a',
    });
  });

  it('treats an unfetched box as fetching when previous data is kept', () => {
    const { result, rerender } = setup({ box: getFetched('a'), scope: 'x' });
    rerender({ box: getUnfetched<string>(), scope: 'x' });
    expect(result.current).toEqual({
      status: FetchStatus.FETCHING,
      data: 'a',
    });
  });

  it('keeps error status when keeping previous data', () => {
    const { result, rerender } = setup({ box: getFetched('a'), scope: 'x' });
    rerender({ box: getError<string>('oops'), scope: 'x' });
    expect(result.current).toEqual({
      status: FetchStatus.ERROR,
      error: 'oops',
      data: 'a',
    });
  });

  it('drops previous data when scope changes', () => {
    const { result, rerender } = setup({ box: getFetched('a'), scope: 'x' });
    rerender({ box: toFetching<string>(), scope: 'y' });
    expect(result.current.data).toBeUndefined();
  });

  it('returns unfetched box when there is no previous data', () => {
    const box = getUnfetched<string>();
    const { result } = setup({ box, scope: 'x' });
    expect(result.current).toBe(box);
  });
});
