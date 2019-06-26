import React from 'react';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';

const InterviewExperiences = ({ pageType, pageName, tabName }) => (
  <CompanyAndJobTitleWrapper>
    <h1>InterviewExperiences</h1>
    <p>{pageType}</p>
    <p>{pageName}</p>
    <p>{tabName}</p>
  </CompanyAndJobTitleWrapper>
);

export default InterviewExperiences;
