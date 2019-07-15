import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { withProps } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';

import { pageType } from '../../constants/companyJobTitle';
import companyAndJobTitleActions from '../../actions/companyAndJobTitle';
import companyAndJobTitleSelectors, {
  pageData as pageDataSelector,
} from '../../selectors/companyAndJobTitle';
import withRouteParameter from '../ExperienceSearch/withRouteParameter';

const JobTitlePageProvider = ({
  children,
  pageType,
  pageName,
  tabType,
  interviewExperiences,
  status,
  page,
  fetchPageData,
}) => (
  <React.Fragment>
    {children({
      pageType,
      pageName,
      tabType,
      interviewExperiences,
      status,
      page,
      fetchPageData,
    })}
  </React.Fragment>
);

JobTitlePageProvider.propTypes = {
  children: PropTypes.func.isRequired,
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  fetchPageData: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { pageType, pageName }) =>
  R.compose(
    createStructuredSelector(companyAndJobTitleSelectors),
    pageDataSelector(pageType, pageName),
  )(state);

const mapDispatchToProps = dispatch =>
  bindActionCreators(companyAndJobTitleActions, dispatch);

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
);

export default enhance(JobTitlePageProvider);
