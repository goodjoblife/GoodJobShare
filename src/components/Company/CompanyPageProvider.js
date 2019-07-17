import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { withProps, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';

import { pageType } from '../../constants/companyJobTitle';
import companyActions from '../../actions/company';
import companySelectors, {
  company as companySelector,
} from '../../selectors/companyAndJobTitle';
import withRouteParameter from '../ExperienceSearch/withRouteParameter';

const CompanyPageProvider = ({
  children,
  pageType,
  pageName,
  tabType,
  interviewExperiences,
  status,
  page,
}) => (
  <React.Fragment>
    {children({
      pageType,
      pageName,
      tabType,
      interviewExperiences,
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
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

const mapStateToProps = (state, { pageName }) =>
  R.compose(
    createStructuredSelector(companySelectors),
    companySelector(pageName),
  )(state);

const mapDispatchToProps = dispatch =>
  bindActionCreators(companyActions, dispatch);

const enhance = compose(
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
