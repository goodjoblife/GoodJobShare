import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generatePath } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'common/NotFound';
import Redirect from 'common/routing/Redirect';
import { paramsSelector } from 'common/routing/selectors';
import usePermission from 'hooks/usePermission';
import { pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import { fetchJobTitle } from 'actions/jobTitle';
import { usePageName, pageNameSelector } from './usePageName';

const JobTitlePageProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.JOB_TITLE;
  const pageName = usePageName();

  useEffect(() => {
    dispatch(fetchJobTitle(pageName));
  }, [dispatch, pageName]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, pageName, fetchPermission]);

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
