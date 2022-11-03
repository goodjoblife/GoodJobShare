import React from 'react';

import { renderWithProviders } from 'utils/testUtils';
import '@testing-library/jest-dom/extend-expect';

import TypeForm from './index';

describe('InterviewForm (TypeForm)', () => {
  test('rendering without crash', () => {
    renderWithProviders(<TypeForm open={true} onClose={jest.fn()} />);
  });
});
