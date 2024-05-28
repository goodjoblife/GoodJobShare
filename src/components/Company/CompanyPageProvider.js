import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { withProps, compose } from 'recompose';
import { useSelector, useDispatch } from 'react-redux';
import { generatePath } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Overview from '../CompanyAndJobTitle/Overview';
import InterviewExperiences from '../CompanyAndJobTitle/InterviewExperiences';
import WorkExperiences from '../CompanyAndJobTitle/WorkExperiences';
import CompanyJobTitleTimeAndSalary from '../CompanyAndJobTitle/TimeAndSalary';
import NotFound from 'common/NotFound';
import Redirect from 'common/routing/Redirect';
import usePermission from 'hooks/usePermission';
import { tabType, pageType } from 'constants/companyJobTitle';
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
import { paramsSelector } from 'common/routing/selectors';
import withRouteParameter from '../ExperienceSearch/withRouteParameter';

const getCompanyNameFromParams = R.compose(
  decodeURIComponent,
  params => params.companyName,
  paramsSelector,
);

const CompanyPageProvider = ({ pageType, pageName, page }) => {
  const dispatch = useDispatch();

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
      <Route
        path="/companies/:companyName"
        exact
        render={() => (
          <Overview
            {...data}
            pageType={pageType}
            pageName={pageName}
            page={page}
            canView={canView}
            tabType={tabType.OVERVIEW}
          />
        )}
      />
      {/* 相容舊網址 */}
      <Route
        path="/companies/:companyName/overview"
        exact
        render={({ match: { params } }) => {
          const companyName = decodeURIComponent(params.companyName);
          const path = generatePath('/companies/:companyName', { companyName });
          return <Redirect to={path} />;
        }}
      />
      <Route
        path="/companies/:companyName/salary-work-times"
        exact
        render={() => (
          <CompanyJobTitleTimeAndSalary
            {...data}
            pageType={pageType}
            pageName={pageName}
            page={page}
            canView={canView}
            tabType={tabType.TIME_AND_SALARY}
          />
        )}
      />
      <Route
        path="/companies/:companyName/interview-experiences"
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
        path="/companies/:companyName/work-experiences"
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

CompanyPageProvider.propTypes = {
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

CompanyPageProvider.fetchData = ({ store: { dispatch }, ...props }) => {
  const companyName = getCompanyNameFromParams(props);
  return dispatch(fetchCompany(companyName));
};

const enhance = compose(
  withRouteParameter,
  withProps(props => ({
    pageType: pageType.COMPANY,
    pageName: getCompanyNameFromParams(props),
  })),
);

export default enhance(CompanyPageProvider);
