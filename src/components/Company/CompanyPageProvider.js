import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';

import { pageType } from '../../constants/companyJobTitle';
import companyAndJobTitleActions from '../../actions/companyAndJobTitle';
import companyAndJobTitleSelectors from '../../selectors/companyAndJobTitle';
import withRouteParameter from '../ExperienceSearch/withRouteParameter';

const CompanyPageProvider = ({
  children,
  match: {
    params: { companyName },
  },
  tabType,
  interviewExperiences,
  status,
  page,
  fetchPageData,
}) => (
  <React.Fragment>
    {children({
      pageType: pageType.COMPANY,
      pageName: companyName,
      tabType,
      interviewExperiences,
      status,
      page,
      fetchPageData,
    })}
  </React.Fragment>
);

CompanyPageProvider.propTypes = {
  chdilren: PropTypes.node,
  match: PropTypes.shape({
    params: PropTypes.shape({
      companyName: PropTypes.string,
    }),
  }),
  tabType: PropTypes.string,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  fetchPageData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector(companyAndJobTitleSelectors);

const mapDispatchToProps = dispatch =>
  bindActionCreators(companyAndJobTitleActions, dispatch);

const enhance = compose(
  withRouteParameter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(CompanyPageProvider);
