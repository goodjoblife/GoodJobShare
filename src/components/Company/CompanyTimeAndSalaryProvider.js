import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TimeAndSalary from '../CompanyAndJobTitle/TimeAndSalary';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { tabType, pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import { queryCompanyTimeAndSalary } from 'actions/company';
import {
  salaryWorkTimes as salaryWorkTimesSelector,
  salaryWorkTimesCount as salaryWorkTimesCountSelector,
  salaryWorkTimeStatistics as salaryWorkTimeStatisticsSelector,
  status as statusSelector,
  companyTimeAndSalaryBoxSelectorByName as timeAndSalaryBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import { usePageName, pageNameSelector } from './usePageName';
import { pageFromQuerySelector } from 'selectors/routing/page';

const useTimeAndSalaryBox = pageName => {
  const selector = useCallback(
    state => {
      const company = timeAndSalaryBoxSelectorByName(pageName)(state);
      return {
        status: statusSelector(company),
        salaryWorkTimes: salaryWorkTimesSelector(company),
        salaryWorkTimesCount: salaryWorkTimesCountSelector(company),
        salaryWorkTimeStatistics: salaryWorkTimeStatisticsSelector(company),
      };
    },
    [pageName],
  );

  return useSelector(selector);
};

const PAGE_SIZE = 10;

const CompanyTimeAndSalaryProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const pageName = usePageName();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(
      queryCompanyTimeAndSalary({ companyName: pageName, start, limit }),
    );
  }, [dispatch, pageName, start, limit]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, pageName, fetchPermission]);

  const {
    status,
    salaryWorkTimes,
    salaryWorkTimesCount,
    salaryWorkTimeStatistics,
  } = useTimeAndSalaryBox(pageName);

  return (
    <TimeAndSalary
      pageType={pageType}
      pageName={pageName}
      page={page}
      pageSize={PAGE_SIZE}
      totalCount={salaryWorkTimesCount}
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
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return dispatch(queryCompanyTimeAndSalary({ pageName, start, limit }));
};

export default CompanyTimeAndSalaryProvider;
