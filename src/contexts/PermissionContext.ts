import React from 'react';

export type PermissionState = {
  canView: boolean;
  permissionFetched: boolean;
};

export type PermissionContextValue = PermissionState & {
  setPermissionState: (state: PermissionState) => void;
};

export default React.createContext<PermissionContextValue>({
  canView: true,
  permissionFetched: false,
  setPermissionState: () => {
    // do nothing.
  },
});
