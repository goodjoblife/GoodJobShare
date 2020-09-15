import React from 'react';
import { PermissionContextProvider } from 'common/permission-context';
import FacebookContextProvider from 'common/FacebookContextProvider';
import GoogleContextProvider from 'common/GoogleContextProvider';
import LoginModalContextProvider from 'common/LoginModalContextProvider';
import useGoogleAnalytics from 'hooks/useGoogleAnalytics';
import usePixel from 'hooks/usePixel';
import useGoogleTagManager from 'hooks/useGoogleTagManager';
import useSyncAuth from 'hooks/useSyncAuth';
import useLandPageTracker from 'hooks/useLandPageTracker';
import App from './App';

const compose = (providers, node) =>
  providers.reduce(
    (prevNode, Provider) => <Provider>{prevNode}</Provider>,
    node,
  );

const Root = () => {
  useGoogleAnalytics();
  usePixel();
  useGoogleTagManager();
  useSyncAuth();
  useLandPageTracker();

  return compose(
    [
      PermissionContextProvider,
      FacebookContextProvider,
      GoogleContextProvider,
      LoginModalContextProvider,
    ],
    <App />,
  );
};

export default Root;
