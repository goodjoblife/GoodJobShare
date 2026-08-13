import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchJobTitles } from 'actions/jobTitle';
import { Wrapper } from 'common/base';
import { querySelector } from 'common/routing/selectors';
import IndexList from 'components/CompanyAndJobTitle/IndexList';
import usePagination from 'components/CompanyAndJobTitle/IndexList/usePagination';
import { PAGE_SIZE, PageType } from 'constants/companyJobTitle';
import {
  jobTitleIndexesBoxSelectorAtPage,
  jobTitlesCountSelector,
} from 'selectors/companyAndJobTitle';
import { pageFromQuerySelector } from 'selectors/routing';
import { ServerSideRender } from 'types/serverSideRender';

const JobTitleIndexProvider: React.FC & ServerSideRender = () => {
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
    <Wrapper size="l">
      <IndexList
        totalCount={totalCount}
        pageType={PageType.JOB_TITLE}
        indexesBox={jobTitleIndexesBox}
        page={page}
        getPageLink={getPageLink}
      />
    </Wrapper>
  );
};

JobTitleIndexProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  return dispatch(fetchJobTitles({ page, pageSize: PAGE_SIZE }));
};

export default JobTitleIndexProvider;
