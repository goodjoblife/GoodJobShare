import '@testing-library/jest-dom';
import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';

import DividedList, { DividedListItem } from './index';

const renderList = (labels: string[], className?: string): RenderResult =>
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

  it('holds nothing but the items, so every divider lines up with one', () => {
    const { container } = renderList(['生理假', '育嬰假', '家庭照顧假']);

    const list = container.firstChild as HTMLElement;

    expect(list.children).toHaveLength(3);
    expect(
      Array.from(list.children).map(
        item => (item.firstChild as HTMLElement).textContent,
      ),
    ).toEqual(['生理假', '育嬰假', '家庭照顧假']);
  });

  it('passes the caller className through', () => {
    const { container } = renderList(['生理假'], 'caller-edge-rule');

    const list = container.firstChild as HTMLElement;

    expect(list.className).toEqual(expect.stringContaining('caller-edge-rule'));
  });
});
