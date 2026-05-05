import React from 'react';
import { Redirect as RouterRedirect, RedirectProps } from 'react-router-dom';
import Status from './Status';

type Props = RedirectProps & {
  status?: number;
};

// Add http status code 301 when SSR
const Redirect: React.FC<Props> = ({ status = 301, ...props }) => (
  <Status status={status}>
    <RouterRedirect {...props} />
  </Status>
);

export default Redirect;
