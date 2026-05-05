import React from 'react';
import Status from './Status';

type Props = {
  status?: number;
  children?: React.ReactNode;
};

const NotFound: React.FC<Props> = ({ status = 404, children }) => (
  <Status status={status}>{children}</Status>
);

export default NotFound;
