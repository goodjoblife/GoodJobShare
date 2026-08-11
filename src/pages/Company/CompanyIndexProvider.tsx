import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCompanyNames } from 'actions/company';
import { Wrapper } from 'common/base';
import { querySelector } from 'common/routing/selectors';
import IndexList from 'components/CompanyAndJobTitle/IndexList';
import usePagination from 'components/CompanyAndJobTitle/IndexList/usePagination';
import { PAGE_SIZE, PageType } from 'constants/companyJobTitle';
import {
  companiesCountSelector,
  companyIndexesBoxSelectorAtPage,
} from 'selectors/companyAndJobTitle';
import { pageFromQuerySelector } from 'selectors/routing';
import { ServerSideRender } from 'types/serverSideRender';

const CompanyIndexProvider: React.FC & ServerSideRender = () => {
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
      <IndexList
        totalCount={totalCount}
        pageType={PageType.COMPANY}
        indexesBox={companyIndexesBox}
        page={page}
        getPageLink={getPageLink}
      />
    </Wrapper>
  );
};

CompanyIndexProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  return dispatch(fetchCompanyNames({ page, pageSize: PAGE_SIZE }));
};

export default CompanyIndexProvider;
