import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { querySelector } from 'common/routing/selectors';
import CompanyAndJobTitleIndexPage from '../CompanyAndJobTitle/IndexPage';
import usePagination from '../CompanyAndJobTitle/IndexPage/usePagination';
import { pageType } from 'constants/companyJobTitle';
import { fetchCompanyNames } from 'actions/company';
import {
  companyIndexesBoxSelector,
  companiesCountSelector,
} from 'selectors/companyAndJobTitle';

const PAGE_SIZE = 10;

const CompanyIndexProvider = () => {
  const [page, getPageLink] = usePagination();
  const selector = useMemo(() => companyIndexesBoxSelector(page), [page]);
  const companyIndexesBox = useSelector(selector);
  const totalCount = useSelector(companiesCountSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCompanyNames(page, PAGE_SIZE));
  }, [dispatch, page]);

  return (
    <CompanyAndJobTitleIndexPage
      totalCount={totalCount}
      pageType={pageType.COMPANY}
      status={companyIndexesBox.status}
      indexesBox={companyIndexesBox}
      page={page}
      getPageLink={getPageLink}
    />
  );
};

CompanyIndexProvider.fetchData = async ({ store: { dispatch }, ...props }) => {
  const page = Number(querySelector(props).p || 1);
  await dispatch(fetchCompanyNames(page, PAGE_SIZE));
};

export default CompanyIndexProvider;
