import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generatePath } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import InterviewExperiences from '../CompanyAndJobTitle/InterviewExperiences';
import WorkExperiences from '../CompanyAndJobTitle/WorkExperiences';
import NotFound from 'common/NotFound';
import Redirect from 'common/routing/Redirect';
import { paramsSelector } from 'common/routing/selectors';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { tabType, pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import {
  companyInterviewExperiencesPath,
  companyWorkExperiencesPath,
} from 'constants/linkTo';
import { fetchCompany } from 'actions/company';
import {
  interviewExperiences as interviewExperiencesSelector,
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
        interviewExperiences: interviewExperiencesSelector(company),
        workExperiences: workExperiencesSelector(company),
        salaryWorkTimes: salaryWorkTimesSelector(company),
        salaryWorkTimeStatistics: salaryWorkTimeStatisticsSelector(company),
      };
    },
    [pageName],
  );
  const { status, interviewExperiences, workExperiences } = useSelector(
    selector,
  );

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
        path={companyInterviewExperiencesPath}
        exact
        render={() => (
          <InterviewExperiences
            pageType={pageType}
            pageName={pageName}
            page={page}
            canView={canView}
            tabType={tabType.INTERVIEW_EXPERIENCE}
            status={status}
            interviewExperiences={interviewExperiences}
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
            workExperiences={workExperiences}
            status={status}
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
