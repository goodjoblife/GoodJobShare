import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { NavigatorButton } from './NavigatorBlock';

describe('NavigatorButton', () => {
  it('cancels mousedown so a focused input does not blur and shift the layout mid-tap', () => {
    render(<NavigatorButton>下一題</NavigatorButton>);

    const notCanceled = fireEvent.mouseDown(screen.getByText('下一題'));

    expect(notCanceled).toBe(false);
  });

  it('still calls the onMouseDown passed by the caller', () => {
    const onMouseDown = jest.fn();
    render(<NavigatorButton onMouseDown={onMouseDown}>下一題</NavigatorButton>);

    fireEvent.mouseDown(screen.getByText('下一題'));

    expect(onMouseDown).toHaveBeenCalledTimes(1);
  });
});
