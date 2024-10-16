import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { querySelector } from 'common/routing/selectors';
import { pageFromQuerySelector } from 'selectors/routing/page';
import CompanyAndJobTitleIndexPage from 'components/CompanyAndJobTitle/IndexPage';
import usePagination from 'components/CompanyAndJobTitle/IndexPage/usePagination';
import { pageType } from 'constants/companyJobTitle';
import { fetchJobTitles } from 'actions/jobTitle';
import {
  jobTitleIndexesBoxSelectorAtPage,
  jobTitlesCountSelector,
} from 'selectors/companyAndJobTitle';

const PAGE_SIZE = 10;

const JobTitleIndexProvider = () => {
  const [page, getPageLink] = usePagination();
  const selector = useMemo(() => jobTitleIndexesBoxSelectorAtPage(page), [
    page,
  ]);
  const jobTitleIndexesBox = useSelector(selector);
  const totalCount = useSelector(jobTitlesCountSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobTitles({ page, pageSize: PAGE_SIZE }));
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
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  await dispatch(fetchJobTitles({ page, pageSize: PAGE_SIZE }));
};

export default JobTitleIndexProvider;
