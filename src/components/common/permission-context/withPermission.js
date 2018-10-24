import React from 'react';
import {
  wrapDisplayName,
  setDisplayName,
  withHandlers,
  compose,
} from 'recompose';
import { withRouter } from 'react-router-dom';
import fetchUtil from 'utils/fetchUtil';
import PermissionContext from './PermissionContext';

const withPermissionContext = Component => {
  const hoc = setDisplayName(wrapDisplayName(Component, 'withPermission'));
  return hoc(props => (
    <PermissionContext.Consumer>
      {contextProps => <Component {...props} {...contextProps} />}
    </PermissionContext.Consumer>
  ));
};

const withPermission = compose(
  withPermissionContext,
  withRouter,
  withHandlers({
    fetchPermission: ({ location, setCanView }) => async () => {
      const result = await fetchUtil('/me/permissions/search')('GET');
      const { hasSearchPermission: hasPermission } = result;

      if (typeof Storage !== 'undefined') {
        // check current pathname
        const { pathname } = location;
        const laborRightsSingleRegex = /\/labor-rights\/.+/;
        const experienceDetailRegex = /\/experiences\/.+/;
        const timeAndSalaryRegex = /\/time-and-salary\/.+/;

        // 根據路徑，去更新相關的觀看權限 state
        if (laborRightsSingleRegex.test(pathname)) {
          // 假如是小教室頁，直接更新觀看權限 state
          setCanView({ canViewLaborRightsSingle: hasPermission });
          return;
        } else if (experienceDetailRegex.test(pathname)) {
          // 假如是單篇經驗分享頁，localStorage 沒值的話，不更新觀看權限 state。因此不會做阻擋，但是馬上就更新 localStorage。
          const viewedExperirenceDetail = localStorage.getItem(
            'viewedExperirenceDetail'
          );

          if (viewedExperirenceDetail === null) {
            localStorage.setItem('viewedExperirenceDetail', true);
            setCanView({ canViewExperirenceDetail: true });
            return;
          } else {
            setCanView({ canViewExperirenceDetail: hasPermission });
            return;
          }
        } else if (timeAndSalaryRegex.test(pathname)) {
          // 假如是薪資工時查詢頁，localStorage 沒值的話，不更新觀看權限 state。因此不會做阻擋，但是馬上就更新 localStorage。
          const viewedTimeAndSalary = localStorage.getItem(
            'viewedTimeAndSalary'
          );

          if (viewedTimeAndSalary === null) {
            localStorage.setItem('viewedTimeAndSalary', true);
            setCanView({ canViewTimeAndSalary: true });
            return;
          } else {
            setCanView({ canViewTimeAndSalary: hasPermission });
            return;
          }
        }
      }
    },
  })
);

export default withPermission;
