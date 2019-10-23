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
import { withPermission } from 'common/permission-context';

import { tabType, pageType } from '../../constants/companyJobTitle';
import companyActions from '../../actions/company';
import {
  interviewExperiences,
  workExperiences,
  salaryWorkTimes,
  salaryWorkTimeStatistics,
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
  withPermission,
  withProps(props => ({
    pageType: pageType.COMPANY,
    pageName: getCompanyNameFromParams(props),
  })),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withProps(() => ({
    crossComparisonSalaryStatistics: [
      { name: '軟體工程師', salary: 60000 },
      { name: '行銷企劃', salary: 40000 },
      { name: 'UI/UX 設計師', salary: 40000 },
      { name: 'PM', salary: 50000 },
    ],
    averageWeekWorkHours: 45,
    frequentOverTimeRatio: 0.6,
    fewOverTimeRatio: 0.2,
  })),
  lifecycle({
    componentDidMount() {
      this.props.fetchCompany(this.props.pageName);
      this.props.fetchPermission();
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
