import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import TextInput from './index';

const renderWithItems = props =>
  render(
    <TextInput
      value="好工作"
      onChange={jest.fn()}
      autocompleteItems={['好工作股份有限公司', '好工作科技']}
      {...props}
    />,
  );

describe('TextInput autocomplete option', () => {
  it('cancels mousedown so the input stays focused and the option is selected in one tap', () => {
    renderWithItems();

    const notCanceled = fireEvent.mouseDown(
      screen.getByText('好工作股份有限公司'),
    );

    expect(notCanceled).toBe(false);
  });

  it('selects the option on click', () => {
    const onAutocompleteItemSelected = jest.fn();
    renderWithItems({ onAutocompleteItemSelected });

    fireEvent.click(screen.getByText('好工作股份有限公司'));

    expect(onAutocompleteItemSelected).toHaveBeenCalledWith(
      '好工作股份有限公司',
    );
  });
});
