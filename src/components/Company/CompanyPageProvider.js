import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { withProps, lifecycle, compose, setStatic } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { pageType } from '../../constants/companyJobTitle';
import companyActions from '../../actions/company';
import {
  interviewExperiences,
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

const CompanyPageProvider = ({
  children,
  pageType,
  pageName,
  tabType,
  interviewExperiences,
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
      salaryWorkTimes,
      salaryWorkTimeStatistics,
      status,
      page,
    })}
  </React.Fragment>
);

CompanyPageProvider.propTypes = {
  children: PropTypes.func.isRequired,
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
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
  withProps(({ match: { params: { companyName } } }) => ({
    pageType: pageType.COMPANY,
    pageName: companyName,
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
    },
  }),
);

export default enhance(CompanyPageProvider);
