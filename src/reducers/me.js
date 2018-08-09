import { fromJS } from 'immutable';

import createReducer from 'utils/createReducer';
import status from '../constants/status';
import {
  SET_MY_EXPERIENCES,
  SET_MY_EXPERIENCES_STATUS,
  SET_MY_WORKINGS,
  SET_MY_WORKINGS_STATUS,
  SET_MY_REPLIES,
  SET_MY_REPLIES_STATUS,
  SET_MY_PERMISSION,
} from '../actions/me';

const preloadedState = fromJS({
  myExperiencesStatus: status.UNFETCHED,
  myExperiencesError: null,
  myExperiences: {},
  myWorkingsStatus: status.UNFETCHED,
  myWorkingsError: null,
  myWorkings: {},
  myRepliesStatus: status.UNFETCHED,
  myRepliesError: null,
  myReplies: {},
  canViewLaborRightsSingle: true,
  canViewExperirenceDetail: true,
  canViewTimeAndSalary: true,
});

const me = createReducer(preloadedState, {
  [SET_MY_EXPERIENCES]: (state, action) =>
    state.merge({
      myExperiencesStatus: action.myExperiencesStatus,
      myExperiencesError: action.myExperiencesError,
      myExperiences: fromJS(action.myExperiences),
    }),

  [SET_MY_EXPERIENCES_STATUS]: (state, action) =>
    state.update('myExperiencesStatus', () => action.status),

  [SET_MY_WORKINGS]: (state, action) =>
    state.merge({
      myWorkingsStatus: action.myWorkingsStatus,
      myWorkingsError: action.myWorkingsError,
      myWorkings: fromJS(action.myWorkings),
    }),

  [SET_MY_WORKINGS_STATUS]: (state, action) =>
    state.update('myWorkings', () => action.status),

  [SET_MY_REPLIES]: (state, action) =>
    state.merge({
      myRepliesStatus: action.myRepliesStatus,
      myRepliesError: action.myRepliesError,
      myReplies: fromJS(action.myReplies),
    }),

  [SET_MY_REPLIES_STATUS]: (state, action) =>
    state.update('myReplies', () => action.status),

  [SET_MY_PERMISSION]: (state, action) => {
    let newState = state;
    if (typeof Storage !== 'undefined') {
      // check current pathname
      const pathname = action.location.pathname;
      const laborRightsSingleRegex = /\/labor-rights\/.+/;
      const experienceDetailRegex = /\/experiences\/.+/;
      const timeAndSalaryRegex = /\/time-and-salary\/.+/;

      // 根據路徑，去更新相關的觀看權限 state
      if (laborRightsSingleRegex.test(pathname)) {
        // 假如是小教室頁，直接更新觀看權限 state
        newState = state.update(
          'canViewLaborRightsSingle',
          () => action.permission
        );
      } else if (experienceDetailRegex.test(pathname)) {
        // 假如是單篇經驗分享頁，localStorage 沒值的話，不更新觀看權限 state。因此不會做阻擋，但是馬上就更新 localStorage。
        const hasViewedExperirenceDetail = localStorage.getItem(
          'hasViewedExperirenceDetail'
        );
        if (hasViewedExperirenceDetail !== null) {
          newState = state.update(
            'canViewExperirenceDetail',
            () => action.permission
          );
        }
        localStorage.setItem('hasViewedExperirenceDetail', true);
      } else if (timeAndSalaryRegex.test(pathname)) {
        // 假如是薪資工時查詢頁，localStorage 沒值的話，不更新觀看權限 state。因此不會做阻擋，但是馬上就更新 localStorage。
        const hasViewedTimeAndSalary = localStorage.getItem(
          'hasViewedTimeAndSalary'
        );
        if (hasViewedTimeAndSalary !== null) {
          newState = state.update(
            'canViewTimeAndSalary',
            () => action.permission
          );
        }
        localStorage.setItem('hasViewedTimeAndSalary', true);
      }
    }
    return newState;
  },
});

export default me;
