import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCompanyNames } from 'actions/company';
import { Wrapper } from 'common/base';
import { querySelector } from 'common/routing/selectors';
import CompanyAndJobTitleIndexPage from 'components/CompanyAndJobTitle/IndexPage';
import usePagination from 'components/CompanyAndJobTitle/IndexPage/usePagination';
import { PAGE_SIZE, PageType } from 'constants/companyJobTitle';
import {
  companiesCountSelector,
  companyIndexesBoxSelectorAtPage,
} from 'selectors/companyAndJobTitle';
import { pageFromQuerySelector } from 'selectors/routing';

const CompanyIndexProvider = () => {
  const [page, getPageLink] = usePagination();
  const selector = useMemo(() => companyIndexesBoxSelectorAtPage(page), [page]);
  const companyIndexesBox = useSelector(selector);
  const totalCount = useSelector(companiesCountSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCompanyNames({ page, pageSize: PAGE_SIZE }));
  }, [dispatch, page]);

  return (
    <Wrapper size="l">
      <CompanyAndJobTitleIndexPage
        totalCount={totalCount}
        pageType={PageType.COMPANY}
        indexesBox={companyIndexesBox}
        page={page}
        getPageLink={getPageLink}
      />
    </Wrapper>
  );
};

CompanyIndexProvider.fetchData = async ({ store: { dispatch }, ...props }) => {
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  await dispatch(fetchCompanyNames({ page, pageSize: PAGE_SIZE }));
};

export default CompanyIndexProvider;
