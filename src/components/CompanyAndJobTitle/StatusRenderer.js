import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Redirect from 'common/routing/Redirect';
import Loader from 'common/Loader';
import NotFoundStatus from 'common/routing/NotFound';
import {
  generateTabURL,
  pageType as PAGE_TYPE,
  tabType as TAB_TYPE,
} from 'constants/companyJobTitle';
import {
  companyOverviewBoxSelectorByName,
  companyTimeAndSalaryBoxSelectorByName,
  companyInterviewExperiencesBoxSelectorByName,
  companyWorkExperiencesBoxSelectorByName,
  jobTitleOverviewBoxSelectorByName,
  jobTitleTimeAndSalaryBoxSelectorByName,
  jobTitleInterviewExperiencesBoxSelectorByName,
  jobTitleWorkExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { isUnfetched, isFetching, isError } from 'utils/fetchBox';
import EmptyView from './EmptyView';

const StatusRenderer = ({ box, render }) => {
  if (isUnfetched(box)) {
    return null;
  }
  if (isFetching(box)) {
    return <Loader size="s" />;
  }
  if (isError(box)) {
    return null;
  }
  return render(box.data);
};

StatusRenderer.propTypes = {
  box: PropTypes.shape({
    data: PropTypes.any,
    error: PropTypes.any,
    status: PropTypes.string.isRequired,
  }).isRequired,
  render: PropTypes.func.isRequired,
};

export default StatusRenderer;

// TODO: 將 box 由外部帶入
const selectorMapping = {
  [PAGE_TYPE.COMPANY]: {
    [TAB_TYPE.OVERVIEW]: companyOverviewBoxSelectorByName,
    [TAB_TYPE.TIME_AND_SALARY]: companyTimeAndSalaryBoxSelectorByName,
    [TAB_TYPE.INTERVIEW_EXPERIENCE]: companyInterviewExperiencesBoxSelectorByName,
    [TAB_TYPE.WORK_EXPERIENCE]: companyWorkExperiencesBoxSelectorByName,
  },
  [PAGE_TYPE.JOB_TITLE]: {
    [TAB_TYPE.OVERVIEW]: jobTitleOverviewBoxSelectorByName,
    [TAB_TYPE.TIME_AND_SALARY]: jobTitleTimeAndSalaryBoxSelectorByName,
    [TAB_TYPE.INTERVIEW_EXPERIENCE]: jobTitleInterviewExperiencesBoxSelectorByName,
    [TAB_TYPE.WORK_EXPERIENCE]: jobTitleWorkExperiencesBoxSelectorByName,
  },
};

const useBox = ({ pageType, pageName, tabType }) => {
  const boxSelector = useMemo(
    () => selectorMapping[pageType][tabType](pageName),
    [pageType, pageName, tabType],
  );
  const box = useSelector(boxSelector);
  return box;
};

export const BoxStatusRenderer = ({ pageName, pageType, tabType, render }) => {
  /* 處理
   * 1. 當 fetching                   --> 應顯示 Loading (目前由 StatusRenderer 處理)
   * 2. 當 box.data === null          --> 應顯示 NotFoundStatus (後端無公司)
   * 3. 當 box.data.name !== pageName --> 應 Redirect (done)
   * 4. 當 box.data.dataCount === 0   --> 應顯示 NotFoundStatus (後端無資料)
   * 5. 當 box.data.資料 === []       --> 應顯示 NotFoundStatus (通常是 pagination 超出範圍) (交給 render 處理)
   */
  const box = useBox({ pageType, pageName, tabType });
  return (
    <StatusRenderer
      box={box}
      render={() => {
        const data = box.data;
        if (data === null) {
          return (
            <NotFoundStatus status={404}>
              <EmptyView pageName={pageName} />
            </NotFoundStatus>
          );
        }
        if (data.name !== pageName) {
          const path = generateTabURL({
            pageType,
            pageName: data.name,
            tabType,
          });
          return <Redirect to={path} />;
        }
        return render();
      }}
    />
  );
};

BoxStatusRenderer.propTypes = {
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  tabType: PropTypes.string.isRequired,
};
