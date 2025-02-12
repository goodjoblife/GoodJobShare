import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Overview from 'components/CompanyAndJobTitle/Overview';
import usePermission from 'hooks/usePermission';
import {
  tabType as TAB_TYPE,
  pageType as PAGE_TYPE,
} from 'constants/companyJobTitle';
import { queryJobTitleOverview } from 'actions/jobTitle';
import {
  salaryDistribution,
  averageWeekWorkTime,
  overtimeFrequencyCount,
  jobTitleOverviewBoxSelectorByName as overviewBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector } from 'common/routing/selectors';
import useJobTitle, { jobTitleSelector } from './useJobTitle';

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
  const jobTitle = useJobTitle();

  useEffect(() => {
    dispatch(queryJobTitleOverview(jobTitle));
  }, [dispatch, jobTitle]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, jobTitle, fetchPermission]);

  const overviewBox = useOverviewBox(jobTitle);

  return (
    <Overview
      pageType={pageType}
      pageName={jobTitle}
      tabType={TAB_TYPE.OVERVIEW}
      overviewBox={overviewBox}
      boxSelector={overviewBoxSelectorByName(jobTitle)}
    />
  );
};

JobTitleOverviewProvider.fetchData = ({ store: { dispatch }, ...props }) => {
  const params = paramsSelector(props);
  const jobTitle = jobTitleSelector(params);
  return dispatch(queryJobTitleOverview(jobTitle));
};

export default JobTitleOverviewProvider;
