import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { withProps, lifecycle, compose, setStatic } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Overview from '../CompanyAndJobTitle/Overview';
import InterviewExperiences from '../CompanyAndJobTitle/InterviewExperiences';
import WorkExperiences from '../CompanyAndJobTitle/WorkExperiences';
import CompanyJobTitleTimeAndSalary from '../CompanyAndJobTitle/TimeAndSalary';
import NotFound from '../common/NotFound';

import { tabType, pageType } from '../../constants/companyJobTitle';
import jobTitleActions from '../../actions/jobTitle';
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
} from '../../selectors/companyAndJobTitle';
import { paramsSelector } from 'common/routing/selectors';
import withRouteParameter from '../ExperienceSearch/withRouteParameter';

const getJobTitleFromParams = R.compose(
  decodeURIComponent,
  params => params.jobTitle,
  paramsSelector,
);

const JobTitlePageProvider = props => (
  <Switch>
    <Route
      path="/job-titles/:jobTitle"
      exact
      render={({ location: { pathname } }) => (
        <Redirect to={`${pathname}/overview`} />
      )}
    />
    <Route
      path="/job-titles/:jobTitle/overview"
      exact
      render={() => <Overview {...props} tabType={tabType.OVERVIEW} />}
    />
    <Route
      path="/job-titles/:jobTitle/salary-work-times"
      exact
      render={() => (
        <CompanyJobTitleTimeAndSalary
          {...props}
          tabType={tabType.TIME_AND_SALARY}
        />
      )}
    />
    <Route
      path="/job-titles/:jobTitle/interview-experiences"
      exact
      render={() => (
        <InterviewExperiences
          {...props}
          tabType={tabType.INTERVIEW_EXPERIENCE}
        />
      )}
    />
    <Route
      path="/job-titles/:jobTitle/work-experiences"
      exact
      render={() => (
        <WorkExperiences {...props} tabType={tabType.WORK_EXPERIENCE} />
      )}
    />
    <Route component={NotFound} />
  </Switch>
);

JobTitlePageProvider.propTypes = {
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  workExperiences: PropTypes.arrayOf(PropTypes.object),
  salaryWorkTimes: PropTypes.arrayOf(PropTypes.object),
  salaryWorkTimeStatistics: PropTypes.object.isRequired,
  salaryDistribution: PropTypes.array.isRequired,
  averageWeekWorkTime: PropTypes.number.isRequired,
  overtimeFrequencyCount: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

const mapStateToProps = (state, { pageName }) =>
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
  )(state);

const mapDispatchToProps = dispatch =>
  bindActionCreators(jobTitleActions, dispatch);

const ssr = setStatic('fetchData', ({ store: { dispatch }, ...props }) => {
  const jobTitle = getJobTitleFromParams(props);
  return dispatch(jobTitleActions.fetchJobTitle(jobTitle));
});

const enhance = compose(
  ssr,
  withRouteParameter,
  withProps(props => ({
    pageType: pageType.JOB_TITLE,
    pageName: getJobTitleFromParams(props),
  })),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchJobTitle(this.props.pageName);
    },
    componentDidUpdate(prevProps) {
      if (this.props.pageName !== prevProps.pageName) {
        this.props.fetchJobTitle(this.props.pageName);
      }

      if (
        this.props.pageName !== prevProps.pageName ||
        this.props.pageType !== prevProps.pageType
      ) {
        this.props.fetchPermission();
      }
    },
  }),
);

export default enhance(JobTitlePageProvider);
