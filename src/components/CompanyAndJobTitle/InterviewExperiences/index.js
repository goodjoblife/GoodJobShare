import React, { useState, useCallback, useEffect } from 'react';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import InterviewExperiencesSection from './InterviewExperiences';
import STATUS from '../../../constants/status';

const InterviewExperiences = ({
  pageType, // eslint-disable-line no-unused-vars
  pageName, // eslint-disable-line no-unused-vars
  tabName, // eslint-disable-line no-unused-vars
}) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(STATUS.UNFETCHED);
  const fetchData = useCallback(() => {
    setStatus(STATUS.FETCHING);
    setTimeout(() => {
      setData([]);
      setStatus(STATUS.FETCHED);
    }, 1000);
  }, []);
  useEffect(
    () => {
      fetchData();
    },
    [fetchData],
  );
  return (
    <CompanyAndJobTitleWrapper>
      <InterviewExperiencesSection data={data} status={status} />
    </CompanyAndJobTitleWrapper>
  );
};

export default props => <InterviewExperiences {...props} />;
