import React from 'react';

export default React.createContext({
  canView: true,
  fetched: false,
  setPermissionState: () => {},
});
