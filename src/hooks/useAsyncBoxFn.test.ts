import { act, renderHook } from '@testing-library/react-hooks';

import { FetchStatus } from 'constants/fetchStatus';

import useAsyncBoxFn from './useAsyncBoxFn';

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: unknown) => void;
};

const defer = <T>(): Deferred<T> => {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

describe('useAsyncBoxFn', () => {
  it('starts as unfetched', () => {
    const { result } = renderHook(() => useAsyncBoxFn(async () => 1, []));

    expect(result.current[0]).toEqual({ status: FetchStatus.UNFETCHED });
  });

  it('goes fetching then fetched with data', async () => {
    const d = defer<number>();
    const { result } = renderHook(() => useAsyncBoxFn(() => d.promise, []));

    let called!: Promise<void>;
    act(() => {
      called = result.current[1]();
    });
    expect(result.current[0].status).toBe(FetchStatus.FETCHING);

    await act(async () => {
      d.resolve(42);
      await called;
    });
    expect(result.current[0]).toEqual({
      status: FetchStatus.FETCHED,
      data: 42,
    });
  });

  it('becomes error and does not reject the callback', async () => {
    const error = new Error('boom');
    const { result } = renderHook(() =>
      useAsyncBoxFn(() => Promise.reject(error), []),
    );

    await act(() => result.current[1]());

    expect(result.current[0]).toEqual({ status: FetchStatus.ERROR, error });
  });

  it('passes arguments to fn', async () => {
    const fn = jest.fn(async (a: number, b: number) => a + b);
    const { result } = renderHook(() => useAsyncBoxFn(fn, []));

    await act(() => result.current[1](1, 2));

    expect(fn).toHaveBeenCalledWith(1, 2);
    expect(result.current[0].data).toBe(3);
  });

  it('keeps previous data while refetching', async () => {
    const second = defer<string>();
    let calls = 0;
    const fn = (): Promise<string> =>
      ++calls === 1 ? Promise.resolve('first') : second.promise;
    const { result } = renderHook(() => useAsyncBoxFn(fn, []));

    await act(() => result.current[1]());

    let called!: Promise<void>;
    act(() => {
      called = result.current[1]();
    });
    expect(result.current[0]).toEqual({
      status: FetchStatus.FETCHING,
      data: 'first',
    });

    await act(async () => {
      second.resolve('second');
      await called;
    });
    expect(result.current[0].data).toBe('second');
  });

  it('ignores a stale response that arrives after a newer call', async () => {
    const slow = defer<string>();
    const fast = defer<string>();
    const fn = jest
      .fn<Promise<string>, []>()
      .mockReturnValueOnce(slow.promise)
      .mockReturnValueOnce(fast.promise);
    const { result } = renderHook(() => useAsyncBoxFn(fn, []));

    let first!: Promise<void>;
    let second!: Promise<void>;
    act(() => {
      first = result.current[1]();
      second = result.current[1]();
    });

    await act(async () => {
      fast.resolve('new');
      await second;
    });
    await act(async () => {
      slow.resolve('old');
      await first;
    });

    expect(result.current[0]).toEqual({
      status: FetchStatus.FETCHED,
      data: 'new',
    });
  });

  it('does not update state after unmount', async () => {
    const d = defer<number>();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    const { result, unmount } = renderHook(() =>
      useAsyncBoxFn(() => d.promise, []),
    );

    let called!: Promise<void>;
    act(() => {
      called = result.current[1]();
    });
    const boxBefore = result.current[0];
    unmount();

    await act(async () => {
      d.resolve(1);
      await called;
    });

    expect(result.current[0]).toBe(boxBefore);
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('recreates the callback only when deps change', () => {
    const { result, rerender } = renderHook(
      ({ dep }) => useAsyncBoxFn(async () => dep, [dep]),
      { initialProps: { dep: 1 } },
    );
    const first = result.current[1];

    rerender({ dep: 1 });
    expect(result.current[1]).toBe(first);

    rerender({ dep: 2 });
    expect(result.current[1]).not.toBe(first);
  });
});
