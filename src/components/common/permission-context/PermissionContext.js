import React from 'react';

export default React.createContext({
  canView: true,
  permissionFetched: false,
  setPermissionState: () => {},
});
