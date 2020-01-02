import React from 'react';
import { PermissionContextProvider } from 'common/permission-context';
import FacebookContextProvider from 'common/FacebookContextProvider';
import GoogleContextProvider from 'common/GoogleContextProvider';
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
        <GoogleContextProvider>
          <App />
        </GoogleContextProvider>
      </FacebookContextProvider>
    </PermissionContextProvider>
  );
};

export default Root;
