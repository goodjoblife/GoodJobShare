import React from 'react';
import CompanyAndJobTitleWrapper from './CompanyAndJobTitleWrapper';

const WorkExperiences = ({ pageType, pageName, tabName }) => (
  <CompanyAndJobTitleWrapper>
    <h1>WorkExperiences</h1>
    <p>{pageType}</p>
    <p>{pageName}</p>
    <p>{tabName}</p>
  </CompanyAndJobTitleWrapper>
);

export default WorkExperiences;
