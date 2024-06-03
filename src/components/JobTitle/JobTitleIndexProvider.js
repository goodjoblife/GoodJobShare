import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { querySelector } from 'common/routing/selectors';
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
  const [page, getPageLink] = usePagination();
  const selector = useMemo(() => jobTitleIndexesBoxSelector(page), [page]);
  const jobTitleIndexesBox = useSelector(selector);
  const totalCount = useSelector(jobTitlesCountSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobTitles(page, PAGE_SIZE));
  }, [dispatch, page]);

  return (
    <CompanyAndJobTitleIndexPage
      totalCount={totalCount}
      pageType={pageType.JOB_TITLE}
      status={jobTitleIndexesBox.status}
      indexesBox={jobTitleIndexesBox}
      page={page}
      getPageLink={getPageLink}
    />
  );
};

JobTitleIndexProvider.fetchData = async ({ store: { dispatch }, ...props }) => {
  const page = Number(querySelector(props).p || 1);
  await dispatch(fetchJobTitles(page, PAGE_SIZE));
};

export default JobTitleIndexProvider;
