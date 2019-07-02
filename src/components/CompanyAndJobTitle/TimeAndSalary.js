import React from 'react';
import PropTypes from 'prop-types';

import CompanyAndJobTitleWrapper from './CompanyAndJobTitleWrapper';

const TimeAndSalary = ({ pageType, pageName, tabType }) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <h1>TimeAndSalary</h1>
    <p>{pageType}</p>
    <p>{pageName}</p>
    <p>{tabType}</p>
  </CompanyAndJobTitleWrapper>
);

TimeAndSalary.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
};

export default TimeAndSalary;
