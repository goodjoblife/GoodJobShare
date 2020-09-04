import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CompanyAndJobTitleIndexPage from '../CompanyAndJobTitle/IndexPage';
import { pageType } from '../../constants/companyJobTitle';
import { fetchJobTitles } from '../../actions/jobTitle';
import {
  jobTitlesStatus as jobTitlesStatusSelector,
  jobTitles as jobTitlesSelector,
} from '../../selectors/companyAndJobTitle';

const JobTitleIndexProvider = () => {
  const status = useSelector(jobTitlesStatusSelector);
  const jobTitles = useSelector(jobTitlesSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobTitles());
  }, [dispatch]);
  return (
    <CompanyAndJobTitleIndexPage
      pageType={pageType.JOB_TITLE}
      status={status}
      pageNames={jobTitles}
    />
  );
};

JobTitleIndexProvider.fetchData = ({ store: { dispatch } }) =>
  dispatch(fetchJobTitles());

export default JobTitleIndexProvider;
