import React from 'react';
import PermissionContextProvider from 'common/PermissionContextProvider';
import FacebookContextProvider from 'common/FacebookContextProvider';
import GoogleContextProvider from 'common/GoogleContextProvider';
import LoginModalContextProvider from 'common/LoginModalContextProvider';
import useGoogleAnalytics from 'hooks/useGoogleAnalytics';
import useGoogleTagManager from 'hooks/useGoogleTagManager';
import useSyncAuth from 'hooks/useSyncAuth';
import App from './App';

const compose = (providers, node) =>
  providers.reduce(
    (prevNode, Provider) => <Provider>{prevNode}</Provider>,
    node,
  );

const Root = () => {
  useGoogleAnalytics();
  useGoogleTagManager();
  useSyncAuth();

  return compose(
    [
      LoginModalContextProvider,
      GoogleContextProvider,
      FacebookContextProvider,
      PermissionContextProvider,
    ],
    <App />,
  );
};

export default Root;
