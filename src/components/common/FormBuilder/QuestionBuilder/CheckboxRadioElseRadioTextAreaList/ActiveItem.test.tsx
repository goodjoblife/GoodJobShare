import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ActiveItem from './ActiveItem';
import { Option } from '../Checkbox';
import { RadioElseRadioOption } from './index';

const toOption = (value: string): Option => ({ label: value, value });

// jsdom 沒有實作 Element.scrollTo，而選到 else option 時 RadioSubPage 會呼叫它
beforeAll(() => {
  Element.prototype.scrollTo = jest.fn();
});

const option: RadioElseRadioOption = {
  label: '生理假',
  value: '生理假',
  radioTitle: '自己或同事是否請得到生理假？',
  radioOptions: ['是', '否', '不知道'].map(toOption),
  radioElseOptionValue: '是',
  radioElseOptions: [
    '有，優於或符合性別平等工作法',
    '有，不符合性別平等工作法',
  ].map(toOption),
  textTitle: '請分享自身或同事請生理假的實際狀況',
  hasText: ([, v]) => v === '是' || v === '否',
};

const savedItem = ['生理假', '否', null, '沒有人請過'];

const renderActiveItem = (
  props: Partial<React.ComponentProps<typeof ActiveItem>> = {},
): { onCancel: jest.Mock; onChange: jest.Mock } => {
  const onCancel = jest.fn();
  const onChange = jest.fn();
  render(
    <ActiveItem
      dataKey="policies"
      option={option}
      onCancel={onCancel}
      onChange={onChange}
      {...props}
    />,
  );
  return { onCancel, onChange };
};

describe('取消', () => {
  it('沒有變更時直接取消，不跳出確認視窗', () => {
    const { onCancel } = renderActiveItem({ defaultValue: savedItem });

    fireEvent.click(screen.getByText('取消'));

    expect(screen.queryByText('確定要取消？')).not.toBeInTheDocument();
    expect(onCancel).toHaveBeenCalled();
  });

  it('有變更時跳出確認視窗，確定後才取消', () => {
    const { onCancel } = renderActiveItem({ defaultValue: savedItem });

    fireEvent.click(screen.getByLabelText('不知道'));
    fireEvent.click(screen.getByText('取消'));

    expect(screen.getByText('確定要取消？')).toBeInTheDocument();
    expect(onCancel).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('確定取消'));

    expect(onCancel).toHaveBeenCalled();
  });

  it('選擇繼續編輯時不取消', () => {
    const { onCancel } = renderActiveItem({ defaultValue: savedItem });

    fireEvent.click(screen.getByLabelText('不知道'));
    fireEvent.click(screen.getByText('取消'));
    fireEvent.click(screen.getByText('繼續編輯'));

    expect(screen.queryByText('確定要取消？')).not.toBeInTheDocument();
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('新填寫時選了選項即視為有變更', () => {
    const { onCancel } = renderActiveItem();

    fireEvent.click(screen.getByLabelText('不知道'));
    fireEvent.click(screen.getByText('取消'));

    expect(screen.getByText('確定要取消？')).toBeInTheDocument();
    expect(onCancel).not.toHaveBeenCalled();
  });
});

describe('選完選項馬上取消', () => {
  // 選完選項會延遲 300ms 自動確認，測試期間要能手動推進計時器
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  const cancelRightAfterSelecting = (label: string): void => {
    fireEvent.click(screen.getByLabelText(label));
    fireEvent.click(screen.getByText('取消'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  };

  it('延遲的自動確認不會把內容存檔', () => {
    const { onChange } = renderActiveItem();

    cancelRightAfterSelecting('不知道');

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText('確定要取消？')).toBeInTheDocument();
  });

  it('延遲的自動確認不會跳到文字頁', () => {
    renderActiveItem();

    cancelRightAfterSelecting('否');

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByText('確定要取消？')).toBeInTheDocument();
  });
});

describe('文字頁的取消', () => {
  const savedItemWithText = [
    '生理假',
    '是',
    '有，優於或符合性別平等工作法',
    '已填寫的內容',
  ];

  const goToTextSubPage = (): void => {
    fireEvent.click(screen.getByText('繼續'));
  };

  it('沒有改動內容時直接取消，不跳出確認視窗', () => {
    const { onCancel } = renderActiveItem({ defaultValue: savedItemWithText });

    goToTextSubPage();
    fireEvent.click(screen.getByText('取消'));

    expect(screen.queryByText('確定要取消？')).not.toBeInTheDocument();
    expect(onCancel).toHaveBeenCalled();
  });

  it('改動內容後跳出確認視窗，確定後才取消', () => {
    const { onCancel } = renderActiveItem({ defaultValue: savedItemWithText });

    goToTextSubPage();
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '改過的內容' },
    });
    fireEvent.click(screen.getByText('取消'));

    expect(screen.getByText('確定要取消？')).toBeInTheDocument();
    expect(onCancel).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('確定取消'));

    expect(onCancel).toHaveBeenCalled();
  });
});

describe('清除', () => {
  it('即使沒有變更也跳出確認視窗，確定後才清除', () => {
    const { onChange } = renderActiveItem({ defaultValue: savedItem });

    fireEvent.click(screen.getByText('清除'));

    expect(screen.getByText('確定要清除？')).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('確定清除'));

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('選擇繼續編輯時不清除', () => {
    const { onChange } = renderActiveItem({ defaultValue: savedItem });

    fireEvent.click(screen.getByText('清除'));
    fireEvent.click(screen.getByText('繼續編輯'));

    expect(screen.queryByText('確定要清除？')).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });
});
