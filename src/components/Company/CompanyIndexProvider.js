import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CompanyAndJobTitleIndexPage from '../CompanyAndJobTitle/IndexPage';
import { pageType } from 'constants/companyJobTitle';
import { fetchCompanyNames } from 'actions/company';
import {
  companyNames as companyNamesSelector,
  companyNamesStatus as companyNamesStatusSelector,
} from 'selectors/companyAndJobTitle';

const CompanyIndexProvider = () => {
  const status = useSelector(companyNamesStatusSelector);
  const companyNames = useSelector(companyNamesSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCompanyNames());
  }, [dispatch]);
  return (
    <CompanyAndJobTitleIndexPage
      pageType={pageType.COMPANY}
      status={status}
      pageNames={companyNames}
    />
  );
};

CompanyIndexProvider.fetchData = ({ store: { dispatch } }) =>
  dispatch(fetchCompanyNames());

export default CompanyIndexProvider;
