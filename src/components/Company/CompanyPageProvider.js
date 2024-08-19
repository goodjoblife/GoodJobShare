import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generatePath } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import InterviewExperiences from '../CompanyAndJobTitle/InterviewExperiences';
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
  companyInterviewExperiencesPath,
  companyWorkExperiencesPath,
} from 'constants/linkTo';
import { fetchCompany } from 'actions/company';
import {
  interviewExperiences,
  workExperiences,
  salaryWorkTimes,
  salaryWorkTimeStatistics,
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
  status,
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
        status: status(company),
        interviewExperiences: interviewExperiences(company),
        workExperiences: workExperiences(company),
        salaryWorkTimes: salaryWorkTimes(company),
        salaryWorkTimeStatistics: salaryWorkTimeStatistics(company),
        jobAverageSalaries: jobAverageSalaries(company),
        averageWeekWorkTime: averageWeekWorkTime(company),
        overtimeFrequencyCount: overtimeFrequencyCount(company),
      };
    },
    [pageName],
  );
  const data = useSelector(selector);

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
            {...data}
            pageType={pageType}
            pageName={pageName}
            page={page}
            tabType={tabType.TIME_AND_SALARY}
          />
        )}
      />
      <Route
        path={companyInterviewExperiencesPath}
        exact
        render={() => (
          <InterviewExperiences
            {...data}
            pageType={pageType}
            pageName={pageName}
            page={page}
            canView={canView}
            tabType={tabType.INTERVIEW_EXPERIENCE}
          />
        )}
      />
      <Route
        path={companyWorkExperiencesPath}
        exact
        render={() => (
          <WorkExperiences
            {...data}
            pageType={pageType}
            pageName={pageName}
            page={page}
            canView={canView}
            tabType={tabType.WORK_EXPERIENCE}
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
