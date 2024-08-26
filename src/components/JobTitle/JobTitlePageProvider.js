import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generatePath } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import WorkExperiences from '../CompanyAndJobTitle/WorkExperiences';
import NotFound from 'common/NotFound';
import Redirect from 'common/routing/Redirect';
import { paramsSelector } from 'common/routing/selectors';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { tabType, pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import { jobTitleWorkExperiencesPath } from 'constants/linkTo';
import { fetchJobTitle } from 'actions/jobTitle';
import {
  workExperiences as workExperiencesSelector,
  status as statusSelector,
  jobTitle as jobTitleSelector,
} from 'selectors/companyAndJobTitle';
import { usePageName, pageNameSelector } from './usePageName';

const JobTitlePageProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.JOB_TITLE;
  const pageName = usePageName();
  const page = usePage();

  useEffect(() => {
    dispatch(fetchJobTitle(pageName));
  }, [dispatch, pageName]);

  const [, fetchPermission, canView] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, pageName, fetchPermission]);

  const selector = useCallback(
    state => {
      const jobTitle = jobTitleSelector(pageName)(state);
      return {
        status: statusSelector(jobTitle),
        workExperiences: workExperiencesSelector(jobTitle),
      };
    },
    [pageName],
  );
  const { status, workExperiences } = useSelector(selector);

  return (
    <Switch>
      {/* 相容舊網址 */}
      <Route
        path="/job-titles/:jobTitle/overview"
        exact
        render={({ match: { params } }) => {
          const jobTitle = pageNameSelector(params);
          const path = generatePath('/job-titles/:jobTitle', { jobTitle });
          return <Redirect to={path} />;
        }}
      />
      <Route
        path={jobTitleWorkExperiencesPath}
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

JobTitlePageProvider.fetchData = ({ store: { dispatch }, ...props }) => {
  const params = paramsSelector(props);
  const pageName = pageNameSelector(params);
  return dispatch(fetchJobTitle(pageName));
};

export default JobTitlePageProvider;
