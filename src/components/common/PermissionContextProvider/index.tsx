import React, { useMemo, useState } from 'react';

import PermissionContext, {
  PermissionContextValue,
  PermissionState,
} from 'contexts/PermissionContext';

type Props = {
  children: React.ReactNode;
};

const PermissionContextProvider: React.FC<Props> = ({ children }) => {
  const [state, setPermissionState] = useState<PermissionState>({
    canView: true,
    permissionFetched: false,
  });

  const contextValue = useMemo<PermissionContextValue>(
    () => ({ ...state, setPermissionState }),
    [state, setPermissionState],
  );

  return (
    <PermissionContext.Provider value={contextValue}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionContextProvider;
