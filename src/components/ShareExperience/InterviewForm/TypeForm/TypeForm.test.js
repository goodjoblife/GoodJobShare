import React from 'react';

import { customRender } from 'utils/testUtils';
import '@testing-library/jest-dom/extend-expect';

import TypeForm from './index';

describe('InterviewForm (TypeForm)', () => {
  test('rendering without crash', () => {
    customRender(<TypeForm open={true} onClose={jest.fn()} />);
  });
});
