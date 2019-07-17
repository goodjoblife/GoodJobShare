import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { withProps, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';

import { pageType } from '../../constants/companyJobTitle';
import jobTitleActions from '../../actions/jobTitle';
import jobTitleSelectors, {
  jobTitle as jobTitleSelector,
} from '../../selectors/companyAndJobTitle';
import withRouteParameter from '../ExperienceSearch/withRouteParameter';

const JobTitlePageProvider = ({
  children,
  pageType,
  pageName,
  tabType,
  interviewExperiences,
  workExperiences,
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
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

const mapStateToProps = (state, { pageName }) =>
  R.compose(
    createStructuredSelector(jobTitleSelectors),
    jobTitleSelector(pageName),
  )(state);

const mapDispatchToProps = dispatch =>
  bindActionCreators(jobTitleActions, dispatch);

const enhance = compose(
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
