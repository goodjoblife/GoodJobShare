import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { withProps, lifecycle, compose, setStatic } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Overview from '../CompanyAndJobTitle/Overview';
import InterviewExperiences from '../CompanyAndJobTitle/InterviewExperiences';
import WorkExperiences from '../CompanyAndJobTitle/WorkExperiences';
import CompanyJobTitleTimeAndSalary from '../CompanyAndJobTitle/TimeAndSalary';

import { tabType, pageType } from '../../constants/companyJobTitle';
import jobTitleActions from '../../actions/jobTitle';
import {
  interviewExperiences,
  workExperiences,
  salaryWorkTimes,
  salaryWorkTimeStatistics,
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
  </Switch>
);

JobTitlePageProvider.propTypes = {
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  workExperiences: PropTypes.arrayOf(PropTypes.object),
  salaryWorkTimes: PropTypes.arrayOf(PropTypes.object),
  salaryWorkTimeStatistics: PropTypes.object,
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
    }),
    jobTitleSelector(pageName),
  )(state);

const mapDispatchToProps = dispatch =>
  bindActionCreators(jobTitleActions, dispatch);

const ssr = setStatic('fetchData', ({ store: { dispatch }, ...props }) => {
  const jobTitle = getJobTitleFromParams(props);
  return dispatch(jobTitleActions.fetchCompany(jobTitle));
});

const enhance = compose(
  ssr,
  withRouteParameter,
  withProps(({ match: { params: { jobTitle } } }) => ({
    pageType: pageType.JOB_TITLE,
    pageName: jobTitle,
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
    },
  }),
);

export default enhance(JobTitlePageProvider);
