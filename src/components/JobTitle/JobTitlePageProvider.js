import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { withProps, lifecycle, compose, setStatic } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { pageType } from '../../constants/companyJobTitle';
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

const JobTitlePageProvider = ({
  children,
  pageType,
  pageName,
  tabType,
  interviewExperiences,
  workExperiences,
  salaryWorkTimes,
  salaryWorkTimeStatistics,
  status,
  page,
}) => (
  <React.Fragment>
    {children({
      pageType,
      pageName,
      tabType,
      interviewExperiences,
      workExperiences,
      salaryWorkTimes,
      salaryWorkTimeStatistics,
      status,
      page,
    })}
  </React.Fragment>
);

JobTitlePageProvider.propTypes = {
  children: PropTypes.func.isRequired,
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
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
