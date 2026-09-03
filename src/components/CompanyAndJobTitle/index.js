import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Switch, useLocation, useRouteMatch } from 'react-router';

import {
  isJobTitleAlias,
  toCanonicalJobTitle,
} from 'constants/jobTitleMergeMockup';

import RouteWithSubRoutes from '../route';
import styles from './styles.module.css';

// [職稱合併 mockup] 用別名進入職稱頁時直接導到正規名
const useJobTitleAliasRedirect = () => {
  const match = useRouteMatch('/job-titles/:jobTitle');
  const location = useLocation();
  if (!match) return null;
  const jobTitle = decodeURIComponent(match.params.jobTitle);
  if (!isJobTitleAlias(jobTitle)) return null;
  const canonical = encodeURIComponent(toCanonicalJobTitle(jobTitle));
  const pathname = location.pathname.replace(
    /^\/job-titles\/[^/]+/,
    `/job-titles/${canonical}`,
  );
  return pathname + location.search;
};

const CompanyAndJobTitlePageContainer = ({ routes }) => {
  const redirectTo = useJobTitleAliasRedirect();
  if (redirectTo) return <Redirect to={redirectTo} />;
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </div>
    </div>
  );
};

CompanyAndJobTitlePageContainer.propTypes = {
  routes: PropTypes.array,
};

export default CompanyAndJobTitlePageContainer;
