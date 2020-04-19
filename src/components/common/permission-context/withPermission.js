import React from 'react';
import {
  wrapDisplayName,
  setDisplayName,
  withHandlers,
  compose,
} from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getHasSearchPermission } from '../../../apis/me';
import PermissionContext from './PermissionContext';
import { tokenSelector } from '../../../selectors/authSelector';

const withPermissionContext = Component => {
  const hoc = setDisplayName(wrapDisplayName(Component, 'withPermission'));
  return hoc(props => (
    <PermissionContext.Consumer>
      {contextProps => <Component {...props} {...contextProps} />}
    </PermissionContext.Consumer>
  ));
};

const withPermission = compose(
  connect(state => ({ token: tokenSelector(state) })),
  withPermissionContext,
  withRouter,
  withHandlers({
    fetchPermission: ({ setPermissionState, token }) => async () => {
      const result = await getHasSearchPermission({ token });
      const { hasSearchPermission: hasPermission } = result;

      if (typeof Storage !== 'undefined') {
        const visitedWebsite = localStorage.getItem('visitedWebsite');

        if (visitedWebsite === null) {
          // 該裝置第一次進到我們網站，那就給權限
          localStorage.setItem('visitedWebsite', true);
          setPermissionState({ canView: true, fetched: true });
        } else {
          // 該裝置第二次以上進到我們網站，那就根據 api 結果設定權限
          setPermissionState({ canView: hasPermission, fetched: true });
        }
      }
    },
  }),
);

export default withPermission;
