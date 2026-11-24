import { act, fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';

import usePermission from 'hooks/usePermission';

import SubmittableFormBuilder from './SubmittableFormBuilder';

// FormBuilder 很重，這裡只需要一顆能觸發 onSubmit / onClose 的按鈕
jest.mock('common/FormBuilder', () => ({
  __esModule: true,
  default: ({
    onSubmit,
    onClose,
  }: {
    onSubmit: (draft: unknown) => void;
    onClose: () => void;
  }): React.ReactElement => (
    <div>
      <button onClick={(): void => onSubmit({})}>submit</button>
      <button onClick={onClose}>close</button>
    </div>
  ),
}));
jest.mock('hooks/useCount', () => ({
  useExperienceCount: (): number => 0,
  useSalaryWorkTimeCount: (): number => 0,
}));
jest.mock('hooks/usePermission');
jest.mock('utils/rollbar', () => ({ error: jest.fn() }));

const mockFetchPermission = jest.fn();
(usePermission as jest.Mock).mockReturnValue([false, mockFetchPermission]);

const REDIRECT = { pathname: '/companies/TEST', state: { share: 'x' } };
const QUIT = { pathname: '/companies/TEST/quit' };

const reload = jest.fn();
const originalLocation = window.location;

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...originalLocation, reload },
  });
});

afterAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: originalLocation,
  });
});

beforeEach(() => {
  reload.mockClear();
  mockFetchPermission.mockClear();
});

const renderForm = (
  props: Partial<React.ComponentProps<typeof SubmittableFormBuilder>> = {},
): MemoryHistory => {
  const history = createMemoryHistory({ initialEntries: ['/share'] });
  render(
    <Router history={history}>
      <SubmittableFormBuilder
        open
        questions={[]}
        onSubmit={async (): Promise<object> => ({})}
        onSubmitError={(): void => undefined}
        onClose={(): void => undefined}
        redirectLocationOnSuccess={REDIRECT}
        {...props}
      />
    </Router>,
  );
  return history;
};

// 這個 jsdom 版本沒有 MutationObserver，所以不能用 findBy / waitFor，
// 改用 async act 等 submit 的 promise 結算後再同步查詢
const click = async (text: string): Promise<void> => {
  await act(async () => {
    fireEvent.click(screen.getByText(text));
  });
};

const submitAndConfirm = async (): Promise<void> => {
  await click('submit');
  // 成功、失敗兩個 ConfirmModal 都有「確定」按鈕，成功視窗在 DOM 中排第一個
  await act(async () => {
    fireEvent.click(screen.getAllByText('確定')[0]);
  });
};

describe('SubmittableFormBuilder redirect on success', () => {
  it('reloads the page by default', async () => {
    const history = renderForm();

    await submitAndConfirm();

    expect(reload).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toBe('/companies/TEST');
    expect(mockFetchPermission).not.toHaveBeenCalled();
  });

  it('navigates within the SPA and refreshes permission when reloadOnSuccess is false', async () => {
    const history = renderForm({ reloadOnSuccess: false });

    await submitAndConfirm();

    expect(mockFetchPermission).toHaveBeenCalledTimes(1);
    expect(reload).not.toHaveBeenCalled();
    expect(history.location.pathname).toBe('/companies/TEST');
    expect(history.location.state).toEqual({ share: 'x' });
  });
});

describe('SubmittableFormBuilder redirect on quit', () => {
  it('still reloads on quit even when reloadOnSuccess is false', async () => {
    const history = renderForm({
      reloadOnSuccess: false,
      redirectLocationOnQuit: QUIT,
    });

    await click('close');
    await click('確定離開');

    expect(reload).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toBe('/companies/TEST/quit');
    expect(mockFetchPermission).not.toHaveBeenCalled();
  });
});
