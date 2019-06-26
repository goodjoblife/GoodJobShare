import React from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from './CompanyAndJobTitleWrapper';

const Overview = ({ pageType, pageName, tabName }) => (
  <CompanyAndJobTitleWrapper>
    <h1>Overview</h1>
    <p>{pageType}</p>
    <p>{pageName}</p>
    <p>{tabName}</p>
  </CompanyAndJobTitleWrapper>
);

Overview.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabName: PropTypes.string,
};

export default Overview;
