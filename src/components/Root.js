import React from 'react';
import { PermissionContextProvider } from 'common/permission-context';
import { FacebookContextProvider } from 'common/facebook';
import useGoogleAnalytics from 'hooks/useGoogleAnalytics';
import usePixel from 'hooks/usePixel';
import useGoogleTagManager from 'hooks/useGoogleTagManager';
import useSyncAuth from 'hooks/useSyncAuth';
import App from './App';

const Root = () => {
  useGoogleAnalytics();
  usePixel();
  useGoogleTagManager();
  useSyncAuth();

  return (
    <PermissionContextProvider>
      <FacebookContextProvider>
        <App />
      </FacebookContextProvider>
    </PermissionContextProvider>
  );
};

export default Root;
