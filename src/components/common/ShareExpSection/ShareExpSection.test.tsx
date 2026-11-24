import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';

import ShareExpSection from '.';

const LocationState: React.FC = () => (
  <div data-testid="location-state">
    {JSON.stringify(useLocation().state || null)}
  </div>
);

it('把空資料區塊帶來的預填值接力傳給使用者挑中的表單', () => {
  render(
    <MemoryRouter
      initialEntries={[
        { pathname: '/share', state: { companyName: 'ＯＯ公司' } },
      ]}
    >
      <ShareExpSection />
      <LocationState />
    </MemoryRouter>,
  );

  fireEvent.click(screen.getByText('面試經驗'));

  expect(screen.getByTestId('location-state')).toHaveTextContent(
    JSON.stringify({ share: 'interview', companyName: 'ＯＯ公司' }),
  );
});
