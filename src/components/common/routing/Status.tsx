import React, { PropsWithChildren } from 'react';
import { Route, StaticContext } from 'react-router';

interface AppStaticContext extends StaticContext {
  status?: number;
}

type Props = PropsWithChildren<{ status: number }>;

// Add http status code when SSR
const Status: React.FC<Props> = ({ status, children }) => (
  <Route
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    render={({ staticContext }) => {
      if (staticContext) {
        (staticContext as AppStaticContext).status = status; // eslint-disable-line no-param-reassign
      }
      return <>{children}</>;
    }}
  />
);

export default Status;
