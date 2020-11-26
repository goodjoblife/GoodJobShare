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
import companyActions from '../../actions/company';
import {
  interviewExperiences,
  workExperiences,
  salaryWorkTimes,
  salaryWorkTimeStatistics,
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
  status,
  company as companySelector,
} from '../../selectors/companyAndJobTitle';
import { paramsSelector } from 'common/routing/selectors';
import withRouteParameter from '../ExperienceSearch/withRouteParameter';

const getCompanyNameFromParams = R.compose(
  decodeURIComponent,
  params => params.companyName,
  paramsSelector,
);

const CompanyPageProvider = props => (
  <Switch>
    <Route
      path="/companies/:companyName"
      exact
      render={({ location: { pathname } }) => (
        <Redirect to={`${pathname}/overview`} />
      )}
    />
    <Route
      path="/companies/:companyName/overview"
      exact
      render={() => <Overview {...props} tabType={tabType.OVERVIEW} />}
    />
    <Route
      path="/companies/:companyName/salary-work-times"
      exact
      render={() => (
        <CompanyJobTitleTimeAndSalary
          {...props}
          tabType={tabType.TIME_AND_SALARY}
        />
      )}
    />
    <Route
      path="/companies/:companyName/interview-experiences"
      exact
      render={() => (
        <InterviewExperiences
          {...props}
          tabType={tabType.INTERVIEW_EXPERIENCE}
        />
      )}
    />
    <Route
      path="/companies/:companyName/work-experiences"
      exact
      render={() => (
        <WorkExperiences {...props} tabType={tabType.WORK_EXPERIENCE} />
      )}
    />
    <Route component={NotFound} />
  </Switch>
);

CompanyPageProvider.propTypes = {
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  workExperiences: PropTypes.arrayOf(PropTypes.object),
  salaryWorkTimes: PropTypes.arrayOf(PropTypes.object),
  salaryWorkTimeStatistics: PropTypes.object.isRequired,
  jobAverageSalaries: PropTypes.array.isRequired,
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
      jobAverageSalaries,
      averageWeekWorkTime,
      overtimeFrequencyCount,
    }),
    companySelector(pageName),
  )(state);

const mapDispatchToProps = dispatch =>
  bindActionCreators(companyActions, dispatch);

const ssr = setStatic('fetchData', ({ store: { dispatch }, ...props }) => {
  const companyName = getCompanyNameFromParams(props);
  return dispatch(companyActions.fetchCompany(companyName));
});

const enhance = compose(
  ssr,
  withRouteParameter,
  withProps(props => ({
    pageType: pageType.COMPANY,
    pageName: getCompanyNameFromParams(props),
  })),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchCompany(this.props.pageName);
    },
    componentDidUpdate(prevProps) {
      if (this.props.pageName !== prevProps.pageName) {
        this.props.fetchCompany(this.props.pageName);
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

export default enhance(CompanyPageProvider);
