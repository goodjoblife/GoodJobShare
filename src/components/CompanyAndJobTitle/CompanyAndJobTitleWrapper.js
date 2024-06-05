import React, { useMemo } from 'react';
import { generatePath, useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toPairs, compose, map } from 'ramda';

import Heading from 'common/base/Heading';
import FanPageBlock from 'common/FanPageBlock';
import BreadCrumb from 'common/BreadCrumb';
import Redirect from 'common/routing/Redirect';

import {
  tabTypeTranslation,
  generateTabURL,
  pageType as PAGE_TYPE,
  tabType as TAB_TYPE,
} from 'constants/companyJobTitle';
import { generateBreadCrumbData } from './utils';

import {
  name as nameSelectorFromEntity,
  company as companySelectorByPageName,
  jobTitle as jobSelectorByPageName,
  companyOverviewBoxSelectorByName,
  jobTitleOverviewBoxSelectorByName,
} from 'selectors/companyAndJobTitle';

import TabLinkGroup from 'common/TabLinkGroup';
import styles from './CompanyAndJobTitleWrapper.module.css';

const useEntitySelector = ({ pageType, pageName, tabType }) => {
  switch (pageType) {
    case PAGE_TYPE.COMPANY:
      if (tabType === TAB_TYPE.OVERVIEW) {
        return companyOverviewBoxSelectorByName(pageName);
      }
      return companySelectorByPageName(pageName);

    case PAGE_TYPE.JOB_TITLE:
      if (tabType === TAB_TYPE.OVERVIEW) {
        return jobTitleOverviewBoxSelectorByName(pageName);
      }
      return jobSelectorByPageName(pageName);

    default:
      return null;
  }
};

const useCanonicalPath = ({ pageType, name }) => {
  const { path } = useRouteMatch();

  if (!name) return null;

  switch (pageType) {
    case PAGE_TYPE.COMPANY:
      return generatePath(path, { companyName: name });

    case PAGE_TYPE.JOB_TITLE:
      return generatePath(path, { jobTitle: name });

    default:
      return null;
  }
};

const useRedirectPath = ({ pageType, pageName, tabType }) => {
  const entitySelector = useEntitySelector({ pageType, pageName, tabType });
  const nameSelector = compose(
    nameSelectorFromEntity,
    entitySelector,
  );
  const name = useSelector(nameSelector);
  const canonicalPath = useCanonicalPath({ pageType, name });

  // No need to redirect if the name is the same as the pageName
  if (name === pageName) return null;

  // Redirect to the canonical path
  return canonicalPath;
};

const CompanyAndJobTitleWrapper = ({
  children,
  pageType,
  pageName,
  tabType,
}) => {
  const tabLinkOptions = useMemo(
    () =>
      compose(
        map(([type, label]) => ({
          label,
          to: generateTabURL({
            pageType,
            pageName,
            tabType: type,
          }),
        })),
        toPairs,
      )(tabTypeTranslation),
    [pageType, pageName],
  );

  const redirectPath = useRedirectPath({ pageType, pageName, tabType });
  if (redirectPath) {
    return <Redirect to={redirectPath} />;
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <BreadCrumb
          data={generateBreadCrumbData({ pageType, pageName, tabType })}
        />
      </div>
      <Heading style={{ color: '#000000', marginBottom: '30px' }}>
        {pageName}
      </Heading>
      <TabLinkGroup
        options={tabLinkOptions}
        style={{
          marginBottom: '24px',
        }}
      />
      {children}
      <FanPageBlock className={styles.fanPageBlock} />
    </div>
  );
};

CompanyAndJobTitleWrapper.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
};
export default CompanyAndJobTitleWrapper;
