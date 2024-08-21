import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TimeAndSalary from '../CompanyAndJobTitle/TimeAndSalary';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { tabType, pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import { fetchCompany } from 'actions/company';
import {
  salaryWorkTimes as salaryWorkTimesSelector,
  salaryWorkTimeStatistics as salaryWorkTimeStatisticsSelector,
  status as statusSelector,
  company as companySelector,
} from 'selectors/companyAndJobTitle';
import { paramsSelector } from 'common/routing/selectors';
import { usePageName, pageNameSelector } from './usePageName';

const useTimeAndSalaryBox = pageName => {
  const selector = useCallback(
    state => {
      const company = companySelector(pageName)(state);
      return {
        status: statusSelector(company),
        salaryWorkTimes: salaryWorkTimesSelector(company),
        salaryWorkTimeStatistics: salaryWorkTimeStatisticsSelector(company),
      };
    },
    [pageName],
  );

  return useSelector(selector);
};

const CompanyTimeAndSalaryProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const pageName = usePageName();
  const page = usePage();

  useEffect(() => {
    dispatch(fetchCompany(pageName));
  }, [dispatch, pageName]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, pageName, fetchPermission]);

  const {
    status,
    salaryWorkTimes,
    salaryWorkTimeStatistics,
  } = useTimeAndSalaryBox(pageName);

  return (
    <TimeAndSalary
      pageType={pageType}
      pageName={pageName}
      page={page}
      tabType={tabType.TIME_AND_SALARY}
      status={status}
      salaryWorkTimes={salaryWorkTimes}
      salaryWorkTimeStatistics={salaryWorkTimeStatistics}
    />
  );
};

CompanyTimeAndSalaryProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const pageName = pageNameSelector(params);
  return dispatch(fetchCompany(pageName));
};

export default CompanyTimeAndSalaryProvider;
