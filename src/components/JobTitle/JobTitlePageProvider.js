import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generatePath } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import InterviewExperiences from '../CompanyAndJobTitle/InterviewExperiences';
import WorkExperiences from '../CompanyAndJobTitle/WorkExperiences';
import CompanyJobTitleTimeAndSalary from '../CompanyAndJobTitle/TimeAndSalary';
import NotFound from 'common/NotFound';
import Redirect from 'common/routing/Redirect';
import { paramsSelector } from 'common/routing/selectors';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { tabType, pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import {
  jobTitleSalaryWorkTimesPath,
  jobTitleInterviewExperiencesPath,
  jobTitleWorkExperiencesPath,
} from 'constants/linkTo';
import { fetchJobTitle } from 'actions/jobTitle';
import {
  interviewExperiences as interviewExperiencesSelector,
  workExperiences as workExperiencesSelector,
  salaryWorkTimes as salaryWorkTimesSelector,
  salaryWorkTimeStatistics as salaryWorkTimeStatisticsSelector,
  status as statusSelector,
  jobTitle as jobTitleSelector,
} from 'selectors/companyAndJobTitle';
import { usePageName, pageNameSelector } from './usePageName';

const PAGE_SIZE = 10;

const JobTitlePageProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.JOB_TITLE;
  const pageName = usePageName();
  const page = usePage();

  useEffect(() => {
    dispatch(fetchJobTitle(pageName));
  }, [dispatch, pageName]);

  const [, fetchPermission, canView] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, pageName, fetchPermission]);

  const selector = useCallback(
    state => {
      const jobTitle = jobTitleSelector(pageName)(state);
      return {
        status: statusSelector(jobTitle),
        interviewExperiences: interviewExperiencesSelector(jobTitle),
        workExperiences: workExperiencesSelector(jobTitle),
        salaryWorkTimes: salaryWorkTimesSelector(jobTitle),
        salaryWorkTimeStatistics: salaryWorkTimeStatisticsSelector(jobTitle),
      };
    },
    [pageName],
  );
  const {
    status,
    interviewExperiences,
    workExperiences,
    salaryWorkTimes,
    salaryWorkTimeStatistics,
  } = useSelector(selector);

  return (
    <Switch>
      {/* 相容舊網址 */}
      <Route
        path="/job-titles/:jobTitle/overview"
        exact
        render={({ match: { params } }) => {
          const jobTitle = pageNameSelector(params);
          const path = generatePath('/job-titles/:jobTitle', { jobTitle });
          return <Redirect to={path} />;
        }}
      />
      <Route
        path={jobTitleSalaryWorkTimesPath}
        exact
        render={() => (
          <CompanyJobTitleTimeAndSalary
            pageType={pageType}
            pageName={pageName}
            page={page}
            pageSize={PAGE_SIZE}
            totalCount={salaryWorkTimes.length}
            tabType={tabType.TIME_AND_SALARY}
            status={status}
            salaryWorkTimes={salaryWorkTimes.slice(
              (page - 1) * PAGE_SIZE,
              page * PAGE_SIZE,
            )}
            salaryWorkTimeStatistics={salaryWorkTimeStatistics}
          />
        )}
      />
      <Route
        path={jobTitleInterviewExperiencesPath}
        exact
        render={() => (
          <InterviewExperiences
            pageType={pageType}
            pageName={pageName}
            page={page}
            canView={canView}
            tabType={tabType.INTERVIEW_EXPERIENCE}
            interviewExperiences={interviewExperiences}
            status={status}
          />
        )}
      />
      <Route
        path={jobTitleWorkExperiencesPath}
        exact
        render={() => (
          <WorkExperiences
            pageType={pageType}
            pageName={pageName}
            page={page}
            canView={canView}
            tabType={tabType.WORK_EXPERIENCE}
            workExperiences={workExperiences}
            status={status}
          />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

JobTitlePageProvider.fetchData = ({ store: { dispatch }, ...props }) => {
  const params = paramsSelector(props);
  const pageName = pageNameSelector(params);
  return dispatch(fetchJobTitle(pageName));
};

export default JobTitlePageProvider;
