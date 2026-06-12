import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchJobTitles } from 'actions/jobTitle';
import { querySelector } from 'common/routing/selectors';
import CompanyAndJobTitleIndexPage from 'components/CompanyAndJobTitle/IndexPage';
import usePagination from 'components/CompanyAndJobTitle/IndexPage/usePagination';
import { PAGE_SIZE, PageType } from 'constants/companyJobTitle';
import {
  jobTitleIndexesBoxSelectorAtPage,
  jobTitlesCountSelector,
} from 'selectors/companyAndJobTitle';
import { pageFromQuerySelector } from 'selectors/routing';

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
      pageType={PageType.JOB_TITLE}
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
