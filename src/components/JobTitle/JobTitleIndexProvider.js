import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CompanyAndJobTitleIndexPage from '../CompanyAndJobTitle/IndexPage';
import usePagination from '../CompanyAndJobTitle/IndexPage/usePagination';
import { pageType } from 'constants/companyJobTitle';
import { fetchJobTitles } from 'actions/jobTitle';
import {
  jobTitleIndexesBoxSelector,
  jobTitlesCountSelector,
} from 'selectors/companyAndJobTitle';

const PAGE_SIZE = 10;

const JobTitleIndexProvider = () => {
  const [page] = usePagination();
  const selector = useMemo(() => jobTitleIndexesBoxSelector(page), [page]);
  const jobTitleIndexesBox = useSelector(selector);
  const totalCount = useSelector(jobTitlesCountSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobTitles());
  }, [dispatch]);

  console.log(jobTitleIndexesBox);

  return (
    <CompanyAndJobTitleIndexPage
      pageType={pageType.JOB_TITLE}
      status={jobTitleIndexesBox.status}
      pageNames={jobTitleIndexesBox.data.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE,
      )}
      totalCount={totalCount}
    />
  );
};

JobTitleIndexProvider.fetchData = ({ store: { dispatch } }) =>
  dispatch(fetchJobTitles());

export default JobTitleIndexProvider;
