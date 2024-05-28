import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { withProps, compose } from 'recompose';
import { useSelector, useDispatch } from 'react-redux';
import { generatePath } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Overview from '../CompanyAndJobTitle/Overview';
import InterviewExperiences from '../CompanyAndJobTitle/InterviewExperiences';
import WorkExperiences from '../CompanyAndJobTitle/WorkExperiences';
import CompanyJobTitleTimeAndSalary from '../CompanyAndJobTitle/TimeAndSalary';
import NotFound from 'common/NotFound';
import Redirect from 'common/routing/Redirect';
import usePermission from 'hooks/usePermission';
import { tabType, pageType } from 'constants/companyJobTitle';
import { fetchJobTitle } from 'actions/jobTitle';
import {
  interviewExperiences,
  workExperiences,
  salaryWorkTimes,
  salaryWorkTimeStatistics,
  salaryDistribution,
  averageWeekWorkTime,
  overtimeFrequencyCount,
  status,
  jobTitle as jobTitleSelector,
} from 'selectors/companyAndJobTitle';
import { paramsSelector } from 'common/routing/selectors';
import withRouteParameter from '../ExperienceSearch/withRouteParameter';

const getJobTitleFromParams = R.compose(
  decodeURIComponent,
  params => params.jobTitle,
  paramsSelector,
);

const JobTitlePageProvider = ({ pageType, pageName, page }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobTitle(pageName));
  }, [dispatch, pageName]);

  const [, fetchPermission, canView] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, pageName, fetchPermission]);

  const data = useSelector(
    R.compose(
      createStructuredSelector({
        status,
        interviewExperiences,
        workExperiences,
        salaryWorkTimes,
        salaryWorkTimeStatistics,
        salaryDistribution,
        averageWeekWorkTime,
        overtimeFrequencyCount,
      }),
      jobTitleSelector(pageName),
    ),
  );

  return (
    <Switch>
      <Route
        path="/job-titles/:jobTitle"
        exact
        render={() => (
          <Overview
            {...data}
            pageType={pageType}
            pageName={pageName}
            page={page}
            canView={canView}
            tabType={tabType.OVERVIEW}
          />
        )}
      />
      {/* 相容舊網址 */}
      <Route
        path="/job-titles/:jobTitle/overview"
        exact
        render={({ match: { params } }) => {
          const jobTitle = decodeURIComponent(params.jobTitle);
          const path = generatePath('/job-titles/:jobTitle', { jobTitle });
          return <Redirect to={path} />;
        }}
      />
      <Route
        path="/job-titles/:jobTitle/salary-work-times"
        exact
        render={() => (
          <CompanyJobTitleTimeAndSalary
            {...data}
            pageType={pageType}
            pageName={pageName}
            page={page}
            canView={canView}
            tabType={tabType.TIME_AND_SALARY}
          />
        )}
      />
      <Route
        path="/job-titles/:jobTitle/interview-experiences"
        exact
        render={() => (
          <InterviewExperiences
            {...data}
            pageType={pageType}
            pageName={pageName}
            page={page}
            canView={canView}
            tabType={tabType.INTERVIEW_EXPERIENCE}
          />
        )}
      />
      <Route
        path="/job-titles/:jobTitle/work-experiences"
        exact
        render={() => (
          <WorkExperiences
            {...data}
            pageType={pageType}
            pageName={pageName}
            page={page}
            canView={canView}
            tabType={tabType.WORK_EXPERIENCE}
          />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

JobTitlePageProvider.propTypes = {
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

JobTitlePageProvider.fetchData = ({ store: { dispatch }, ...props }) => {
  const jobTitle = getJobTitleFromParams(props);
  return dispatch(fetchJobTitle(jobTitle));
};

const enhance = compose(
  withRouteParameter,
  withProps(props => ({
    pageType: pageType.JOB_TITLE,
    pageName: getJobTitleFromParams(props),
  })),
);

export default enhance(JobTitlePageProvider);
