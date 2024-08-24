import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generatePath } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import WorkExperiences from '../CompanyAndJobTitle/WorkExperiences';
import CompanyJobTitleTimeAndSalary from '../CompanyAndJobTitle/TimeAndSalary';
import NotFound from 'common/NotFound';
import Redirect from 'common/routing/Redirect';
import { paramsSelector } from 'common/routing/selectors';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { tabType, pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import {
  companySalaryWorkTimesPath,
  companyWorkExperiencesPath,
} from 'constants/linkTo';
import { fetchCompany } from 'actions/company';
import {
  workExperiences as workExperiencesSelector,
  salaryWorkTimes as salaryWorkTimesSelector,
  salaryWorkTimeStatistics as salaryWorkTimeStatisticsSelector,
  status as statusSelector,
  company as companySelector,
} from 'selectors/companyAndJobTitle';
import { usePageName, pageNameSelector } from './usePageName';

const CompanyPageProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const pageName = usePageName();
  const page = usePage();

  useEffect(() => {
    dispatch(fetchCompany(pageName));
  }, [dispatch, pageName]);

  const [, fetchPermission, canView] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, pageName, fetchPermission]);

  const selector = useCallback(
    state => {
      const company = companySelector(pageName)(state);
      return {
        status: statusSelector(company),
        workExperiences: workExperiencesSelector(company),
        salaryWorkTimes: salaryWorkTimesSelector(company),
        salaryWorkTimeStatistics: salaryWorkTimeStatisticsSelector(company),
      };
    },
    [pageName],
  );
  const {
    status,
    workExperiences,
    salaryWorkTimes,
    salaryWorkTimeStatistics,
  } = useSelector(selector);

  return (
    <Switch>
      {/* 相容舊網址 */}
      <Route
        path="/companies/:companyName/overview"
        exact
        render={({ match: { params } }) => {
          const companyName = pageNameSelector(params);
          const path = generatePath('/companies/:companyName', { companyName });
          return <Redirect to={path} />;
        }}
      />
      <Route
        path={companySalaryWorkTimesPath}
        exact
        render={() => (
          <CompanyJobTitleTimeAndSalary
            pageType={pageType}
            pageName={pageName}
            page={page}
            tabType={tabType.TIME_AND_SALARY}
            status={status}
            salaryWorkTimes={salaryWorkTimes}
            salaryWorkTimeStatistics={salaryWorkTimeStatistics}
          />
        )}
      />
      <Route
        path={companyWorkExperiencesPath}
        exact
        render={() => (
          <WorkExperiences
            pageType={pageType}
            pageName={pageName}
            page={page}
            canView={canView}
            tabType={tabType.WORK_EXPERIENCE}
            status={status}
            workExperiences={workExperiences}
          />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

CompanyPageProvider.fetchData = ({ store: { dispatch }, ...props }) => {
  const params = paramsSelector(props);
  const pageName = pageNameSelector(params);
  return dispatch(fetchCompany(pageName));
};

export default CompanyPageProvider;
