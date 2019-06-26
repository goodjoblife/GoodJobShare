import React from 'react';
import CompanyAndJobTitleWrapper from './CompanyAndJobTitleWrapper';

const TimeAndSalary = ({ pageType, pageName, tabName }) => (
  <CompanyAndJobTitleWrapper>
    <h1>TimeAndSalary</h1>
    <p>{pageType}</p>
    <p>{pageName}</p>
    <p>{tabName}</p>
  </CompanyAndJobTitleWrapper>
);

export default TimeAndSalary;
