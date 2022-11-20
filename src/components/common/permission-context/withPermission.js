import React from 'react';
import { wrapDisplayName, setDisplayName, compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import usePermission from '../../../hooks/usePermission';

const withPermissionProps = Component => {
  const hoc = setDisplayName(wrapDisplayName(Component, 'withPermission'));
  return hoc(props => {
    const [permissionFetched, fetchPermission, canView] = usePermission();
    return (
      <Component
        {...props}
        permissionFetched={permissionFetched}
        fetchPermission={fetchPermission}
        canView={canView}
      />
    );
  });
};

const withPermission = compose(
  withRouter,
  withPermissionProps,
);

export default withPermission;
