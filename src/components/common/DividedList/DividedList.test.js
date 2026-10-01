import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import DividedList, { DividedListItem } from './index';

const renderList = (labels, className) =>
  render(
    <DividedList className={className}>
      {labels.map(label => (
        <DividedListItem key={label} label={label}>
          <span>{`${label} 的內容`}</span>
        </DividedListItem>
      ))}
    </DividedList>,
  );

describe('DividedList', () => {
  it('shows every item label and its content', () => {
    renderList(['生理假', '育嬰假']);

    expect(screen.getByText('生理假')).toBeInTheDocument();
    expect(screen.getByText('生理假 的內容')).toBeInTheDocument();
    expect(screen.getByText('育嬰假')).toBeInTheDocument();
    expect(screen.getByText('育嬰假 的內容')).toBeInTheDocument();
  });

  it('keeps the items as adjacent siblings, so the between-item divider applies', () => {
    renderList(['生理假', '育嬰假', '家庭照顧假']);

    // 分隔線是靠 .item + .item 畫的，項目之間不能被其他元素插隊
    const list = screen.getByText('生理假').parentElement.parentElement;

    expect(list.children).toHaveLength(3);
    expect([...list.children].map(item => item.firstChild.textContent)).toEqual(
      ['生理假', '育嬰假', '家庭照顧假'],
    );
  });

  it('passes the caller className through, for the leading or trailing rule', () => {
    const { container } = renderList(['生理假'], 'caller-edge-rule');

    expect(container.firstChild.className).toEqual(
      expect.stringContaining('caller-edge-rule'),
    );
  });
});
