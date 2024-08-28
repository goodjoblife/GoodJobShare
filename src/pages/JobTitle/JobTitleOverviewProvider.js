import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Overview from 'components/CompanyAndJobTitle/Overview';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { tabType, pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import { queryJobTitleOverview } from 'actions/jobTitle';
import {
  salaryDistribution,
  averageWeekWorkTime,
  overtimeFrequencyCount,
  jobTitleOverviewBoxSelectorByName as overviewBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector } from 'common/routing/selectors';
import { usePageName, pageNameSelector } from './usePageName';

const useOverviewBox = pageName => {
  const selector = useCallback(
    state => {
      const box = overviewBoxSelectorByName(pageName)(state);
      // the box.data may be null (company not found)
      return {
        status: box.status,
        data: box.data
          ? {
              ...box.data,
              // the Overview need some fileds derived from salary_work_time_statistics
              salaryDistribution: salaryDistribution(box),
              averageWeekWorkTime: averageWeekWorkTime(box),
              overtimeFrequencyCount: overtimeFrequencyCount(box),
            }
          : null,
        error: box.error,
      };
    },
    [pageName],
  );
  return useSelector(selector);
};

const JobTitleOverviewProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.JOB_TITLE;
  const pageName = usePageName();
  const page = usePage();

  useEffect(() => {
    dispatch(queryJobTitleOverview(pageName));
  }, [dispatch, pageName]);

  const [, fetchPermission, canView] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, pageName, fetchPermission]);

  const overviewBox = useOverviewBox(pageName);

  return (
    <Overview
      pageType={pageType}
      pageName={pageName}
      tabType={tabType.OVERVIEW}
      overviewBox={overviewBox}
      page={page}
      canView={canView}
    />
  );
};

JobTitleOverviewProvider.fetchData = ({ store: { dispatch }, ...props }) => {
  const params = paramsSelector(props);
  const pageName = pageNameSelector(params);
  return dispatch(queryJobTitleOverview(pageName));
};

export default JobTitleOverviewProvider;
